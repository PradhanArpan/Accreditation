const express = require('express');
const cors = require('cors');
const path = require('path');
const { db, initDatabase } = require('./db/database');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Whitelisted tables and their allowed fields
const TABLES = {
  faculty: ['name', 'designation', 'qualification', 'specialization', 'experience_years', 'employment_type', 'publications_3yr', 'patents', 'status', 'note', 'evidence_url'],
  infrastructure: ['category', 'name', 'capacity', 'equipment_count', 'year_established', 'evidence_note', 'status', 'note'],
  research: ['type', 'title', 'authors', 'year', 'venue', 'indexing', 'amount_inr', 'status', 'note', 'evidence_url'],
  programs: ['name', 'level', 'tier', 'intake', 'co_count', 'po_count', 'attainment_pct', 'status', 'note'],
};

const PROFILE_COLS = [
  'academic_year', 'total_students', 'women_students_pct', 'region_diverse_pct',
  'esc_students_pct', 'pwd_facilities', 'placement_pct', 'median_salary_lpa', 'higher_studies_pct',
  'budget_allocated_inr', 'budget_utilized_inr', 'library_books_count', 'wifi_ict_available'
];

function extractActor(req) {
  return {
    actor: req.headers['x-user-name'] || 'Faculty/Staff Member',
    role: req.headers['x-user-role'] || 'staff'
  };
}

function assertTable(req, res, next) {
  const { table } = req.params;
  if (!TABLES[table]) return res.status(404).json({ error: `Unknown collection: ${table}` });
  req.columns = TABLES[table];
  next();
}

// --- Health and System Status ---
app.get('/health', (req, res) => {
  res.json({
    ok: true,
    engine: db.isPostgres() ? 'PostgreSQL' : 'Embedded JSON Database',
    timestamp: new Date().toISOString()
  });
});

// --- Profile Endpoints ---
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await db.getProfile();
    res.json(profile);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/profile', async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const sanitized = {};
    PROFILE_COLS.forEach(c => {
      if (c in req.body) sanitized[c] = req.body[c];
    });

    const updated = await db.updateProfile(sanitized);
    await db.logAudit('UPDATE_PROFILE', 'profile', '1', actor, role, `Updated academic profile for year: ${sanitized.academic_year || 'Current'}`);
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Generic Collections CRUD ---
app.get('/api/:table', assertTable, async (req, res) => {
  try {
    const records = await db.getCollection(req.params.table);
    res.json(records);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/:table/:id', assertTable, async (req, res) => {
  try {
    const record = await db.getRecord(req.params.table, req.params.id);
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/:table', assertTable, async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const sanitized = {};
    req.columns.forEach(c => {
      if (c in req.body) sanitized[c] = req.body[c];
    });
    if (!sanitized.status) sanitized.status = 'Draft';

    const created = await db.insertRecord(req.params.table, sanitized);
    await db.logAudit('CREATE', req.params.table, created.id, actor, role, `Created ${req.params.table} record: ${sanitized.name || sanitized.title || 'ID ' + created.id}`);
    res.status(201).json(created);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/:table/:id', assertTable, async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const sanitized = {};
    req.columns.forEach(c => {
      if (c in req.body) sanitized[c] = req.body[c];
    });

    const updated = await db.updateRecord(req.params.table, req.params.id, sanitized);
    if (!updated) return res.status(404).json({ error: 'Record not found' });
    
    await db.logAudit('UPDATE', req.params.table, req.params.id, actor, role, `Updated record details. Status: ${sanitized.status || updated.status}`);
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/:table/:id', assertTable, async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const record = await db.getRecord(req.params.table, req.params.id);
    const success = await db.deleteRecord(req.params.table, req.params.id);
    if (!success) return res.status(404).json({ error: 'Record not found' });
    
    await db.logAudit('DELETE', req.params.table, req.params.id, actor, role, `Deleted record: ${record ? (record.name || record.title || req.params.id) : req.params.id}`);
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Status Workflow Transition (Submit, Approve, Send Back) ---
app.post('/api/:table/:id/status', assertTable, async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const { status, note } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });

    const updateObj = { status };
    if (note !== undefined) updateObj.note = note;

    const updated = await db.updateRecord(req.params.table, req.params.id, updateObj);
    if (!updated) return res.status(404).json({ error: 'Record not found' });

    await db.logAudit(
      status === 'Approved by IQAC' ? 'APPROVE' : (status === 'Sent back' ? 'SEND_BACK' : 'SUBMIT'),
      req.params.table,
      req.params.id,
      actor,
      role,
      `Changed status to '${status}'. Remarks: ${note || 'None'}`
    );

    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Audit Trail & Analytics ---
app.get('/api/audit', async (req, res) => {
  try {
    const logs = await db.getAuditLogs(60);
    res.json(logs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/analytics', async (req, res) => {
  try {
    const profile = await db.getProfile();
    const faculty = await db.getCollection('faculty');
    const infra = await db.getCollection('infrastructure');
    const research = await db.getCollection('research');
    const programs = await db.getCollection('programs');

    const approvedFac = faculty.filter(f => f.status === 'Approved by IQAC');
    const totalStudents = Number(profile.total_students) || 0;
    const sfr = approvedFac.length > 0 ? (totalStudents / approvedFac.length).toFixed(1) : 'N/A';

    const phdCount = approvedFac.filter(f => f.qualification === 'Ph.D.').length;
    const phdPct = approvedFac.length > 0 ? Math.round((phdCount / approvedFac.length) * 100) : 0;

    const totalResearchAmt = research
      .filter(r => r.status === 'Approved by IQAC' && r.amount_inr)
      .reduce((sum, r) => sum + Number(r.amount_inr), 0);

    const scopusCount = research.filter(r => r.status === 'Approved by IQAC' && r.indexing === 'Scopus').length;

    res.json({
      studentFacultyRatio: sfr,
      totalStudents,
      approvedFacultyCount: approvedFac.length,
      phdPercentage: phdPct,
      scopusPublications: scopusCount,
      totalGrantsInr: totalResearchAmt,
      totalLabs: infra.filter(i => i.category === 'Laboratory' && i.status === 'Approved by IQAC').length,
      averageAttainment: programs.length > 0
        ? (programs.reduce((s, p) => s + (Number(p.attainment_pct) || 0), 0) / programs.length).toFixed(1)
        : 'N/A'
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Backup & Export ---
app.get('/api/export-all', async (req, res) => {
  try {
    const allData = await db.getAllData();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=christ_civil_accreditation_backup_${new Date().toISOString().slice(0,10)}.json`);
    res.json(allData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;

// Initialize DB then start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  VERITA — Civil Engineering Accreditation Portal`);
    console.log(`  Dept. of Civil Engineering · CHRIST (Deemed to be Univ)`);
    console.log(`  Server running on http://localhost:${PORT}`);
    console.log(`  Database Engine: ${db.isPostgres() ? 'PostgreSQL' : 'Embedded Zero-Config JSON'}`);
    console.log(`======================================================\n`);
  });
}).catch(err => {
  console.error('Fatal initialization error:', err);
  process.exit(1);
});
