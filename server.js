const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const xlsx = require('xlsx');
const { db, initDatabase } = require('./db/database');

const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Multer memory storage for spreadsheet uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15 MB
});

// Field specifications and spreadsheet templates
const SCHEMA_CONFIG = {
  faculty: {
    name: 'Faculty Directory',
    cols: ['name', 'designation', 'qualification', 'specialization', 'experience_years', 'employment_type', 'publications_3yr', 'patents', 'evidence_url'],
    sample: [
      {
        'Full Name (with Title)': 'Dr. Ramesh Chandra',
        'Designation': 'Professor',
        'Highest Qualification': 'Ph.D.',
        'Area of Specialization': 'Structural Dynamics & Earthquake Engg',
        'Teaching Experience (Years)': 22,
        'Employment Cadre': 'Regular',
        'Publications Last 3 Yrs': 12,
        'Patents Count': 2,
        'ORCID / Profile URL': 'https://orcid.org/0000-0002-1825-0097'
      },
      {
        'Full Name (with Title)': 'Dr. Priya V. Nair',
        'Designation': 'Associate Professor',
        'Highest Qualification': 'Ph.D.',
        'Area of Specialization': 'Geotechnical Engineering',
        'Teaching Experience (Years)': 15,
        'Employment Cadre': 'Regular',
        'Publications Last 3 Yrs': 8,
        'Patents Count': 1,
        'ORCID / Profile URL': 'https://orcid.org/0000-0003-4512-8821'
      }
    ]
  },
  infrastructure: {
    name: 'Infrastructure and Laboratories',
    cols: ['category', 'name', 'capacity', 'equipment_count', 'year_established', 'evidence_note'],
    sample: [
      {
        'Facility Category': 'Laboratory',
        'Facility Name & Room No': 'Advanced Structural Dynamics Lab (Room CE-104)',
        'Capacity / Floor Area': '60 students / 2400 sq.ft',
        'Major Equipment Count': 14,
        'Year Established': 2018,
        'NABL / Calibration Note': 'NABL calibration certificate ref #2026/CE/CAL/09'
      },
      {
        'Facility Category': 'ICT Infrastructure',
        'Facility Name & Room No': 'BIM, GIS & Civil CAD Center (Room CE-201)',
        'Capacity / Floor Area': '60 workstations',
        'Major Equipment Count': 60,
        'Year Established': 2021,
        'NABL / Calibration Note': 'AutoCAD, STAAD.Pro, ETABS licensed'
      }
    ]
  },
  research: {
    name: 'Research, Publications and Grants',
    cols: ['type', 'title', 'authors', 'year', 'venue', 'indexing', 'amount_inr', 'evidence_url'],
    sample: [
      {
        'Type of Contribution': 'Journal Publication',
        'Title / Project Name': 'Seismic fragility curves for reinforced concrete frames',
        'Authors / Investigators': 'Ramesh Chandra, Joseph Kurian',
        'Year': 2025,
        'Journal / Funding Agency': 'Journal of Structural Engineering (ASCE)',
        'Indexing Database': 'Scopus',
        'Amount INR (if Grant)': 0,
        'DOI / URL': 'https://doi.org/10.1061/JSENDH.STENG-12891'
      },
      {
        'Type of Contribution': 'Sponsored Research Project',
        'Title / Project Name': 'Low-carbon alkali-activated geopolymer concrete',
        'Authors / Investigators': 'Dr. Joseph Kurian (PI), Dr. Priya V. Nair (Co-PI)',
        'Year': 2024,
        'Journal / Funding Agency': 'DST-SERB',
        'Indexing Database': 'Peer Reviewed / Other',
        'Amount INR (if Grant)': 3450000,
        'DOI / URL': ''
      }
    ]
  },
  programs: {
    name: 'NBA OBE Academic Programs',
    cols: ['name', 'level', 'tier', 'intake', 'co_count', 'po_count', 'attainment_pct'],
    sample: [
      {
        'Program Title': 'B.Tech in Civil Engineering',
        'Program Level': 'UG',
        'NBA Tier': 'Tier-I (Washington Accord)',
        'Approved Intake': 120,
        'COs Mapped': 360,
        'POs Defined': 12,
        'Attainment %': 84.2
      },
      {
        'Program Title': 'M.Tech in Structural Engineering',
        'Program Level': 'PG',
        'NBA Tier': 'Tier-I (Washington Accord)',
        'Approved Intake': 24,
        'COs Mapped': 120,
        'POs Defined': 11,
        'Attainment %': 88.0
      }
    ]
  }
};

const TABLES = {
  faculty: SCHEMA_CONFIG.faculty.cols.concat(['status', 'note']),
  infrastructure: SCHEMA_CONFIG.infrastructure.cols.concat(['status', 'note']),
  research: SCHEMA_CONFIG.research.cols.concat(['status', 'note']),
  programs: SCHEMA_CONFIG.programs.cols.concat(['status', 'note']),
};

