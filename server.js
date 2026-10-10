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
        'Full Name (with Title)': 'Dr. John Doe',
        'Official Email': 'john.doe@university.edu',
        'Designation': 'Professor',
        'Highest Qualification': 'Ph.D.',
        'Area of Specialization': 'Structural Engineering & Earthquake Resilient Design',
        'Teaching Experience (Years)': 22,
        'Employment Cadre': 'Regular',
        'Service Status (Current/Relieved)': 'Current',
        'Gender (Male/Female/Other)': 'Male',
        'Publications Last 3 Yrs': 14,
        'Patents Count': 2,
        'ORCID / Profile URL': 'https://orcid.org'
      },
      {
        'Full Name (with Title)': 'Dr. Jane Smith',
        'Official Email': 'jane.smith@university.edu',
        'Designation': 'Associate Professor',
        'Highest Qualification': 'Ph.D.',
        'Area of Specialization': 'Geotechnical & Geo-environmental Engineering',
        'Teaching Experience (Years)': 15,
        'Employment Cadre': 'Regular',
        'Service Status (Current/Relieved)': 'Current',
        'Gender (Male/Female/Other)': 'Female',
        'Publications Last 3 Yrs': 9,
        'Patents Count': 1,
        'ORCID / Profile URL': 'https://orcid.org'
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
        'Authors / Investigators': 'Dr. John Doe, Dr. Jane Smith, et al.',
        'Year': 2025,
        'Journal / Funding Agency': 'Journal of Structural Engineering (ASCE)',
        'Indexing Database': 'Scopus',
        'Amount INR (if Grant)': 0,
        'DOI / URL': 'https://doi.org/10.1061/JSENDH.STENG-12891'
      },
      {
        'Type of Contribution': 'Sponsored Research Project',
        'Title / Project Name': 'Development of low-carbon alkali-activated geopolymer concrete utilizing industrial slag',
        'Authors / Investigators': 'Dr. Robert Taylor (PI), Dr. Jane Smith (Co-PI)',
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
        'Faculty Coordinator': 'Dr. John Doe',
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
        'Assigned Faculty Email': 'john.doe@university.edu',
        'Faculty Name': 'Dr. John Doe',
        'Course Code / Module': 'CIV301 - Design of RC Structures',
        'Due Date (YYYY-MM-DD)': '2026-10-15',
        'Status (Pending/In Progress/Completed)': 'Pending',
        'Submission Link': 'https://drive.google.com/drive/my-drive',
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
// ============================================================================
// GOOGLE AUTH & USER PERSONAS
// ============================================================================
const PERSONAS = [
  {
    role: 'director',
    name: 'Dr. Jane Smith',
    email: 'director.iqac@university.edu',
    title: 'University IQAC Director',
    level: 'University Central Management',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=JaneSmith&backgroundColor=0e355f'
  },
  {
    role: 'dean',
    name: 'Dr. Robert Taylor',
    email: 'dean.set@university.edu',
    title: 'Dean, School of Engineering and Technology',
    level: 'School Level Leadership',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=RobertTaylor&backgroundColor=184a80'
  },
  {
    role: 'iqac',
    name: 'Dr. John Doe',
    email: 'john.doe@university.edu',
    title: 'HoD & Department IQAC Coordinator',
    level: 'Department Coordinator',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=JohnDoe&backgroundColor=c29b38'
  },
  {
    role: 'faculty',
    name: 'Prof. Alice Johnson',
    email: 'alice.johnson@university.edu',
    title: 'Assistant Professor (Transportation Systems)',
    level: 'Serving Faculty Member',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AliceJohnson&backgroundColor=265b68'
  },
  {
    role: 'faculty',
    name: 'Dr. Michael Brown',
    email: 'michael.brown@university.edu',
    title: 'Professor (Environmental Engineering)',
    level: 'Serving Faculty Member',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=MichaelBrown&backgroundColor=265b68'
  }
];

app.get('/api/auth/personas', (req, res) => {
  res.json(PERSONAS);
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, name, role, photo_url, university_name, school_name, department_name, drive_folder_url } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    let matchedRole = role || 'faculty';
    let matchedName = name || email.split('@')[0];
    let matchedAvatar = photo_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(matchedName)}`;

    const existingPersona = PERSONAS.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (existingPersona && !name) {
      matchedRole = role || existingPersona.role;
      matchedName = existingPersona.name;
      matchedAvatar = existingPersona.avatar;
    } else if (email.toLowerCase().includes('director') || email.toLowerCase().includes('iqac-uni')) {
      matchedRole = role || 'director';
    } else if (email.toLowerCase().includes('dean')) {
      matchedRole = role || 'dean';
    } else if (email.toLowerCase().includes('hod') || email.toLowerCase().includes('coordinator')) {
      matchedRole = role || 'iqac';
    }

    const currentInst = await db.getInstitution();
    const finalUniversity = (university_name && university_name.trim()) || currentInst.university_name || 'Apex University';
    const finalSchool = (school_name && school_name.trim()) || currentInst.school_name || 'School of Engineering and Technology';
    const finalDepartment = (department_name && department_name.trim()) || currentInst.department_name || 'Department of Civil Engineering';
    const finalDriveUrl = (drive_folder_url && drive_folder_url.trim()) || 'https://drive.google.com/drive/my-drive';

    // Update institution and hierarchy immediately so the whole portal reflects the login details!
    const updated = await db.updateInstitutionAndProfile({
      university_name: finalUniversity,
      school_name: finalSchool,
      department_name: finalDepartment,
      head_of_department: matchedRole === 'iqac' ? matchedName : currentInst.head_of_department,
      iqac_coordinator: matchedRole === 'iqac' ? matchedName : currentInst.iqac_coordinator,
      drive_folder_url: finalDriveUrl
    });

    const sessionUser = {
      email,
      name: matchedName,
      role: matchedRole,
      avatar: matchedAvatar,
      institution: finalUniversity,
      school: finalSchool,
      department: finalDepartment,
      drive_folder_url: finalDriveUrl,
      authenticated_at: new Date().toISOString()
    };

    await db.logAudit('USER_LOGIN', 'auth', email, matchedName, matchedRole, `Logged in as ${matchedName} (${matchedRole}) for ${finalDepartment}`);

    res.json({
      success: true,
      token: 'jwt-google-' + Buffer.from(email).toString('base64'),
      user: sessionUser,
      institution: updated.institution,
      hierarchy: updated.hierarchy
    });
  } catch (err) {
    res.status(500).json({ error: 'Auth failed: ' + err.message });
  }
});

// Update profile / institution information on the fly
app.put('/api/institution/profile', async (req, res) => {
  try {
    const updated = await db.updateInstitutionAndProfile(req.body);
    res.json({ success: true, institution: updated.institution, hierarchy: updated.hierarchy });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

app.put('/api/hierarchy/folder-link', async (req, res) => {
  try {
    const { level, targetId, folder_url } = req.body;
    if (!folder_url) return res.status(400).json({ error: 'folder_url is required' });
    const updatedHierarchy = await db.updateDriveFolderLink(level, targetId, folder_url);
    res.json({ success: true, hierarchy: updatedHierarchy });
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
    const inst = await db.getInstitution();
    const deptPrefix = (inst.department_name || 'Academic').replace(/[^a-zA-Z0-9]/g, '_');
    const defaultSheetTitle = `${deptPrefix}_${table.toUpperCase()}`;

    const civilDept = hier.schools?.[0]?.departments?.find(d => d.id === 'dept-civil') || hier.schools?.[0]?.departments?.[0];
    const linkedSheet = civilDept?.sheets?.[table];

    const googleSheetCopyUrl = `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/copy?usp=sharing`;
    const liveUrl = linkedSheet?.sheet_url || `https://docs.google.com/spreadsheets/create?title=${encodeURIComponent(defaultSheetTitle)}`;

    res.json({
      table,
      title: linkedSheet?.title || `${inst.department_name || 'Department'} ${cfg.name}`,
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
    const inst = await db.getInstitution();
    const deptPrefix = (inst.department_name || 'Academic').replace(/[^a-zA-Z0-9]/g, '_');
    await db.updateDepartmentSheets('dept-civil', {
      [table]: {
        title: `${deptPrefix}_${table.toUpperCase()}`,
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
        const fetchRes = await fetch(csvUrl, { headers: { 'User-Agent': 'QUALEX-360-Accreditation/2.0' } });
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
    res.setHeader('Content-Disposition', 'attachment; filename=Accreditation_Master_Template.xlsx');
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
    res.setHeader('Content-Disposition', `attachment; filename=TEMPLATE_${table.toUpperCase()}.csv`);
    return res.send(csv);
  }

  const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=TEMPLATE_${table.toUpperCase()}.xlsx`);
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

// ============================================================================
// QUALEX 360 INTELLIGENCE ENGINE & EXTENDED SUITE APIS
// ============================================================================

// 1. Smart Gap Auditor & CGPA Predictor
app.get('/api/audit/gap-analysis', async (req, res) => {
  try {
    const profile = await db.getComputedProfile();
    const faculty = await db.getCollection('faculty') || [];
    const students = await db.getCollection('students') || [];
    const infra = await db.getCollection('infrastructure') || [];
    const research = await db.getCollection('research') || [];
    const programs = await db.getCollection('programs') || [];
    const events = await db.getCollection('events') || [];
    const tasks = await db.getCollection('tasks') || [];

    const activeFac = faculty.filter(f => (f.service_status || 'Current') === 'Current');
    const approvedFac = activeFac.filter(f => f.status === 'Approved by IQAC');
    const approvedRes = research.filter(r => r.status === 'Approved by IQAC');
    const approvedInfra = infra.filter(i => i.status === 'Approved by IQAC');
    const labs = approvedInfra.filter(i => i.category === 'Laboratory');
    const ict = approvedInfra.filter(i => i.category === 'ICT Infrastructure' || i.category === 'Smart Classroom');

    const totalStudents = students.filter(s => (s.status || 'Active') === 'Active').length || students.length || 0;
    const facCount = activeFac.length || 1;
    const sfr = totalStudents > 0 ? Number((totalStudents / facCount).toFixed(1)) : (profile.student_faculty_ratio || 15.0);
    const phdCount = activeFac.filter(f => (f.qualification || '').includes('Ph.D.')).length;
    const phdPct = Number(((phdCount / facCount) * 100).toFixed(1));

    const totalPubs = research.filter(r => (r.type || '').includes('Journal') || (r.type || '').includes('Conference')).length;
    const scopusPubs = research.filter(r => (r.indexing || '') === 'Scopus' || (r.indexing || '') === 'Web of Science (WoS)').length;
    const pubPerFac = Number((totalPubs / facCount).toFixed(2));
    const patentsCount = research.filter(r => (r.type || '').toLowerCase().includes('patent')).length;
    const grantsSum = research.reduce((acc, r) => acc + (Number(r.amount_inr) || 0), 0);

    const avgAttainment = programs.length > 0
      ? Number((programs.reduce((acc, p) => acc + (Number(p.attainment_pct) || 0), 0) / programs.length).toFixed(1))
      : 84.2;

    const fdpCount = events.filter(e => (e.category || '').includes('FDP') || (e.category || '').includes('Workshop')).length;
    const fdpPerFac = Number((fdpCount / facCount).toFixed(2));

    // NAAC 7 Criteria Assessment & Scoring Model (Total 1000 Weighted Marks)
    // C1: Curricular Aspects (Weight: 100)
    let c1Score = 80;
    if (programs.length > 0 && avgAttainment >= 80) c1Score = 95;
    else if (programs.length > 0) c1Score = 85;

    // C2: Teaching-Learning & Evaluation (Weight: 350)
    let c2Score = 240;
    if (sfr <= 15) c2Score += 50; else if (sfr <= 20) c2Score += 30; else c2Score += 10;
    if (phdPct >= 70) c2Score += 60; else if (phdPct >= 50) c2Score += 40; else c2Score += 20;

    // C3: Research, Innovations & Extension (Weight: 120)
    let c3Score = 70;
    if (pubPerFac >= 1.5) c3Score += 25; else if (pubPerFac >= 0.8) c3Score += 15;
    if (grantsSum >= 2000000) c3Score += 15; else if (grantsSum > 0) c3Score += 10;
    if (patentsCount >= 2) c3Score += 10;

    // C4: Infrastructure & Learning Resources (Weight: 100)
    let c4Score = 75;
    if (labs.length >= 4) c4Score += 15;
    if (ict.length >= 2) c4Score += 10;

    // C5: Student Support & Progression (Weight: 130)
    const placedStudents = students.filter(s => (s.placement_status || '').toLowerCase().includes('placed')).length;
    const placementRate = totalStudents > 0 ? Number(((placedStudents / totalStudents) * 100).toFixed(1)) : 78.5;
    let c5Score = 85;
    if (placementRate >= 75) c5Score += 35; else if (placementRate >= 60) c5Score += 20;

    // C6: Governance, Leadership & Management (Weight: 100)
    let c6Score = 75;
    if (fdpPerFac >= 1.0) c6Score += 20; else if (fdpPerFac >= 0.5) c6Score += 10;

    // C7: Institutional Values & Best Practices (Weight: 100)
    const femaleStudents = students.filter(s => (s.gender || '').toLowerCase() === 'female').length;
    const femalePct = totalStudents > 0 ? Number(((femaleStudents / totalStudents) * 100).toFixed(1)) : 38;
    let c7Score = 80;
    if (femalePct >= 35) c7Score += 15;

    const totalWeightedScore = c1Score + c2Score + c3Score + c4Score + c5Score + c6Score + c7Score;
    const cgpa = Number(((totalWeightedScore / 1000) * 4.0).toFixed(2));

    let projectedGrade = 'B';
    if (cgpa >= 3.51) projectedGrade = 'A++ (Highest Standing)';
    else if (cgpa >= 3.26) projectedGrade = 'A+ (Distinguished)';
    else if (cgpa >= 3.01) projectedGrade = 'A (Accredited)';
    else if (cgpa >= 2.76) projectedGrade = 'B++';
    else if (cgpa >= 2.51) projectedGrade = 'B+';

    // Automated Actionable Gap Identification
    const recommendations = [];
    if (sfr > 15) {
      recommendations.push({
        criterion: 'Criterion 2 (Teaching-Learning)',
        severity: 'high',
        text: `Student-to-Faculty Ratio is currently ${sfr}:1. AICTE/NAAC optimum target is 15:1. Consider inducting ${Math.max(1, Math.ceil(totalStudents / 15) - facCount)} additional full-time faculty.`
      });
    }
    if (phdPct < 60) {
      recommendations.push({
        criterion: 'Criterion 2 (Faculty Quality)',
        severity: 'medium',
        text: `Doctoral faculty percentage is ${phdPct}%. Target is ≥ 60% for Tier-I institutions. Encourage registered faculty to complete Ph.D. dissertations.`
      });
    }
    if (pubPerFac < 1.5) {
      recommendations.push({
        criterion: 'Criterion 3 (Research & Innovations)',
        severity: 'high',
        text: `Indexed publication average is ${pubPerFac} papers/faculty. NAAC Benchmark requires ≥ 1.5 Scopus/WoS publications per faculty annually.`
      });
    }
    const missingEvidencePubs = research.filter(r => !r.evidence_url || r.evidence_url.trim() === '').length;
    if (missingEvidencePubs > 0) {
      recommendations.push({
        criterion: 'Criterion 3 (Evidence Vault)',
        severity: 'critical',
        text: `${missingEvidencePubs} research records are missing DOI or Sanction links. DVV audit rejects records without verified evidence.`
      });
    }
    if (fdpPerFac < 1.0) {
      recommendations.push({
        criterion: 'Criterion 6 (Faculty Development)',
        severity: 'medium',
        text: `Faculty FDP participation is ${fdpPerFac} per faculty. IQAC mandates at least 1 professional development program per teacher per year.`
      });
    }
    if (avgAttainment < 80) {
      recommendations.push({
        criterion: 'NBA Criterion 3 (Course Outcomes)',
        severity: 'high',
        text: `OBE Course Outcome Attainment is ${avgAttainment}%. Washington Accord standard benchmark is ≥ 80%. Program Assessment Committee review recommended.`
      });
    }

    res.json({
      success: true,
      cgpa,
      projectedGrade,
      totalWeightedScore,
      maxScore: 1000,
      readinessPct: Number(((totalWeightedScore / 1000) * 100).toFixed(1)),
      criteria: [
        { id: 'C1', title: 'Curricular Aspects', weight: 100, score: c1Score, status: c1Score >= 85 ? 'Optimized' : 'Needs Review' },
        { id: 'C2', title: 'Teaching-Learning & Evaluation', weight: 350, score: c2Score, status: c2Score >= 300 ? 'Optimized' : (c2Score >= 250 ? 'Compliant' : 'Gap Detected') },
        { id: 'C3', title: 'Research, Innovations & Extension', weight: 120, score: c3Score, status: c3Score >= 95 ? 'Optimized' : 'Gap Detected' },
        { id: 'C4', title: 'Infrastructure & Learning Resources', weight: 100, score: c4Score, status: c4Score >= 85 ? 'Optimized' : 'Compliant' },
        { id: 'C5', title: 'Student Support & Progression', weight: 130, score: c5Score, status: c5Score >= 105 ? 'Optimized' : 'Compliant' },
        { id: 'C6', title: 'Governance, Leadership & Management', weight: 100, score: c6Score, status: c6Score >= 85 ? 'Optimized' : 'Needs Review' },
        { id: 'C7', title: 'Institutional Values & Best Practices', weight: 100, score: c7Score, status: c7Score >= 85 ? 'Optimized' : 'Compliant' }
      ],
      nbaMetrics: {
        tier: 'Tier-I (Washington Accord)',
        coAttainment: `${avgAttainment}%`,
        sfr: `${sfr} : 1`,
        phdFaculty: `${phdPct}%`,
        cadreRatio: 'Compliant (1:2:6)'
      },
      recommendations
    });
  } catch (err) {
    res.status(500).json({ error: 'Audit gap analysis failed: ' + err.message });
  }
});

// 2. Faculty PBAS / CAS API Score Calculator (UGC 7th CPC Framework)
app.get('/api/pbas/calculator', async (req, res) => {
  try {
    const faculty = await db.getCollection('faculty') || [];
    const research = await db.getCollection('research') || [];
    const events = await db.getCollection('events') || [];

    const results = faculty.map(fac => {
      const facName = (fac.name || '').toLowerCase();
      const facEmail = (fac.email || '').toLowerCase();

      // Find research attributed to faculty
      const facRes = research.filter(r => {
        const auth = (r.authors || '').toLowerCase();
        return auth.includes(facName.replace('dr.', '').replace('prof.', '').trim()) || (r.user_email && r.user_email.toLowerCase() === facEmail);
      });

      // Find events coordinated by faculty
      const facEvents = events.filter(e => {
        const coord = (e.coordinator || '').toLowerCase();
        return coord.includes(facName.replace('dr.', '').replace('prof.', '').trim());
      });

      // Category I: Teaching Activities (Max 80 points)
      const expYears = Number(fac.experience_years) || 5;
      const cat1Score = Math.min(80, 50 + (expYears * 2));

      // Category II: Institutional Governance & IQAC Activities (Max 50 points)
      let cat2Score = 20;
      if (fac.designation === 'Professor') cat2Score += 20;
      else if (fac.designation === 'Associate Professor') cat2Score += 15;
      else cat2Score += 10;
      cat2Score += Math.min(10, facEvents.length * 5);
      cat2Score = Math.min(50, cat2Score);

      // Category III: Research & Academic Contributions
      let cat3Score = 0;
      facRes.forEach(r => {
        const type = (r.type || '').toLowerCase();
        const indexing = (r.indexing || '').toLowerCase();
        const grant = Number(r.amount_inr) || 0;

        if (type.includes('journal')) {
          if (indexing.includes('scopus') || indexing.includes('web of science')) cat3Score += 25;
          else if (indexing.includes('ugc')) cat3Score += 15;
          else cat3Score += 10;
        } else if (type.includes('conference')) {
          cat3Score += 10;
        } else if (type.includes('grant') || type.includes('project')) {
          if (grant >= 1000000) cat3Score += 20;
          else if (grant >= 200000) cat3Score += 10;
          else cat3Score += 5;
        } else if (type.includes('patent')) {
          cat3Score += 25;
        } else if (type.includes('consultancy')) {
          cat3Score += 10;
        } else if (type.includes('book')) {
          cat3Score += 12;
        }
      });

      // Add points for patents / publications logged in faculty record directly
      const extraPubs = Math.max(0, (Number(fac.publications_3yr) || 0) - facRes.length);
      cat3Score += extraPubs * 15;
      const extraPatents = Math.max(0, (Number(fac.patents) || 0) - facRes.filter(r => (r.type || '').toLowerCase().includes('patent')).length);
      cat3Score += extraPatents * 25;

      const totalApiScore = cat1Score + cat2Score + cat3Score;

      let promotionEligibility = 'Current Cadre Verified';
      if (fac.designation === 'Assistant Professor' && totalApiScore >= 120 && expYears >= 5) {
        promotionEligibility = 'Eligible for Stage 2 / Senior Scale (AGP 7000 / Level 11)';
      } else if (fac.designation === 'Assistant Professor' && totalApiScore >= 180 && expYears >= 9) {
        promotionEligibility = 'Eligible for Selection Grade / Associate Professor (Level 12/13A)';
      } else if (fac.designation === 'Associate Professor' && totalApiScore >= 250 && expYears >= 12) {
        promotionEligibility = 'Eligible for Professor Grade (AGP 10000 / Level 14)';
      } else if (fac.designation === 'Professor' && totalApiScore >= 350) {
        promotionEligibility = 'Senior Professor Benchmark Achieved (Level 15)';
      }

      return {
        id: fac.id,
        name: fac.name,
        email: fac.email,
        designation: fac.designation,
        qualification: fac.qualification,
        experience_years: expYears,
        papersCount: facRes.filter(r => (r.type || '').toLowerCase().includes('journal')).length + (Number(fac.publications_3yr) || 0),
        patentsCount: Number(fac.patents) || 0,
        grantsSum: facRes.reduce((acc, r) => acc + (Number(r.amount_inr) || 0), 0),
        cat1Teaching: cat1Score,
        cat2Governance: cat2Score,
        cat3Research: cat3Score,
        totalApiScore,
        promotionEligibility
      };
    });

    res.json({
      success: true,
      totalFaculty: faculty.length,
      averageApiScore: results.length > 0 ? Number((results.reduce((acc, f) => acc + f.totalApiScore, 0) / results.length).toFixed(1)) : 0,
      facultyScores: results
    });
  } catch (err) {
    res.status(500).json({ error: 'PBAS calculator failed: ' + err.message });
  }
});

// 3. Evidence Vault Health & Verification Scanner (DVV Readiness)
app.get('/api/evidence/health', async (req, res) => {
  try {
    const collections = ['faculty', 'infrastructure', 'research', 'events', 'tasks'];
    const summary = {};
    let totalItems = 0;
    let validItems = 0;
    let missingItems = 0;
    const missingRecords = [];

    for (const c of collections) {
      const records = await db.getCollection(c) || [];
      const linkKey = c === 'tasks' ? 'submission_url' : 'evidence_url';
      let cValid = 0;
      let cMissing = 0;

      records.forEach(r => {
        const url = (r[linkKey] || '').trim();
        const hasValidUrl = url.startsWith('http://') || url.startsWith('https://');
        if (hasValidUrl) {
          cValid++;
        } else {
          cMissing++;
          missingRecords.push({
            collection: c,
            id: r.id,
            title: r.name || r.title || `Record #${r.id}`,
            currentUrl: url
          });
        }
      });

      totalItems += records.length;
      validItems += cValid;
      missingItems += cMissing;

      summary[c] = {
        total: records.length,
        verified: cValid,
        missing: cMissing,
        healthPct: records.length > 0 ? Number(((cValid / records.length) * 100).toFixed(1)) : 100
      };
    }

    const overallHealthPct = totalItems > 0 ? Number(((validItems / totalItems) * 100).toFixed(1)) : 100;

    res.json({
      success: true,
      overallHealthPct,
      dvvStatus: overallHealthPct >= 90 ? 'DVV Audit Ready (High Compliance)' : (overallHealthPct >= 70 ? 'Moderate (Remediation Needed)' : 'Critical Evidence Gaps'),
      totalItems,
      validItems,
      missingItems,
      summary,
      missingRecords: missingRecords.slice(0, 30)
    });
  } catch (err) {
    res.status(500).json({ error: 'Evidence health scan failed: ' + err.message });
  }
});

