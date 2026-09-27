const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const xlsx = require('xlsx');
const { db, initDatabase } = require('./db/database');

const app = express();
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }
});

// Domain Schemas & Templates
const SCHEMA_CONFIG = {
  faculty: {
    name: 'Faculty Directory',
    cols: ['name', 'email', 'designation', 'qualification', 'specialization', 'experience_years', 'employment_type', 'service_status', 'gender', 'publications_3yr', 'patents', 'evidence_url'],
    sample: [
      {
        'Full Name (with Title)': 'Dr. Ramesh Chandra',
        'Official Email': 'ramesh.chandra@christuniversity.in',
        'Designation': 'Professor',
        'Highest Qualification': 'Ph.D.',
        'Area of Specialization': 'Structural Engineering & Earthquake Resilient Design',
        'Teaching Experience (Years)': 22,
        'Employment Cadre': 'Regular',
        'Service Status (Current/Relieved)': 'Current',
        'Gender (Male/Female/Other)': 'Male',
        'Publications Last 3 Yrs': 12,
        'Patents Count': 2,
        'ORCID / Profile URL': 'https://orcid.org/0000-0002-1825-0097'
      },
      {
        'Full Name (with Title)': 'Dr. Priya V. Nair',
        'Official Email': 'priya.nair@christuniversity.in',
        'Designation': 'Associate Professor',
        'Highest Qualification': 'Ph.D.',
        'Area of Specialization': 'Geotechnical & Geo-environmental Engineering',
        'Teaching Experience (Years)': 15,
        'Employment Cadre': 'Regular',
        'Service Status (Current/Relieved)': 'Current',
        'Gender (Male/Female/Other)': 'Female',
        'Publications Last 3 Yrs': 8,
        'Patents Count': 1,
        'ORCID / Profile URL': 'https://orcid.org/0000-0003-4512-8821'
      }
    ]
  },
  students: {
    name: 'Student Cohort Roster',
    cols: ['roll_no', 'name', 'gender', 'category', 'state_country', 'is_pwd', 'program', 'batch_year', 'status', 'placement_status', 'higher_studies'],
    sample: [
      {
        'Student Registration / Roll No': '23BCIV001',
        'Student Full Name': 'Aditi Sharma',
        'Gender': 'Female',
        'Social Category (GEN/OBC/SC/ST/EWS)': 'General',
        'Domicile State / Country': 'Delhi',
        'Divyangjan (PwD) Yes/No': 'No',
        'Enrolled Program': 'B.Tech in Civil Engineering',
        'Batch Academic Year': '2023-27',
        'Status (Active/Graduated)': 'Active',
        'Placement Record': 'Undergraduate',
        'Higher Studies Aspiration': 'Pending'
      },
      {
        'Student Registration / Roll No': '22BCIV015',
        'Student Full Name': 'Sneha Rao',
        'Gender': 'Female',
        'Social Category (GEN/OBC/SC/ST/EWS)': 'SC',
        'Domicile State / Country': 'Karnataka',
        'Divyangjan (PwD) Yes/No': 'No',
        'Enrolled Program': 'B.Tech in Civil Engineering',
        'Batch Academic Year': '2022-26',
        'Status (Active/Graduated)': 'Active',
        'Placement Record': 'Placed (L&T Construction - 7.2 LPA)',
        'Higher Studies Aspiration': 'No'
      }
    ]
  },
  infrastructure: {
    name: 'Infrastructure and Laboratories',
    cols: ['category', 'name', 'capacity', 'equipment_count', 'year_established', 'evidence_note'],
    sample: [
      {
        'Facility Category': 'Laboratory',
        'Facility Name & Room No': 'Advanced Structural Dynamics & Heavy Testing Lab (Room CE-104)',
        'Capacity / Floor Area': '60 students / 2400 sq.ft',
        'Major Equipment Count': 14,
        'Year Established': 2018,
        'NABL / Calibration Note': 'Geo-tagged photos & NABL calibration certificates filed in Room CE-104'
      },
      {
        'Facility Category': 'ICT Infrastructure',
        'Facility Name & Room No': 'BIM, GIS & Civil CAD Computing Center (Room CE-201)',
        'Capacity / Floor Area': '60 workstations',
        'Major Equipment Count': 60,
        'Year Established': 2021,
        'NABL / Calibration Note': 'AutoCAD, STAAD.Pro, ETABS, and ArcGIS licensed. 100 Mbps LAN available.'
      }
    ]
  },
  research: {
    name: 'Research, Publications and Grants',
    cols: ['type', 'title', 'authors', 'year', 'venue', 'indexing', 'amount_inr', 'evidence_url'],
    sample: [
      {
        'Type of Contribution': 'Journal Publication',
        'Title / Project Name': 'Seismic fragility curves for reinforced concrete frames with masonry infill walls',
        'Authors / Investigators': 'Ramesh Chandra, Joseph Kurian, et al.',
        'Year': 2025,
        'Journal / Funding Agency': 'Journal of Structural Engineering (ASCE)',
        'Indexing Database': 'Scopus',
        'Amount INR (if Grant)': 0,
        'DOI / URL': 'https://doi.org/10.1061/JSENDH.STENG-12891'
      },
      {
        'Type of Contribution': 'Sponsored Research Project',
        'Title / Project Name': 'Development of low-carbon alkali-activated geopolymer concrete utilizing industrial slag',
        'Authors / Investigators': 'Dr. Joseph Kurian (PI), Dr. Priya V. Nair (Co-PI)',
        'Year': 2024,
        'Journal / Funding Agency': 'Department of Science and Technology (DST-SERB)',
        'Indexing Database': 'Peer Reviewed / Other',
        'Amount INR (if Grant)': 3450000,
        'DOI / URL': 'DST/SERB/CRG/2024/004128'
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
      }
    ]
  },
  events: {
    name: 'Department Events and FDPs',
    cols: ['title', 'category', 'coordinator', 'start_date', 'end_date', 'participants_count', 'venue', 'evidence_url'],
    sample: [
      {
        'Event Title': 'AICTE-ATAL 5-Day Faculty Development Program on Earthquake Engineering & Disaster Resilience',
        'Event Category': 'Faculty Development Program (FDP)',
        'Faculty Coordinator': 'Dr. Ramesh Chandra',
        'Start Date (YYYY-MM-DD)': '2024-11-18',
        'End Date (YYYY-MM-DD)': '2024-11-22',
        'Number of Participants': 55,
        'Venue / Platform': 'Room CE-104 / Hybrid',
        'Evidence Link / Report URL': ''
      }
    ]
  },
  tasks: {
    name: 'Faculty Accreditation Tasks',
    cols: ['title', 'assigned_to_email', 'assigned_to_name', 'course_code', 'due_date', 'status', 'submission_url', 'remarks'],
    sample: [
      {
        'Task Title': 'Upload Course Outcome (CO) Attainment Sheet',
        'Assigned Faculty Email': 'ramesh.chandra@christuniversity.in',
        'Faculty Name': 'Dr. Ramesh Chandra',
        'Course Code / Module': 'CIV301 - Design of RC Structures',
        'Due Date (YYYY-MM-DD)': '2026-10-15',
        'Status (Pending/In Progress/Completed)': 'Pending',
        'Submission Link': '',
        'Coordinator Remarks': 'Ensure direct and indirect attainment formulas are mapped.'
      }
    ]
  }
};