const PROFILE_COLS = [
  'academic_year', 'total_students', 'women_students_pct', 'region_diverse_pct',
  'esc_students_pct', 'pwd_facilities', 'placement_pct', 'median_salary_lpa', 'higher_studies_pct',
  'budget_allocated_inr', 'budget_utilized_inr', 'library_books_count', 'wifi_ict_available'
];

function extractActor(req) {
  return {
    actor: req.headers['x-user-name'] || 'Faculty / Staff Member',
    role: req.headers['x-user-role'] || 'staff'
  };
}

function assertTable(req, res, next) {
  const { table } = req.params;
  if (!TABLES[table]) return res.status(404).json({ error: `Unknown collection: ${table}` });
  req.columns = TABLES[table];
  next();
}

// --- Health ---
app.get('/health', async (req, res) => {
  const inst = await db.getInstitution();
  res.json({
    ok: true,
    engine: db.isPostgres() ? 'PostgreSQL' : 'Embedded JSON Database',
    institution: inst.university_name,
    school: inst.school_name,
    department: inst.department_name,
    timestamp: new Date().toISOString()
  });
});

// --- Institutional Hierarchy Endpoints ---
app.get('/api/institution', async (req, res) => {
  try {
    const inst = await db.getInstitution();
    res.json(inst);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/institution', async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const updated = await db.updateInstitution(req.body);
    await db.logAudit('UPDATE_INSTITUTION', 'institution', '1', actor, role, `Updated hierarchy details for ${updated.department_name || 'Department'}`);
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
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
    await db.logAudit('CREATE', req.params.table, created.id, actor, role, `Created record: ${sanitized.name || sanitized.title || 'ID ' + created.id}`);
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

// --- Master All-in-One Workbook Template ---
app.get('/api/templates/master', (req, res) => {
  const masterPath = path.join(__dirname, 'public', 'templates', 'CHRIST_Civil_Accreditation_Master_Template.xlsx');
  if (fs.existsSync(masterPath)) {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=CHRIST_Civil_Accreditation_Master_Template.xlsx');
    return res.sendFile(masterPath);
  }
  res.status(404).json({ error: 'Master template not found' });
});

// --- Master Multi-Sheet Bulk Ingestion (All Sheets at Once) ---
app.post('/api/upload/master', upload.single('file'), async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const mode = req.body.mode || 'append';
    if (!req.file) return res.status(400).json({ error: 'No spreadsheet file uploaded' });

    const wb = xlsx.read(req.file.buffer, { type: 'buffer' });
    const results = {};

    for (const sheetName of wb.SheetNames) {
      const lower = sheetName.toLowerCase();
      let table = null;
      if (lower.includes('fac')) table = 'faculty';
      else if (lower.includes('infra') || lower.includes('lab')) table = 'infrastructure';
      else if (lower.includes('res') || lower.includes('grant') || lower.includes('pub')) table = 'research';
      else if (lower.includes('prog') || lower.includes('nba') || lower.includes('obe')) table = 'programs';

      if (table) {
        const rawRows = xlsx.utils.sheet_to_json(wb.Sheets[sheetName]);
        if (rawRows && rawRows.length > 0) {
          const parsed = rawRows.map(raw => {
            const rec = { status: 'Approved by IQAC', note: 'Imported from Master Google Sheet' };
            Object.keys(raw).forEach(k => {
              const val = raw[k];
              const lk = k.toLowerCase().replace(/[^a-z0-9]/g, '');
              if (table === 'faculty') {
                if (lk.includes('name')) rec.name = String(val).trim();
                else if (lk.includes('designation')) rec.designation = String(val).trim();
                else if (lk.includes('qualif')) rec.qualification = String(val).trim();
                else if (lk.includes('spec')) rec.specialization = String(val).trim();
                else if (lk.includes('exp')) rec.experience_years = Number(val) || 0;
                else if (lk.includes('cadre') || lk.includes('employ')) rec.employment_type = String(val).trim();
                else if (lk.includes('pub')) rec.publications_3yr = Number(val) || 0;
                else if (lk.includes('patent')) rec.patents = Number(val) || 0;
                else if (lk.includes('orcid') || lk.includes('url')) rec.evidence_url = String(val).trim();
              } else if (table === 'infrastructure') {
                if (lk.includes('cat')) rec.category = String(val).trim();
                else if (lk.includes('name') || lk.includes('room') || lk.includes('facility')) rec.name = String(val).trim();
                else if (lk.includes('cap') || lk.includes('area')) rec.capacity = String(val).trim();
                else if (lk.includes('equip')) rec.equipment_count = Number(val) || 0;
                else if (lk.includes('year') || lk.includes('est')) rec.year_established = Number(val) || 0;
                else if (lk.includes('note') || lk.includes('calib') || lk.includes('nabl')) rec.evidence_note = String(val).trim();
              } else if (table === 'research') {
                if (lk.includes('type')) rec.type = String(val).trim();
                else if (lk.includes('title') || lk.includes('project')) rec.title = String(val).trim();
                else if (lk.includes('author') || lk.includes('investig')) rec.authors = String(val).trim();
                else if (lk.includes('year')) rec.year = Number(val) || 0;
                else if (lk.includes('venue') || lk.includes('journal') || lk.includes('agency')) rec.venue = String(val).trim();
                else if (lk.includes('index')) rec.indexing = String(val).trim();
                else if (lk.includes('amount') || lk.includes('inr') || lk.includes('grant')) rec.amount_inr = Number(val) || null;
                else if (lk.includes('doi') || lk.includes('url')) rec.evidence_url = String(val).trim();
              } else if (table === 'programs') {
                if (lk.includes('name') || lk.includes('prog') || lk.includes('title')) rec.name = String(val).trim();
                else if (lk.includes('level')) rec.level = String(val).trim();
                else if (lk.includes('tier')) rec.tier = String(val).trim();
                else if (lk.includes('intake')) rec.intake = Number(val) || 0;
                else if (lk.includes('co')) rec.co_count = Number(val) || 0;
                else if (lk.includes('po')) rec.po_count = Number(val) || 0;
                else if (lk.includes('attain')) rec.attainment_pct = Number(val) || 0;
              }
            });
            return rec;
          }).filter(r => r.name || r.title);

          const inserted = await db.bulkInsert(table, parsed, mode);
          results[table] = inserted.length;
        }
      }
    }

    await db.logAudit('BULK_MASTER_IMPORT', 'all_sheets', JSON.stringify(results), actor, role,
      `Master spreadsheet ingested. Records updated: ${JSON.stringify(results)}`
    );

    res.json({ success: true, results });
  } catch (e) {
    console.error('Master upload error:', e);
    res.status(500).json({ error: 'Master upload failed: ' + e.message });
  }
});

// --- Template Generator API (.xlsx / .csv) ---
app.get('/api/templates/:table', (req, res) => {
  const { table } = req.params;
  const cfg = SCHEMA_CONFIG[table];
  if (!cfg) return res.status(404).json({ error: 'Unknown template type' });

  const format = req.query.format || 'xlsx';
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(cfg.sample);

  xlsx.utils.book_append_sheet(wb, ws, cfg.name.slice(0, 31));

  if (format === 'csv') {
    const csv = xlsx.utils.sheet_to_csv(ws);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=TEMPLATE_CHRIST_${table.toUpperCase()}.csv`);
    return res.send(csv);
  }

  const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=TEMPLATE_CHRIST_${table.toUpperCase()}.xlsx`);
  res.send(buffer);
});

// --- Bulk Spreadsheet Ingestion Engine (Upload .xlsx / .csv) ---
app.post('/api/upload/:table', assertTable, upload.single('file'), async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const { table } = req.params;
    const mode = req.body.mode || 'append'; // 'append' or 'replace'

    if (!req.file) return res.status(400).json({ error: 'No spreadsheet file uploaded' });

    const wb = xlsx.read(req.file.buffer, { type: 'buffer' });
    const firstSheetName = wb.SheetNames[0];
    const rawRows = xlsx.utils.sheet_to_json(wb.Sheets[firstSheetName]);

    if (!rawRows || rawRows.length === 0) {
      return res.status(400).json({ error: 'Uploaded spreadsheet is empty or has no readable rows' });
    }

    // Map column aliases to schema fields
    const parsedRecords = rawRows.map(raw => {
      const rec = { status: 'Approved by IQAC', note: 'Imported via official department spreadsheet' };
      const rawKeys = Object.keys(raw);

      rawKeys.forEach(k => {
        const val = raw[k];
        const lowerKey = k.toLowerCase().replace(/[^a-z0-9]/g, '');

        if (table === 'faculty') {
          if (lowerKey.includes('name')) rec.name = String(val).trim();
          else if (lowerKey.includes('designation')) rec.designation = String(val).trim();
          else if (lowerKey.includes('qualif')) rec.qualification = String(val).trim();
          else if (lowerKey.includes('spec')) rec.specialization = String(val).trim();
          else if (lowerKey.includes('exp')) rec.experience_years = Number(val) || 0;
          else if (lowerKey.includes('cadre') || lowerKey.includes('employ')) rec.employment_type = String(val).trim();
          else if (lowerKey.includes('pub')) rec.publications_3yr = Number(val) || 0;
          else if (lowerKey.includes('patent')) rec.patents = Number(val) || 0;
          else if (lowerKey.includes('orcid') || lowerKey.includes('url')) rec.evidence_url = String(val).trim();
        } else if (table === 'infrastructure') {
          if (lowerKey.includes('cat')) rec.category = String(val).trim();
          else if (lowerKey.includes('name') || lowerKey.includes('room') || lowerKey.includes('facility')) rec.name = String(val).trim();
          else if (lowerKey.includes('cap') || lowerKey.includes('area')) rec.capacity = String(val).trim();
          else if (lowerKey.includes('equip')) rec.equipment_count = Number(val) || 0;
          else if (lowerKey.includes('year') || lowerKey.includes('est')) rec.year_established = Number(val) || 0;
          else if (lowerKey.includes('note') || lowerKey.includes('calib') || lowerKey.includes('nabl')) rec.evidence_note = String(val).trim();
        } else if (table === 'research') {
          if (lowerKey.includes('type')) rec.type = String(val).trim();
          else if (lowerKey.includes('title') || lowerKey.includes('project')) rec.title = String(val).trim();
          else if (lowerKey.includes('author') || lowerKey.includes('investig')) rec.authors = String(val).trim();
          else if (lowerKey.includes('year')) rec.year = Number(val) || 0;
          else if (lowerKey.includes('venue') || lowerKey.includes('journal') || lowerKey.includes('agency')) rec.venue = String(val).trim();
          else if (lowerKey.includes('index')) rec.indexing = String(val).trim();
          else if (lowerKey.includes('amount') || lowerKey.includes('inr') || lowerKey.includes('grant')) rec.amount_inr = Number(val) || null;
          else if (lowerKey.includes('doi') || lowerKey.includes('url')) rec.evidence_url = String(val).trim();
        } else if (table === 'programs') {
          if (lowerKey.includes('name') || lowerKey.includes('prog') || lowerKey.includes('title')) rec.name = String(val).trim();
          else if (lowerKey.includes('level')) rec.level = String(val).trim();
          else if (lowerKey.includes('tier')) rec.tier = String(val).trim();
          else if (lowerKey.includes('intake')) rec.intake = Number(val) || 0;
          else if (lowerKey.includes('co')) rec.co_count = Number(val) || 0;
          else if (lowerKey.includes('po')) rec.po_count = Number(val) || 0;
          else if (lowerKey.includes('attain')) rec.attainment_pct = Number(val) || 0;
        }
      });

      return rec;
    }).filter(r => (r.name || r.title)); // ensure non-empty primary identifier

    const inserted = await db.bulkInsert(table, parsedRecords, mode);

    await db.logAudit('BULK_IMPORT', table, `${inserted.length} records`, actor, role,
      `Successfully ingested ${inserted.length} records from uploaded spreadsheet (${req.file.originalname}) via ${mode.toUpperCase()} mode.`
    );

    res.json({
      success: true,
      count: inserted.length,
      mode,
      records: inserted
    });
  } catch (e) {
    console.error('Spreadsheet upload error:', e);
    res.status(500).json({ error: 'Failed to process spreadsheet: ' + e.message });
  }
});