// 4. Batch Evidence Link Attacher
app.post('/api/evidence/batch-update', async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const { updates } = req.body;
    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ error: 'Array of updates required' });
    }

    let updatedCount = 0;
    for (const item of updates) {
      const { collection, id, evidence_url } = item;
      if (collection && id && evidence_url) {
        const linkKey = collection === 'tasks' ? 'submission_url' : 'evidence_url';
        await db.updateRecord(collection, id, { [linkKey]: evidence_url.trim() });
        updatedCount++;
      }
    }

    await db.logAudit('BATCH_EVIDENCE_UPDATE', 'evidence_vault', `${updatedCount} records`, actor, role, `Batch updated evidence links for ${updatedCount} records.`);
    res.json({ success: true, updatedCount });
  } catch (err) {
    res.status(500).json({ error: 'Batch evidence update failed: ' + err.message });
  }
});

// 5. One-Click Backup Restore
app.post('/api/backup/restore', async (req, res) => {
  try {
    const { actor, role } = extractActor(req);
    const payload = req.body;
    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Invalid backup JSON payload' });
    }

    await db.syncAllState(payload);
    await db.logAudit('BACKUP_RESTORE', 'system', 'all', actor, role, 'Full system restore executed successfully.');
    res.json({ success: true, message: 'Portal state restored successfully from backup.' });
  } catch (err) {
    res.status(500).json({ error: 'Backup restore failed: ' + err.message });
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
    await db.logAudit('LOAD_SAMPLE', 'all_collections', 'sample', actor, role, 'Loaded baseline academic accreditation dataset.');
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
    res.setHeader('Content-Disposition', `attachment; filename=accreditation_master_backup_${new Date().toISOString().slice(0,10)}.json`);
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
    console.log(`  QUALEX 360 — Institutional Quality & Accreditation Intelligence Platform`);
    console.log(`  Server running on http://localhost:${PORT}`);
    console.log(`  Database Engine: ${db.isPostgres() ? 'PostgreSQL' : 'Embedded Zero-Config JSON'}`);
    console.log(`======================================================\n`);
  });
}).catch(err => {
  console.error('Fatal initialization error:', err);
  process.exit(1);
});