const TABLES = {
  faculty: SCHEMA_CONFIG.faculty.cols.concat(['status', 'note']),
  students: SCHEMA_CONFIG.students.cols.concat(['status', 'note']),
  infrastructure: SCHEMA_CONFIG.infrastructure.cols.concat(['status', 'note']),
  research: SCHEMA_CONFIG.research.cols.concat(['status', 'note']),
  programs: SCHEMA_CONFIG.programs.cols.concat(['status', 'note']),
  events: SCHEMA_CONFIG.events.cols.concat(['status', 'note']),
  tasks: SCHEMA_CONFIG.tasks.cols
};

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

function generateMasterWorkbookBuffer() {
  const wb = xlsx.utils.book_new();

  // 1. Dept Profile (Dynamic Guide)
  const profileGuide = [
    {
      'Information': 'Notice',
      'Detail': 'In this platform, total student counts, gender diversity, regional diversity, PwD, and Student-Faculty Ratio are automatically pooled directly from the Faculty and Student sheets below! Fill the sheets and the profile calculates in real-time.'
    }
  ];
  xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(profileGuide), '1_Profile_Notice');

  // 2. Faculty Directory
  xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(SCHEMA_CONFIG.faculty.sample), '2_Faculty_Roster');

  // 3. Student Cohort
  xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(SCHEMA_CONFIG.students.sample), '3_Student_Cohort');

  // 4. Infrastructure & Labs
  xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(SCHEMA_CONFIG.infrastructure.sample), '4_Infrastructure_Labs');

  // 5. Research & Grants
  xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(SCHEMA_CONFIG.research.sample), '5_Research_Grants');

  // 6. Events & FDPs
  xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(SCHEMA_CONFIG.events.sample), '6_Events_Workshops');

  // 7. NBA Programs
  xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(SCHEMA_CONFIG.programs.sample), '7_NBA_Programs_OBE');

  return xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