// --- Dataset Reset & Sample Load APIs ---
app.post('/api/dataset/reset-clean', async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    await db.clearCollection('faculty');
    await db.clearCollection('infrastructure');
    await db.clearCollection('research');
    await db.clearCollection('programs');

    await db.logAudit('RESET_CLEAN', 'all_collections', '0', actor, role, 'Cleared all department records to prepare for fresh institutional data ingestion.');
    res.json({ success: true, message: 'Portal reset to clean state.' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/dataset/load-sample', async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    await db.loadSampleDataset();
    await db.logAudit('LOAD_SAMPLE', 'all_collections', 'sample', actor, role, 'Populated sample demonstration dataset for CHRIST Dept. of Civil Engineering.');
    res.json({ success: true, message: 'Sample demonstration dataset loaded.' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Audit & Analytics ---
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

app.get('/api/export-all', async (req, res) => {
  try {
    const allData = await db.getAllData();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=christ_accreditation_master_backup_${new Date().toISOString().slice(0,10)}.json`);
    res.json(allData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  VERITA — Institutional Accreditation SaaS Platform`);
    console.log(`  Overarching: CHRIST (Deemed to be University)`);
    console.log(`  School: School of Engineering and Technology`);
    console.log(`  Department: Department of Civil Engineering`);
    console.log(`  Server running on http://localhost:${PORT}`);
    console.log(`  Database Engine: ${db.isPostgres() ? 'PostgreSQL' : 'Embedded Zero-Config JSON'}`);
    console.log(`======================================================\n`);
  });
}).catch(err => {
  console.error('Fatal initialization error:', err);
  process.exit(1);
});