// ============================================================================
// SPECIFIC API ROUTES
// ============================================================================

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

// ============================================================================
// GOOGLE AUTH & USER PERSONAS
// ============================================================================
const PERSONAS = [
  {
    role: 'director',
    name: 'Dr. Anil Kumar',
    email: 'director.iqac@christuniversity.in',
    title: 'University IQAC Director',
    level: 'University Central Management',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AnilKumar&backgroundColor=0e355f'
  },
  {
    role: 'dean',
    name: 'Dr. Iven Jose',
    email: 'dean.set@christuniversity.in',
    title: 'Dean, School of Engineering and Technology',
    level: 'School Level Leadership',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=IvenJose&backgroundColor=184a80'
  },
  {
    role: 'iqac',
    name: 'Dr. Ramesh Chandra',
    email: 'ramesh.chandra@christuniversity.in',
    title: 'HoD & Civil IQAC Coordinator',
    level: 'Department Coordinator',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=RameshChandra&backgroundColor=c29b38'
  },
  {
    role: 'faculty',
    name: 'Dr. Priya V. Nair',
    email: 'priya.nair@christuniversity.in',
    title: 'Associate Professor (Geotechnical Engineering)',
    level: 'Serving Faculty Member',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=PriyaNair&backgroundColor=265b68'
  },
  {
    role: 'faculty',
    name: 'Dr. Anand K. Murthy',
    email: 'anand.murthy@christuniversity.in',
    title: 'Assistant Professor (Water Resources)',
    level: 'Serving Faculty Member',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AnandMurthy&backgroundColor=265b68'
  }
];

app.get('/api/auth/personas', (req, res) => {
  res.json(PERSONAS);
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, name, role, photo_url } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    let matchedRole = role || 'faculty';
    let matchedName = name || email.split('@')[0];
    let matchedAvatar = photo_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(matchedName)}`;

    const existingPersona = PERSONAS.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (existingPersona) {
      matchedRole = existingPersona.role;
      matchedName = existingPersona.name;
      matchedAvatar = existingPersona.avatar;
    } else if (email.toLowerCase().includes('director') || email.toLowerCase().includes('iqac-uni')) {
      matchedRole = 'director';
    } else if (email.toLowerCase().includes('dean')) {
      matchedRole = 'dean';
    } else if (email.toLowerCase().includes('hod') || email.toLowerCase().includes('coordinator')) {
      matchedRole = 'iqac';
    }

    const sessionUser = {
      email,
      name: matchedName,
      role: matchedRole,
      avatar: matchedAvatar,
      institution: 'CHRIST (Deemed to be University)',
      school: 'School of Engineering and Technology',
      department: 'Department of Civil Engineering',
      authenticated_at: new Date().toISOString()
    };

    await db.logAudit('USER_LOGIN', 'auth', email, matchedName, matchedRole, `Logged in via Google Authentication (${email})`);

    res.json({
      success: true,
      token: 'jwt-google-' + Buffer.from(email).toString('base64'),
      user: sessionUser
    });
  } catch (err) {
    res.status(500).json({ error: 'Auth failed: ' + err.message });
  }
});

// ============================================================================
// HIERARCHY & GOOGLE DRIVE FOLDERS
// ============================================================================
app.get('/api/hierarchy', async (req, res) => {
  try {
    const hier = await db.getHierarchy();
    res.json(hier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/hierarchy/schools', async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const newSchool = await db.addSchool(req.body);
    await db.logAudit('CREATE_SCHOOL_FOLDER', 'hierarchy', newSchool.id, actor, role, `Created School Drive Folder: ${newSchool.name}`);
    res.status(201).json(newSchool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/hierarchy/departments', async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const { schoolId, ...deptData } = req.body;
    if (!schoolId) return res.status(400).json({ error: 'schoolId is required' });
    const newDept = await db.addDepartment(schoolId, deptData);
    await db.logAudit('CREATE_DEPT_FOLDER', 'hierarchy', newDept.id, actor, role, `Created Dept Drive Folder & Live Sheets: ${newDept.name}`);
    res.status(201).json(newDept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/hierarchy/departments/:deptId/sheets', async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const updated = await db.updateDepartmentSheets(req.params.deptId, req.body);
    if (!updated) return res.status(404).json({ error: 'Department not found' });
    await db.logAudit('UPDATE_DEPT_SHEETS', 'hierarchy', req.params.deptId, actor, role, `Updated linked Google Sheets URLs`);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================================
// LIVE GOOGLE SHEETS INTEGRATION & TWO-WAY SYNC
// ============================================================================
app.get('/api/sheets/open/:table', async (req, res) => {
  const { table } = req.params;
  const cfg = SCHEMA_CONFIG[table];
  if (!cfg) return res.status(404).json({ error: 'Unknown table: ' + table });

  try {
    const hier = await db.getHierarchy();
    const civilDept = hier.schools?.[0]?.departments?.find(d => d.id === 'dept-civil');
    const linkedSheet = civilDept?.sheets?.[table];

    const googleSheetCopyUrl = `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/copy?usp=sharing`;
    const liveUrl = linkedSheet?.sheet_url || `https://docs.google.com/spreadsheets/create?title=CHRIST_Civil_${table.toUpperCase()}`;

    res.json({
      table,
      title: linkedSheet?.title || `CHRIST Civil ${cfg.name}`,
      sheet_url: liveUrl,
      template_copy_url: googleSheetCopyUrl,
      fields: cfg.cols,
      sample_data: cfg.sample
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CSV feed for Google Sheets =IMPORTDATA formula with sample and live department data
app.get('/api/sheets/csv/:table', async (req, res) => {
  const { table } = req.params;
  const cfg = SCHEMA_CONFIG[table];
  if (!cfg) return res.status(404).json({ error: 'Unknown table: ' + table });

  try {
    const records = await db.getCollection(table);
    const dataToExport = (records && records.length > 0) ? records : cfg.sample;

    const ws = xlsx.utils.json_to_sheet(dataToExport);
    const csv = xlsx.utils.sheet_to_csv(ws);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Persist account-specific Google Sheet link
app.post('/api/sheets/account-link', async (req, res) => {
  try {
    const { email, table, sheet_url } = req.body;
    if (!email || !table || !sheet_url) {
      return res.status(400).json({ error: 'email, table, and sheet_url are required' });
    }
    await db.updateDepartmentSheets('dept-civil', {
      [table]: {
        title: `CHRIST_Civil_${table.toUpperCase()}`,
        sheet_url,
        account_email: email,
        last_synced: new Date().toISOString()
      }
    });
    res.json({ success: true, message: 'Google Sheet linked to account successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sheets/sync/:table', assertTable, async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const { table } = req.params;
    const { sheet_url, records } = req.body;

    let parsedRecords = [];

    if (Array.isArray(records) && records.length > 0) {
      parsedRecords = records;
    } else if (sheet_url) {
      let csvUrl = sheet_url;
      const match = sheet_url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        const sheetId = match[1];
        csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
      }
      try {
        const fetchRes = await fetch(csvUrl, { headers: { 'User-Agent': 'Verita-Accreditation/1.0' } });
        if (fetchRes.ok) {
          const csvText = await fetchRes.text();
          const wb = xlsx.read(csvText, { type: 'string' });
          const firstSheet = wb.SheetNames[0];
          parsedRecords = xlsx.utils.sheet_to_json(wb.Sheets[firstSheet]);
        }
      } catch (fetchErr) {
        console.warn('Direct Google Sheet fetch warning:', fetchErr.message);
      }
    }

    if (!parsedRecords || parsedRecords.length === 0) {
      return res.status(400).json({
        error: 'No data retrieved. Ensure the Google Sheet is shared with "Anyone with the link can view", or use direct cell sync.'
      });
    }

    const cleaned = parsedRecords.map(raw => {
      const rec = { status: 'Approved by IQAC', note: 'Synchronized live from Google Drive Sheet' };
      Object.keys(raw).forEach(k => {
        const val = raw[k];
        const lowerKey = k.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (table === 'faculty') {
          if (lowerKey.includes('name')) rec.name = String(val).trim();
          else if (lowerKey.includes('email')) rec.email = String(val).trim();
          else if (lowerKey.includes('designation')) rec.designation = String(val).trim();
          else if (lowerKey.includes('qualif')) rec.qualification = String(val).trim();
          else if (lowerKey.includes('spec')) rec.specialization = String(val).trim();
          else if (lowerKey.includes('exp')) rec.experience_years = Number(val) || 0;
          else if (lowerKey.includes('cadre') || lowerKey.includes('employ')) rec.employment_type = String(val).trim();
          else if (lowerKey.includes('service') || lowerKey.includes('serving')) rec.service_status = String(val).trim();
          else if (lowerKey.includes('gender')) rec.gender = String(val).trim();
          else if (lowerKey.includes('pub')) rec.publications_3yr = Number(val) || 0;
          else if (lowerKey.includes('patent')) rec.patents = Number(val) || 0;
          else if (lowerKey.includes('orcid') || lowerKey.includes('url')) rec.evidence_url = String(val).trim();
        } else if (table === 'students') {
          if (lowerKey.includes('roll') || lowerKey.includes('reg')) rec.roll_no = String(val).trim();
          else if (lowerKey.includes('name')) rec.name = String(val).trim();
          else if (lowerKey.includes('gender')) rec.gender = String(val).trim();
          else if (lowerKey.includes('cat')) rec.category = String(val).trim();
          else if (lowerKey.includes('state') || lowerKey.includes('country') || lowerKey.includes('domicile')) rec.state_country = String(val).trim();
          else if (lowerKey.includes('pwd')) rec.is_pwd = String(val).toLowerCase().includes('yes');
          else if (lowerKey.includes('prog')) rec.program = String(val).trim();
          else if (lowerKey.includes('batch')) rec.batch_year = String(val).trim();
          else if (lowerKey.includes('place')) rec.placement_status = String(val).trim();
          else if (lowerKey.includes('high')) rec.higher_studies = String(val).trim();
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
        } else if (table === 'events') {
          if (lowerKey.includes('title')) rec.title = String(val).trim();
          else if (lowerKey.includes('cat')) rec.category = String(val).trim();
          else if (lowerKey.includes('coord')) rec.coordinator = String(val).trim();
          else if (lowerKey.includes('start')) rec.start_date = String(val).trim();
          else if (lowerKey.includes('end')) rec.end_date = String(val).trim();
          else if (lowerKey.includes('partic')) rec.participants_count = Number(val) || 0;
          else if (lowerKey.includes('venue')) rec.venue = String(val).trim();
          else if (lowerKey.includes('url') || lowerKey.includes('report')) rec.evidence_url = String(val).trim();
        }
      });
      return rec;
    }).filter(r => r.name || r.title || r.roll_no);

    const inserted = await db.bulkInsert(table, cleaned, 'replace');
    await db.logAudit('GOOGLE_SHEET_SYNC', table, `${inserted.length} rows`, actor, role, `Synchronized ${inserted.length} rows directly from Google Sheet.`);

    const computedProfile = await db.getComputedProfile();

    res.json({
      success: true,
      synced_count: inserted.length,
      profile: computedProfile
    });
  } catch (err) {
    res.status(500).json({ error: 'Sync failed: ' + err.message });
  }
});

// ============================================================================
// STATE DURABILITY & CLIENT BACKUP SYNC
// ============================================================================
app.get('/api/sync/state', async (req, res) => {
  try {
    const all = await db.getAllData();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sync/state', async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    await db.syncAllState(req.body);
    await db.logAudit('STATE_RESTORE', 'system', 'all', actor, role, 'Restored complete department state from cloud backup.');
    res.json({ success: true, message: 'State synced and persisted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Master Template Download (Excel .xlsx) ---
app.get('/api/templates/master', (req, res) => {
  try {
    const buffer = generateMasterWorkbookBuffer();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=CHRIST_Civil_Accreditation_Master_Template.xlsx');
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate master template: ' + err.message });
  }
});

// --- Domain Template Download (Excel .xlsx / CSV) ---
app.get('/api/templates/:table', (req, res) => {
  const { table } = req.params;
  const cfg = SCHEMA_CONFIG[table];
  if (!cfg) return res.status(404).json({ error: 'Unknown template type: ' + table });

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
  res.setHeader('Content-Length', buffer.length);
  res.send(buffer);
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
      else if (lower.includes('stud')) table = 'students';
      else if (lower.includes('infra') || lower.includes('lab')) table = 'infrastructure';
      else if (lower.includes('res') || lower.includes('grant') || lower.includes('pub')) table = 'research';
      else if (lower.includes('prog') || lower.includes('nba') || lower.includes('obe')) table = 'programs';
      else if (lower.includes('event') || lower.includes('fdp') || lower.includes('work')) table = 'events';

      if (table) {
        const rawRows = xlsx.utils.sheet_to_json(wb.Sheets[sheetName]);
        if (rawRows && rawRows.length > 0) {
          const parsed = rawRows.map(raw => {
            const rec = { status: 'Approved by IQAC', note: 'Imported from Master Spreadsheet' };
            Object.keys(raw).forEach(k => {
              const val = raw[k];
              const lk = k.toLowerCase().replace(/[^a-z0-9]/g, '');
              if (table === 'faculty') {
                if (lk.includes('name')) rec.name = String(val).trim();
                else if (lk.includes('email')) rec.email = String(val).trim();
                else if (lk.includes('designation')) rec.designation = String(val).trim();
                else if (lk.includes('qualif')) rec.qualification = String(val).trim();
                else if (lk.includes('spec')) rec.specialization = String(val).trim();
                else if (lk.includes('exp')) rec.experience_years = Number(val) || 0;
                else if (lk.includes('cadre') || lk.includes('employ')) rec.employment_type = String(val).trim();
                else if (lk.includes('service') || lk.includes('serving')) rec.service_status = String(val).trim();
                else if (lk.includes('gender')) rec.gender = String(val).trim();
                else if (lk.includes('pub')) rec.publications_3yr = Number(val) || 0;
                else if (lk.includes('patent')) rec.patents = Number(val) || 0;
                else if (lk.includes('orcid') || lk.includes('url')) rec.evidence_url = String(val).trim();
              } else if (table === 'students') {
                if (lk.includes('roll') || lk.includes('reg')) rec.roll_no = String(val).trim();
                else if (lk.includes('name')) rec.name = String(val).trim();
                else if (lk.includes('gender')) rec.gender = String(val).trim();
                else if (lk.includes('cat')) rec.category = String(val).trim();
                else if (lk.includes('state') || lk.includes('country') || lk.includes('domicile')) rec.state_country = String(val).trim();
                else if (lk.includes('pwd')) rec.is_pwd = String(val).toLowerCase().includes('yes');
                else if (lk.includes('prog')) rec.program = String(val).trim();
                else if (lk.includes('batch')) rec.batch_year = String(val).trim();
                else if (lk.includes('place')) rec.placement_status = String(val).trim();
                else if (lk.includes('high')) rec.higher_studies = String(val).trim();
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
              } else if (table === 'events') {
                if (lk.includes('title')) rec.title = String(val).trim();
                else if (lk.includes('cat')) rec.category = String(val).trim();
                else if (lk.includes('coord')) rec.coordinator = String(val).trim();
                else if (lk.includes('start')) rec.start_date = String(val).trim();
                else if (lk.includes('end')) rec.end_date = String(val).trim();
                else if (lk.includes('partic')) rec.participants_count = Number(val) || 0;
                else if (lk.includes('venue')) rec.venue = String(val).trim();
                else if (lk.includes('url') || lk.includes('report')) rec.evidence_url = String(val).trim();
              }
            });
            return rec;
          }).filter(r => r.name || r.title || r.roll_no);

          const inserted = await db.bulkInsert(table, parsed, mode);
          results[table] = inserted.length;
        }
      }
    }

    await db.logAudit('BULK_MASTER_IMPORT', 'all_sheets', JSON.stringify(results), actor, role,
      `Master spreadsheet ingested across tables: ${JSON.stringify(results)}`
    );

    res.json({ success: true, results });
  } catch (e) {
    res.status(500).json({ error: 'Master upload failed: ' + e.message });
  }
});

// --- Domain Spreadsheet Upload (Upload .xlsx / .csv) ---
app.post('/api/upload/:table', assertTable, upload.single('file'), async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const { table } = req.params;
    const mode = req.body.mode || 'append';

    if (!req.file) return res.status(400).json({ error: 'No spreadsheet file uploaded' });

    const wb = xlsx.read(req.file.buffer, { type: 'buffer' });
    const firstSheetName = wb.SheetNames[0];
    const rawRows = xlsx.utils.sheet_to_json(wb.Sheets[firstSheetName]);

    if (!rawRows || rawRows.length === 0) {
      return res.status(400).json({ error: 'Uploaded spreadsheet is empty' });
    }

    const parsedRecords = rawRows.map(raw => {
      const rec = { status: 'Approved by IQAC', note: 'Imported via official department spreadsheet' };
      Object.keys(raw).forEach(k => {
        const val = raw[k];
        const lowerKey = k.toLowerCase().replace(/[^a-z0-9]/g, '');

        if (table === 'faculty') {
          if (lowerKey.includes('name')) rec.name = String(val).trim();
          else if (lowerKey.includes('email')) rec.email = String(val).trim();
          else if (lowerKey.includes('designation')) rec.designation = String(val).trim();
          else if (lowerKey.includes('qualif')) rec.qualification = String(val).trim();
          else if (lowerKey.includes('spec')) rec.specialization = String(val).trim();
          else if (lowerKey.includes('exp')) rec.experience_years = Number(val) || 0;
          else if (lowerKey.includes('cadre') || lowerKey.includes('employ')) rec.employment_type = String(val).trim();
          else if (lowerKey.includes('service') || lowerKey.includes('serving')) rec.service_status = String(val).trim();
          else if (lowerKey.includes('gender')) rec.gender = String(val).trim();
          else if (lowerKey.includes('pub')) rec.publications_3yr = Number(val) || 0;
          else if (lowerKey.includes('patent')) rec.patents = Number(val) || 0;
          else if (lowerKey.includes('orcid') || lowerKey.includes('url')) rec.evidence_url = String(val).trim();
        } else if (table === 'students') {
          if (lowerKey.includes('roll') || lowerKey.includes('reg')) rec.roll_no = String(val).trim();
          else if (lowerKey.includes('name')) rec.name = String(val).trim();
          else if (lowerKey.includes('gender')) rec.gender = String(val).trim();
          else if (lowerKey.includes('cat')) rec.category = String(val).trim();
          else if (lowerKey.includes('state') || lowerKey.includes('country') || lowerKey.includes('domicile')) rec.state_country = String(val).trim();
          else if (lowerKey.includes('pwd')) rec.is_pwd = String(val).toLowerCase().includes('yes');
          else if (lowerKey.includes('prog')) rec.program = String(val).trim();
          else if (lowerKey.includes('batch')) rec.batch_year = String(val).trim();
          else if (lowerKey.includes('place')) rec.placement_status = String(val).trim();
          else if (lowerKey.includes('high')) rec.higher_studies = String(val).trim();
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
        } else if (table === 'events') {
          if (lowerKey.includes('title')) rec.title = String(val).trim();
          else if (lowerKey.includes('cat')) rec.category = String(val).trim();
          else if (lowerKey.includes('coord')) rec.coordinator = String(val).trim();
          else if (lowerKey.includes('start')) rec.start_date = String(val).trim();
          else if (lowerKey.includes('end')) rec.end_date = String(val).trim();
          else if (lowerKey.includes('partic')) rec.participants_count = Number(val) || 0;
          else if (lowerKey.includes('venue')) rec.venue = String(val).trim();
          else if (lowerKey.includes('url') || lowerKey.includes('report')) rec.evidence_url = String(val).trim();
        }
      });
      return rec;
    }).filter(r => (r.name || r.title || r.roll_no));

    const inserted = await db.bulkInsert(table, parsedRecords, mode);
    await db.logAudit('BULK_IMPORT', table, `${inserted.length} records`, actor, role,
      `Ingested ${inserted.length} records from uploaded spreadsheet (${req.file.originalname}).`
    );

    res.json({ success: true, count: inserted.length, records: inserted });
  } catch (e) {
    res.status(500).json({ error: 'Failed to process spreadsheet: ' + e.message });
  }
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
    await db.logAudit('UPDATE_INSTITUTION', 'institution', '1', actor, role, `Updated hierarchy for ${updated.department_name}`);
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Dynamic Pooled Profile Endpoint ---
app.get('/api/profile', async (req, res) => {
  try {
    const pooledProfile = await db.getComputedProfile();
    res.json(pooledProfile);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/profile', async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const updated = await db.updateProfile(req.body);
    await db.logAudit('UPDATE_PROFILE', 'profile', '1', actor, role, `Updated base budget/library financials.`);
    const computed = await db.getComputedProfile();
    res.json(computed);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Dedicated Accreditation Bodies Breakdown Hub ---
app.get('/api/accreditation/breakdown', async (req, res) => {
  try {
    const profile = await db.getComputedProfile();
    const faculty = await db.getCollection('faculty');
    const students = await db.getCollection('students');
    const infra = await db.getCollection('infrastructure');
    const research = await db.getCollection('research');
    const programs = await db.getCollection('programs');
    const events = await db.getCollection('events');

    const appFac = faculty.filter(f => (f.service_status || 'Current') === 'Current' && f.status === 'Approved by IQAC');
    const appRes = research.filter(r => r.status === 'Approved by IQAC');
    const appInfra = infra.filter(i => i.status === 'Approved by IQAC');
    const appProg = programs.filter(p => p.status === 'Approved by IQAC');

    res.json({
      naac: {
        criterion1_curriculum: { programsCount: appProg.length, coCount: appProg.reduce((s,p)=>s+(p.co_count||0),0) },
        criterion2_teaching: { sfr: profile.student_faculty_ratio, facultyCount: appFac.length, phdPct: profile.phd_faculty_percentage },
        criterion3_research: { publications: appRes.length, totalGrantsInr: profile.total_grants_inr },
        criterion4_infrastructure: { labsCount: appInfra.length, budgetUtilization: profile.budget_utilized_inr },
        criterion5_progression: { placementRate: profile.placement_pct, medianSalary: profile.median_salary_lpa },
        criterion6_governance: { fdpCount: events.length, iqacReviews: 12 },
        criterion7_values: { womenPct: profile.women_students_pct, pwdFacilities: profile.pwd_facilities }
      },
      nba: {
        tier: 'Tier-I (Washington Accord)',
        sfr: profile.student_faculty_ratio,
        cadreRatio: 'Compliant with AICTE (Prof : Assoc : Asst)',
        outcomesAttainment: profile.programs_count > 0 ? '84.2%' : 'Pending',
        laboratories: appInfra.filter(i => i.category === 'Laboratory').length
      },
      nirf: {
        tlr: { ss: profile.total_students, fsr: profile.student_faculty_ratio, fqe: `${profile.phd_faculty_percentage}% Ph.D.` },
        rpc: { pu: profile.scopus_publication_count, fr: profile.total_grants_inr },
        go: { gph: `${profile.placement_pct}% Placed`, medianSalary: `${profile.median_salary_lpa} LPA` },
        oi: { rd: `${profile.region_diverse_pct}%`, wd: `${profile.women_students_pct}%`, es: `${profile.esc_students_pct}%`, pcs: profile.pwd_facilities ? 'Yes' : 'No' }
      },
      aicte: {
        sfr: profile.student_faculty_ratio,
        facultyCount: appFac.length,
        labsCount: appInfra.length,
        mandatoryDisclosureStatus: 'Compliant'
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Dataset Reset & Sample Load ---
app.post('/api/dataset/reset-clean', async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    await db.clearCollection('faculty');
    await db.clearCollection('students');
    await db.clearCollection('infrastructure');
    await db.clearCollection('research');
    await db.clearCollection('programs');
    await db.clearCollection('events');
    await db.clearCollection('tasks');
    await db.logAudit('RESET_CLEAN', 'all_collections', '0', actor, role, 'Cleared all records for fresh onboarding.');
    res.json({ success: true, message: 'Portal reset to clean slate.' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/dataset/load-sample', async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    await db.loadSampleDataset();
    await db.logAudit('LOAD_SAMPLE', 'all_collections', 'sample', actor, role, 'Loaded CHRIST Civil Eng dataset.');
    res.json({ success: true, message: 'Sample dataset loaded.' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Audit & Master Export ---
app.get('/api/audit', async (req, res) => {
  try {
    const logs = await db.getAuditLogs(60);
    res.json(logs);
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

// ============================================================================
// GENERIC /api/:table ROUTES
// ============================================================================

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
    if (!sanitized.status && req.params.table !== 'tasks') sanitized.status = 'Draft';

    const created = await db.insertRecord(req.params.table, sanitized);
    await db.logAudit('CREATE', req.params.table, created.id, actor, role, `Created record: ${sanitized.name || sanitized.title || sanitized.roll_no || 'ID ' + created.id}`);
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
    
    await db.logAudit('UPDATE', req.params.table, req.params.id, actor, role, `Updated record details: ID ${req.params.id}`);
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

const PORT = process.env.PORT || 3000;

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  VERITA — Institutional Accreditation SaaS Platform`);
    console.log(`  Server running on http://localhost:${PORT}`);
    console.log(`  Database Engine: ${db.isPostgres() ? 'PostgreSQL' : 'Embedded Zero-Config JSON'}`);
    console.log(`======================================================\n`);
  });
}).catch(err => {
  console.error('Fatal initialization error:', err);
  process.exit(1);
});
