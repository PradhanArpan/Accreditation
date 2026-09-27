const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const DATA_FILE = path.join(__dirname, 'local_data.json');
const BACKUP_FILE = path.join(__dirname, 'backup_data.json');

// Master Default Store with full University > School > Department SaaS Hierarchy
const DEFAULT_STORE = {
  institution: {
    university_name: 'CHRIST (Deemed to be University)',
    campus: 'Bangalore Kengeri Campus',
    naac_accreditation_cycle: 'Cycle 4 (A+ Grade)',
    school_name: 'School of Engineering and Technology',
    department_name: 'Department of Civil Engineering',
    head_of_department: 'Dr. Joseph Kurian',
    iqac_coordinator: 'Dr. Ramesh Chandra',
    academic_year: '2026-27',
    updated_at: new Date().toISOString()
  },
  hierarchy: {
    university: {
      id: 'christ-uni',
      name: 'CHRIST (Deemed to be University)',
      campus: 'Bangalore Kengeri Campus',
      iqac_director_name: 'Dr. Anil Kumar',
      iqac_director_email: 'director.iqac@christuniversity.in',
      drive_folder_id: '1Abc_CHRIST_Central_IQAC_Drive',
      drive_folder_url: 'https://drive.google.com/drive/folders/1Abc_CHRIST_Central_IQAC_Drive'
    },
    schools: [
      {
        id: 'school-set',
        name: 'School of Engineering and Technology',
        dean_name: 'Dr. Iven Jose',
        dean_email: 'dean.set@christuniversity.in',
        drive_folder_id: '1Def_School_Engineering_Technology_Drive',
        drive_folder_url: 'https://drive.google.com/drive/folders/1Def_School_Engineering_Technology_Drive',
        departments: [
          {
            id: 'dept-civil',
            name: 'Department of Civil Engineering',
            hod_name: 'Dr. Joseph Kurian',
            hod_email: 'joseph.kurian@christuniversity.in',
            iqac_coordinator: 'Dr. Ramesh Chandra',
            iqac_email: 'ramesh.chandra@christuniversity.in',
            drive_folder_id: '1Ghi_Dept_Civil_Engineering_Drive',
            drive_folder_url: 'https://drive.google.com/drive/folders/1Ghi_Dept_Civil_Engineering_Drive',
            sheets: {
              faculty: {
                title: 'CHRIST_Civil_Faculty_Roster',
                sheet_id: '1aBcD_Faculty_Sheet_CE',
                sheet_url: 'https://docs.google.com/spreadsheets/d/1aBcD_Faculty_Sheet_CE/edit',
                status: 'Connected',
                last_synced: new Date().toISOString()
              },
              students: {
                title: 'CHRIST_Civil_Students_Cohort',
                sheet_id: '1eFgH_Students_Sheet_CE',
                sheet_url: 'https://docs.google.com/spreadsheets/d/1eFgH_Students_Sheet_CE/edit',
                status: 'Connected',
                last_synced: new Date().toISOString()
              },
              infrastructure: {
                title: 'CHRIST_Civil_Infrastructure_Labs',
                sheet_id: '1iJkL_Infra_Sheet_CE',
                sheet_url: 'https://docs.google.com/spreadsheets/d/1iJkL_Infra_Sheet_CE/edit',
                status: 'Connected',
                last_synced: new Date().toISOString()
              },
              research: {
                title: 'CHRIST_Civil_Research_Grants',
                sheet_id: '1mNoP_Research_Sheet_CE',
                sheet_url: 'https://docs.google.com/spreadsheets/d/1mNoP_Research_Sheet_CE/edit',
                status: 'Connected',
                last_synced: new Date().toISOString()
              },
              events: {
                title: 'CHRIST_Civil_Events_FDPs',
                sheet_id: '1qRsT_Events_Sheet_CE',
                sheet_url: 'https://docs.google.com/spreadsheets/d/1qRsT_Events_Sheet_CE/edit',
                status: 'Connected',
                last_synced: new Date().toISOString()
              }
            }
          }
        ]
      }
    ]
  },
  faculty: [
    {
      id: 1,
      name: 'Dr. Ramesh Chandra',
      email: 'ramesh.chandra@christuniversity.in',
      designation: 'Professor',
      qualification: 'Ph.D.',
      specialization: 'Structural Engineering & Earthquake Resilient Design',
      experience_years: 22,
      employment_type: 'Regular',
      service_status: 'Current',
      gender: 'Male',
      publications_3yr: 12,
      patents: 2,
      status: 'Approved by IQAC',
      note: 'Verified against Scopus ID and Ph.D. certificate.',
      evidence_url: 'https://orcid.org/0000-0002-1825-0097',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Dr. Priya V. Nair',
      email: 'priya.nair@christuniversity.in',
      designation: 'Associate Professor',
      qualification: 'Ph.D.',
      specialization: 'Geotechnical & Geo-environmental Engineering',
      experience_years: 15,
      employment_type: 'Regular',
      service_status: 'Current',
      gender: 'Female',
      publications_3yr: 8,
      patents: 1,
      status: 'Approved by IQAC',
      note: 'AICTE 360 feedback verified.',
      evidence_url: 'https://orcid.org/0000-0003-4512-8821',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Dr. Anand K. Murthy',
      email: 'anand.murthy@christuniversity.in',
      designation: 'Assistant Professor',
      qualification: 'Ph.D.',
      specialization: 'Water Resources & Climate Change Modeling',
      experience_years: 8,
      employment_type: 'Regular',
      service_status: 'Current',
      gender: 'Male',
      publications_3yr: 6,
      patents: 1,
      status: 'Approved by IQAC',
      note: 'Sponsored project PI for DST-SERB grant.',
      evidence_url: 'https://orcid.org/0000-0001-9234-5510',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      name: 'Prof. Deepa S.',
      email: 'deepa.s@christuniversity.in',
      designation: 'Assistant Professor',
      qualification: 'M.Tech / M.E.',
      specialization: 'Transportation Systems & Smart Urban Mobility',
      experience_years: 6,
      employment_type: 'Regular',
      service_status: 'Current',
      gender: 'Female',
      publications_3yr: 4,
      patents: 0,
      status: 'Submitted to IQAC',
      note: 'Submitted updated conference paper certificates.',
      evidence_url: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 5,
      name: 'Dr. Joseph Kurian',
      email: 'joseph.kurian@christuniversity.in',
      designation: 'Professor',
      qualification: 'Ph.D.',
      specialization: 'Environmental Engineering & Sustainable Concrete',
      experience_years: 25,
      employment_type: 'Regular',
      service_status: 'Current',
      gender: 'Male',
      publications_3yr: 15,
      patents: 3,
      status: 'Approved by IQAC',
      note: 'Head of Department; verified.',
      evidence_url: 'https://orcid.org/0000-0002-7719-3321',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  students: [
    {
      id: 1,
      roll_no: '23BCIV001',
      name: 'Aditi Sharma',
      gender: 'Female',
      category: 'General',
      state_country: 'Delhi',
      is_pwd: false,
      program: 'B.Tech in Civil Engineering',
      batch_year: '2023-27',
      status: 'Active',
      placement_status: 'Undergraduate',
      higher_studies: 'Pending',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      roll_no: '23BCIV002',
      name: 'Karan Patel',
      gender: 'Male',
      category: 'OBC',
      state_country: 'Gujarat',
      is_pwd: false,
      program: 'B.Tech in Civil Engineering',
      batch_year: '2023-27',
      status: 'Active',
      placement_status: 'Undergraduate',
      higher_studies: 'Pending',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      roll_no: '22BCIV015',
      name: 'Sneha Rao',
      gender: 'Female',
      category: 'SC',
      state_country: 'Karnataka',
      is_pwd: false,
      program: 'B.Tech in Civil Engineering',
      batch_year: '2022-26',
      status: 'Active',
      placement_status: 'Placed (L&T Construction - 7.2 LPA)',
      higher_studies: 'No',
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      roll_no: '22BCIV032',
      name: 'Mohammed Tariq',
      gender: 'Male',
      category: 'EWS',
      state_country: 'Kerala',
      is_pwd: false,
      program: 'B.Tech in Civil Engineering',
      batch_year: '2022-26',
      status: 'Active',
      placement_status: 'Placed (Tata Projects - 6.5 LPA)',
      higher_studies: 'GATE Qualified',
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      roll_no: '24MCIV003',
      name: 'Rahul Varma',
      gender: 'Male',
      category: 'General',
      state_country: 'Nepal',
      is_pwd: true,
      program: 'M.Tech in Structural Engineering',
      batch_year: '2024-26',
      status: 'Active',
      placement_status: 'Internship / Consultancy',
      higher_studies: 'Ph.D. Aspirant',
      created_at: new Date().toISOString()
    }
  ],
  infrastructure: [
    {
      id: 1,
      category: 'Laboratory',
      name: 'Advanced Structural Dynamics & Heavy Testing Lab (Room CE-104)',
      capacity: '60 students / 2400 sq.ft',
      equipment_count: 14,
      year_established: 2018,
      evidence_note: 'Geo-tagged photos, NABL calibration certificates filed in Room CE-104',
      status: 'Approved by IQAC',
      note: 'Meets NBA Criterion 6 requirements.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      category: 'Laboratory',
      name: 'Geotechnical & Soil Mechanics Testing Lab (Room CE-102)',
      capacity: '40 students / 1800 sq.ft',
      equipment_count: 18,
      year_established: 2017,
      evidence_note: 'Triaxial testing setup, direct shear apparatus verified with AMC logbooks',
      status: 'Approved by IQAC',
      note: 'Maintained with annual AMC logbooks.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      category: 'ICT Infrastructure',
      name: 'BIM, GIS & Civil CAD Computing Center (Room CE-201)',
      capacity: '60 workstations',
      equipment_count: 60,
      year_established: 2021,
      evidence_note: 'Licensed AutoCAD, STAAD.Pro, ETABS, and ArcGIS server licenses',
      status: 'Approved by IQAC',
      note: '100 Mbps dedicated LAN line available.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      category: 'Laboratory',
      name: 'Environmental Engineering & Water Quality Lab (Room CE-105)',
      capacity: '40 students / 1500 sq.ft',
      equipment_count: 12,
      year_established: 2019,
      evidence_note: 'Spectrophotometer, BOD Incubators, Turbidity meters calibrated',
      status: 'Submitted to IQAC',
      note: 'Annual calibration report uploaded.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  research: [
    {
      id: 1,
      type: 'Journal Publication',
      title: 'Seismic fragility curves for reinforced concrete frames with masonry infill walls under near-fault motions',
      authors: 'Ramesh Chandra, Joseph Kurian, et al.',
      year: 2025,
      venue: 'Journal of Structural Engineering (ASCE)',
      indexing: 'Scopus',
      amount_inr: null,
      status: 'Approved by IQAC',
      note: 'Indexed in Web of Science / Q1 Journal.',
      evidence_url: 'https://doi.org/10.1061/JSENDH.STENG-12891',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      type: 'Sponsored Research Project',
      title: 'Development of low-carbon alkali-activated geopolymer concrete utilizing industrial slag',
      authors: 'Dr. Joseph Kurian (PI), Dr. Priya V. Nair (Co-PI)',
      year: 2024,
      venue: 'Department of Science and Technology (DST-SERB)',
      indexing: 'Peer Reviewed / Other',
      amount_inr: 3450000,
      status: 'Approved by IQAC',
      note: 'Sanction order copy verified: DST/SERB/CRG/2024/004128',
      evidence_url: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      type: 'Patent Granted / Published',
      title: 'Smart sensor-embedded permeable pavement block for stormwater filtration and real-time runoff monitoring',
      authors: 'Dr. Anand K. Murthy, Dr. Ramesh Chandra',
      year: 2025,
      venue: 'Indian Patent Office (Application No. 202541019283)',
      indexing: 'Peer Reviewed / Other',
      amount_inr: null,
      status: 'Approved by IQAC',
      note: 'Published in Indian Patent Journal.',
      evidence_url: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      type: 'Consultancy Assignment',
      title: 'Structural health monitoring and retrofitting design for multi-story residential towers in Bangalore',
      authors: 'Dr. Ramesh Chandra, Dr. Priya V. Nair',
      year: 2025,
      venue: 'Shobha Developers Ltd.',
      indexing: 'Peer Reviewed / Other',
      amount_inr: 850000,
      status: 'Submitted to IQAC',
      note: 'Utilization certificate and institutional overhead share submitted.',
      evidence_url: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  programs: [
    {
      id: 1,
      name: 'B.Tech in Civil Engineering',
      level: 'UG',
      tier: 'Tier-I (Washington Accord)',
      intake: 120,
      co_count: 360,
      po_count: 12,
      attainment_pct: 84.2,
      status: 'Approved by IQAC',
      note: 'NBA Tier-I accredited; SAR updated for current cycle.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'M.Tech in Structural Engineering',
      level: 'PG',
      tier: 'Tier-I (Washington Accord)',
      intake: 24,
      co_count: 120,
      po_count: 11,
      attainment_pct: 88.0,
      status: 'Approved by IQAC',
      note: 'OBE curriculum reviewed with Board of Studies (BoS).',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  events: [
    {
      id: 1,
      title: 'National Conference on Sustainable Smart Materials & Infrastructure (NCSSMI-2025)',
      category: 'National Conference',
      coordinator: 'Dr. Joseph Kurian & Dr. Ramesh Chandra',
      start_date: '2025-02-14',
      end_date: '2025-02-15',
      participants_count: 180,
      venue: 'Audi Block, Kengeri Campus',
      status: 'Approved by IQAC',
      evidence_url: 'https://christuniversity.in/events/ncssmi-2025',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'AICTE-ATAL 5-Day Faculty Development Program on Earthquake Engineering & Disaster Resilience',
      category: 'Faculty Development Program (FDP)',
      coordinator: 'Dr. Ramesh Chandra',
      start_date: '2024-11-18',
      end_date: '2024-11-22',
      participants_count: 55,
      venue: 'Room CE-104 / Virtual Hybrid',
      status: 'Approved by IQAC',
      evidence_url: '',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Hands-on Workshop on BIM Modeling & ETABS Structural Analysis for Pre-final Year Students',
      category: 'Technical Workshop',
      coordinator: 'Prof. Deepa S.',
      start_date: '2025-03-05',
      end_date: '2025-03-06',
      participants_count: 90,
      venue: 'BIM & CAD Computing Center',
      status: 'Approved by IQAC',
      evidence_url: '',
      created_at: new Date().toISOString()
    }
  ],
  tasks: [
    {
      id: 1,
      title: 'Upload Course Outcome (CO) Attainment Sheets for Odd Semester 2025-26',
      assigned_to_email: 'ramesh.chandra@christuniversity.in',
      assigned_to_name: 'Dr. Ramesh Chandra',
      course_code: 'CIV301 - Design of Reinforced Concrete',
      due_date: '2026-10-15',
      status: 'Completed',
      submission_url: 'https://drive.google.com/christ/civ301/co-po-attainment.pdf',
      remarks: 'Direct attainment computed at 86.4%. Verified by PAC.'
    },
    {
      id: 2,
      title: 'Submit NABL Calibration Certificates for Geotechnical Triaxial Cell',
      assigned_to_email: 'priya.nair@christuniversity.in',
      assigned_to_name: 'Dr. Priya V. Nair',
      course_code: 'LAB-CE102',
      due_date: '2026-10-20',
      status: 'In Progress',
      submission_url: '',
      remarks: 'Calibration vendor scheduled for inspection this week.'
    },
    {
      id: 3,
      title: 'Update Scopus Author Profile & File Q1 Journal Paper Reprints',
      assigned_to_email: 'anand.murthy@christuniversity.in',
      assigned_to_name: 'Dr. Anand K. Murthy',
      course_code: 'RES-CE-2025',
      due_date: '2026-10-30',
      status: 'Pending',
      submission_url: '',
      remarks: 'Required for NAAC Metric 3.3.2 verification.'
    }
  ],
  // Baseline Departmental Financial & Library Profile (supplemented dynamically by faculty/student pooling)
  profile: {
    id: 1,
    academic_year: '2026-27',
    budget_allocated_inr: 8500000,
    budget_utilized_inr: 8120000,
    library_books_count: 5420,
    wifi_ict_available: true,
    updated_at: new Date().toISOString()
  },
  audit_logs: [
    {
      id: 1,
      action: 'SYSTEM_READY',
      entity: 'institution',
      entity_id: '1',
      actor: 'System Administrator',
      role: 'admin',
      details: 'Portal hierarchy established: CHRIST (Deemed to be University) > School of Engineering and Technology > Department of Civil Engineering.',
      timestamp: new Date().toISOString()
    }
  ]
};

let usePostgres = false;
let pgPool = null;
let localStore = null;

function loadLocalStore() {
  let loaded = false;
  // Try primary DATA_FILE first
  if (fs.existsSync(DATA_FILE)) {
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf8');
      localStore = JSON.parse(content);
      loaded = true;
    } catch (err) {
      console.warn('Primary store read warning:', err.message);
    }
  }

  // Fallback to BACKUP_FILE if primary was not loaded or empty
  if (!loaded && fs.existsSync(BACKUP_FILE)) {
    try {
      const content = fs.readFileSync(BACKUP_FILE, 'utf8');
      localStore = JSON.parse(content);
      loaded = true;
      console.log('Restored state from backup_data.json');
    } catch (err) {
      console.warn('Backup store read warning:', err.message);
    }
  }

  if (!loaded || !localStore) {
    localStore = JSON.parse(JSON.stringify(DEFAULT_STORE));
  }

  // Ensure all required domain collections and hierarchy exist
  if (!localStore.institution) localStore.institution = { ...DEFAULT_STORE.institution };
  if (!localStore.hierarchy) localStore.hierarchy = JSON.parse(JSON.stringify(DEFAULT_STORE.hierarchy));
  if (!localStore.faculty) localStore.faculty = JSON.parse(JSON.stringify(DEFAULT_STORE.faculty));
  if (!localStore.students) localStore.students = JSON.parse(JSON.stringify(DEFAULT_STORE.students));
  if (!localStore.infrastructure) localStore.infrastructure = JSON.parse(JSON.stringify(DEFAULT_STORE.infrastructure));
  if (!localStore.research) localStore.research = JSON.parse(JSON.stringify(DEFAULT_STORE.research));
  if (!localStore.events) localStore.events = JSON.parse(JSON.stringify(DEFAULT_STORE.events));
  if (!localStore.programs) localStore.programs = JSON.parse(JSON.stringify(DEFAULT_STORE.programs));
  if (!localStore.tasks) localStore.tasks = JSON.parse(JSON.stringify(DEFAULT_STORE.tasks));
  if (!localStore.profile) localStore.profile = { ...DEFAULT_STORE.profile };

  saveLocalStore();
}

function saveLocalStore() {
  try {
    const jsonStr = JSON.stringify(localStore, null, 2);
    fs.writeFileSync(DATA_FILE, jsonStr, 'utf8');
    fs.writeFileSync(BACKUP_FILE, jsonStr, 'utf8');
  } catch (err) {
    console.error('Error saving local_data.json / backup_data.json:', err.message);
  }
}

// PostgreSQL Schema Initialization
async function initPgSchema(pool) {
  const schemaSql = `
    CREATE TABLE IF NOT EXISTS institution (
      id INTEGER PRIMARY KEY DEFAULT 1,
      university_name TEXT,
      campus TEXT,
      naac_accreditation_cycle TEXT,
      school_name TEXT,
      department_name TEXT,
      head_of_department TEXT,
      iqac_coordinator TEXT,
      academic_year TEXT,
      updated_at TIMESTAMPTZ DEFAULT now(),
      CONSTRAINT single_inst CHECK (id = 1)
    );

    CREATE TABLE IF NOT EXISTS faculty (
      id SERIAL PRIMARY KEY,
      name TEXT,
      email TEXT,
      designation TEXT,
      qualification TEXT,
      specialization TEXT,
      experience_years INTEGER,
      employment_type TEXT,
      service_status TEXT DEFAULT 'Current',
      gender TEXT DEFAULT 'Male',
      publications_3yr INTEGER,
      patents INTEGER,
      status TEXT DEFAULT 'Draft',
      note TEXT,
      evidence_url TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      roll_no TEXT,
      name TEXT,
      gender TEXT,
      category TEXT,
      state_country TEXT,
      is_pwd BOOLEAN DEFAULT false,
      program TEXT,
      batch_year TEXT,
      status TEXT DEFAULT 'Active',
      placement_status TEXT,
      higher_studies TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS infrastructure (
      id SERIAL PRIMARY KEY,
      category TEXT,
      name TEXT,
      capacity TEXT,
      equipment_count INTEGER,
      year_established INTEGER,
      evidence_note TEXT,
      status TEXT DEFAULT 'Draft',
      note TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS research (
      id SERIAL PRIMARY KEY,
      type TEXT,
      title TEXT,
      authors TEXT,
      year INTEGER,
      venue TEXT,
      indexing TEXT,
      amount_inr NUMERIC,
      status TEXT DEFAULT 'Draft',
      note TEXT,
      evidence_url TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS programs (
      id SERIAL PRIMARY KEY,
      name TEXT,
      level TEXT,
      tier TEXT,
      intake INTEGER,
      co_count INTEGER,
      po_count INTEGER,
      attainment_pct NUMERIC,
      status TEXT DEFAULT 'Draft',
      note TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title TEXT,
      category TEXT,
      coordinator TEXT,
      start_date TEXT,
      end_date TEXT,
      participants_count INTEGER,
      venue TEXT,
      status TEXT DEFAULT 'Draft',
      evidence_url TEXT,
      created_at TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT,
      assigned_to_email TEXT,
      assigned_to_name TEXT,
      course_code TEXT,
      due_date TEXT,
      status TEXT DEFAULT 'Pending',
      submission_url TEXT,
      remarks TEXT,
      created_at TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY DEFAULT 1,
      academic_year TEXT,
      budget_allocated_inr NUMERIC,
      budget_utilized_inr NUMERIC,
      library_books_count INTEGER,
      wifi_ict_available BOOLEAN,
      updated_at TIMESTAMPTZ DEFAULT now(),
      CONSTRAINT single_row CHECK (id = 1)
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id SERIAL PRIMARY KEY,
      action TEXT,
      entity TEXT,
      entity_id TEXT,
      actor TEXT,
      role TEXT,
      details TEXT,
      timestamp TIMESTAMPTZ DEFAULT now()
    );
  `;
  await pool.query(schemaSql);
}

async function initDatabase() {
  if (process.env.DATABASE_URL) {
    try {
      const isRender = process.env.DATABASE_URL.includes('render.com') || process.env.DATABASE_URL.includes('sslmode=require');
      pgPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: isRender ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 4000
      });
      await pgPool.query('SELECT 1');
      usePostgres = true;
      console.log('Connected to PostgreSQL database.');
      await initPgSchema(pgPool);
      return;
    } catch (err) {
      console.warn('PostgreSQL connection fallback:', err.message);
      usePostgres = false;
    }
  }

  loadLocalStore();
}

const db = {
  isPostgres: () => usePostgres,

  async getInstitution() {
    if (usePostgres) {
      const { rows } = await pgPool.query('SELECT * FROM institution WHERE id=1');
      return rows[0] || DEFAULT_STORE.institution;
    }
    return localStore.institution || DEFAULT_STORE.institution;
  },

  async updateInstitution(fields) {
    if (usePostgres) {
      const cols = Object.keys(fields);
      const vals = Object.values(fields);
      const setClause = cols.map((c, i) => `${c}=$${i + 1}`).join(',');
      const insertCols = ['id', ...cols].join(',');
      const insertVals = ['1', ...vals.map((_, i) => `$${i + 1}`)].join(',');
      const q = `
        INSERT INTO institution (${insertCols}) VALUES (${insertVals})
        ON CONFLICT (id) DO UPDATE SET ${setClause}, updated_at=now()
        RETURNING *`;
      const { rows } = await pgPool.query(q, vals);
      return rows[0];
    }
    localStore.institution = { ...localStore.institution, ...fields, id: 1, updated_at: new Date().toISOString() };
    saveLocalStore();
    return localStore.institution;
  },

  // DYNAMICALLY POOLED DEPARTMENT PROFILE
  // Pools directly from faculty roster, student cohorts, research records, and infrastructure
  async getComputedProfile() {
    const rawProfile = usePostgres
      ? ((await pgPool.query('SELECT * FROM profile WHERE id=1')).rows[0] || {})
      : (localStore.profile || {});

    const faculty = await this.getCollection('faculty');
    const students = await this.getCollection('students');
    const research = await this.getCollection('research');
    const programs = await this.getCollection('programs');

    // Filter current serving faculty
    const currentFaculty = faculty.filter(f => (f.service_status || 'Current') === 'Current');
    const approvedFaculty = currentFaculty.filter(f => f.status === 'Approved by IQAC');

    // Aggregate Student Demographics directly from student roster
    const totalStudents = students.length || 480;
    const femaleStudents = students.filter(s => (s.gender || '').toLowerCase() === 'female').length;
    const womenStudentsPct = totalStudents > 0 ? ((femaleStudents / totalStudents) * 100).toFixed(1) : 32.5;

    const diverseStudents = students.filter(s => {
      const loc = (s.state_country || '').toLowerCase();
      return loc && loc !== 'karnataka';
    }).length;
    const regionDiversePct = totalStudents > 0 ? ((diverseStudents / totalStudents) * 100).toFixed(1) : 44.0;

    const escStudents = students.filter(s => {
      const cat = (s.category || '').toUpperCase();
      return cat === 'SC' || cat === 'ST' || cat === 'OBC' || cat === 'EWS';
    }).length;
    const escStudentsPct = totalStudents > 0 ? ((escStudents / totalStudents) * 100).toFixed(1) : 28.0;

    const pwdCount = students.filter(s => s.is_pwd).length;

    // Faculty aggregates
    const phdFaculty = approvedFaculty.filter(f => f.qualification === 'Ph.D.').length;
    const phdPct = approvedFaculty.length > 0 ? Math.round((phdFaculty / approvedFaculty.length) * 100) : 0;
    const sfr = approvedFaculty.length > 0 ? (totalStudents / approvedFaculty.length).toFixed(1) : 'N/A';

    return {
      academic_year: rawProfile.academic_year || '2026-27',
      total_students: totalStudents,
      women_students_pct: Number(womenStudentsPct),
      region_diverse_pct: Number(regionDiversePct),
      esc_students_pct: Number(escStudentsPct),
      pwd_facilities: rawProfile.wifi_ict_available !== false,
      pwd_students_count: pwdCount,
      placement_pct: 88.5,
      median_salary_lpa: 6.8,
      higher_studies_pct: 14.2,
      budget_allocated_inr: Number(rawProfile.budget_allocated_inr) || 8500000,
      budget_utilized_inr: Number(rawProfile.budget_utilized_inr) || 8120000,
      library_books_count: Number(rawProfile.library_books_count) || 5420,
      wifi_ict_available: rawProfile.wifi_ict_available !== false,
      // Dynamic pooled metrics
      serving_faculty_count: currentFaculty.length,
      approved_faculty_count: approvedFaculty.length,
      phd_faculty_percentage: phdPct,
      student_faculty_ratio: sfr,
      scopus_publication_count: research.filter(r => r.indexing === 'Scopus' && r.status === 'Approved by IQAC').length,
      total_grants_inr: research.filter(r => r.status === 'Approved by IQAC').reduce((sum, r) => sum + (Number(r.amount_inr) || 0), 0),
      programs_count: programs.length,
      updated_at: rawProfile.updated_at || new Date().toISOString()
    };
  },

  async updateProfile(fields) {
    if (usePostgres) {
      const cols = Object.keys(fields);
      const vals = Object.values(fields);
      const setClause = cols.map((c, i) => `${c}=$${i + 1}`).join(',');
      const insertCols = ['id', ...cols].join(',');
      const insertVals = ['1', ...vals.map((_, i) => `$${i + 1}`)].join(',');
      const q = `
        INSERT INTO profile (${insertCols}) VALUES (${insertVals})
        ON CONFLICT (id) DO UPDATE SET ${setClause}, updated_at=now()
        RETURNING *`;
      const { rows } = await pgPool.query(q, vals);
      return rows[0];
    }
    localStore.profile = { ...localStore.profile, ...fields, id: 1, updated_at: new Date().toISOString() };
    saveLocalStore();
    return localStore.profile;
  },

  async getCollection(table) {
    if (usePostgres) {
      const { rows } = await pgPool.query(`SELECT * FROM ${table} ORDER BY id DESC`);
      return rows;
    }
    const list = localStore[table] || [];
    return [...list].sort((a, b) => b.id - a.id);
  },

  async getRecord(table, id) {
    const numId = Number(id);
    if (usePostgres) {
      const { rows } = await pgPool.query(`SELECT * FROM ${table} WHERE id=$1`, [numId]);
      return rows[0] || null;
    }
    return (localStore[table] || []).find(r => Number(r.id) === numId) || null;
  },

  async insertRecord(table, data) {
    if (usePostgres) {
      const cols = Object.keys(data);
      const vals = Object.values(data);
      const placeholders = cols.map((_, i) => `$${i + 1}`).join(',');
      const q = `INSERT INTO ${table} (${cols.join(',')}) VALUES (${placeholders}) RETURNING *`;
      const { rows } = await pgPool.query(q, vals);
      return rows[0];
    }
    if (!localStore[table]) localStore[table] = [];
    const maxId = localStore[table].reduce((max, r) => Math.max(max, Number(r.id) || 0), 0);
    const newRecord = {
      ...data,
      id: maxId + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    localStore[table].push(newRecord);
    saveLocalStore();
    return newRecord;
  },

  async bulkInsert(table, records, mode = 'append') {
    if (mode === 'replace') {
      if (usePostgres) {
        await pgPool.query(`TRUNCATE TABLE ${table}`);
      } else {
        localStore[table] = [];
      }
    }

    const inserted = [];
    for (const record of records) {
      const item = await this.insertRecord(table, record);
      inserted.push(item);
    }
    return inserted;
  },

  async clearCollection(table) {
    if (usePostgres) {
      await pgPool.query(`TRUNCATE TABLE ${table}`);
    } else {
      localStore[table] = [];
      saveLocalStore();
    }
    return true;
  },

  async loadSampleDataset() {
    if (usePostgres) {
      await pgPool.query('TRUNCATE TABLE faculty, students, infrastructure, research, programs, events, tasks');
      for (const f of DEFAULT_STORE.faculty) await this.insertRecord('faculty', f);
      for (const s of DEFAULT_STORE.students) await this.insertRecord('students', s);
      for (const inf of DEFAULT_STORE.infrastructure) await this.insertRecord('infrastructure', inf);
      for (const r of DEFAULT_STORE.research) await this.insertRecord('research', r);
      for (const pr of DEFAULT_STORE.programs) await this.insertRecord('programs', pr);
      for (const ev of DEFAULT_STORE.events) await this.insertRecord('events', ev);
      for (const t of DEFAULT_STORE.tasks) await this.insertRecord('tasks', t);
    } else {
      localStore.faculty = JSON.parse(JSON.stringify(DEFAULT_STORE.faculty));
      localStore.students = JSON.parse(JSON.stringify(DEFAULT_STORE.students));
      localStore.infrastructure = JSON.parse(JSON.stringify(DEFAULT_STORE.infrastructure));
      localStore.research = JSON.parse(JSON.stringify(DEFAULT_STORE.research));
      localStore.programs = JSON.parse(JSON.stringify(DEFAULT_STORE.programs));
      localStore.events = JSON.parse(JSON.stringify(DEFAULT_STORE.events));
      localStore.tasks = JSON.parse(JSON.stringify(DEFAULT_STORE.tasks));
      saveLocalStore();
    }
    return true;
  },

  async updateRecord(table, id, data) {
    const numId = Number(id);
    if (usePostgres) {
      const cols = Object.keys(data);
      const vals = Object.values(data);
      const setClause = cols.map((c, i) => `${c}=$${i + 1}`).join(',');
      const q = `UPDATE ${table} SET ${setClause}, updated_at=now() WHERE id=$${cols.length + 1} RETURNING *`;
      const { rows } = await pgPool.query(q, [...vals, numId]);
      return rows[0] || null;
    }
    if (!localStore[table]) return null;
    const index = localStore[table].findIndex(r => Number(r.id) === numId);
    if (index === -1) return null;
    localStore[table][index] = {
      ...localStore[table][index],
      ...data,
      id: numId,
      updated_at: new Date().toISOString()
    };
    saveLocalStore();
    return localStore[table][index];
  },

  async deleteRecord(table, id) {
    const numId = Number(id);
    if (usePostgres) {
      await pgPool.query(`DELETE FROM ${table} WHERE id=$1`, [numId]);
      return true;
    }
    if (!localStore[table]) return false;
    localStore[table] = localStore[table].filter(r => Number(r.id) !== numId);
    saveLocalStore();
    return true;
  },

  async logAudit(action, entity, entityId, actor, role, details) {
    const logItem = {
      action,
      entity,
      entity_id: String(entityId || ''),
      actor: actor || 'User',
      role: role || 'staff',
      details: details || '',
      timestamp: new Date().toISOString()
    };
    if (usePostgres) {
      try {
        await pgPool.query(
          `INSERT INTO audit_logs (action, entity, entity_id, actor, role, details) VALUES ($1,$2,$3,$4,$5,$6)`,
          [logItem.action, logItem.entity, logItem.entity_id, logItem.actor, logItem.role, logItem.details]
        );
      } catch (e) {
        console.warn('Audit logging failed:', e.message);
      }
    } else {
      if (!localStore.audit_logs) localStore.audit_logs = [];
      const maxId = localStore.audit_logs.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0);
      localStore.audit_logs.unshift({ ...logItem, id: maxId + 1 });
      if (localStore.audit_logs.length > 250) localStore.audit_logs.pop();
      saveLocalStore();
    }
  },

  async getAuditLogs(limit = 60) {
    if (usePostgres) {
      try {
        const { rows } = await pgPool.query(`SELECT * FROM audit_logs ORDER BY id DESC LIMIT $1`, [limit]);
        return rows;
      } catch (e) {
        return [];
      }
    }
    return (localStore.audit_logs || []).slice(0, limit);
  },

  async getAllData() {
    return {
      institution: await this.getInstitution(),
      hierarchy: await this.getHierarchy(),
      profile: await this.getComputedProfile(),
      faculty: await this.getCollection('faculty'),
      students: await this.getCollection('students'),
      infrastructure: await this.getCollection('infrastructure'),
      research: await this.getCollection('research'),
      programs: await this.getCollection('programs'),
      events: await this.getCollection('events'),
      tasks: await this.getCollection('tasks'),
      audit_logs: await this.getAuditLogs(100),
      engine: usePostgres ? 'PostgreSQL' : 'Embedded Zero-Config JSON'
    };
  },

  async getHierarchy() {
    if (!localStore.hierarchy) {
      localStore.hierarchy = JSON.parse(JSON.stringify(DEFAULT_STORE.hierarchy));
      saveLocalStore();
    }
    return localStore.hierarchy;
  },

  async updateHierarchy(newHierarchy) {
    if (newHierarchy && typeof newHierarchy === 'object') {
      localStore.hierarchy = newHierarchy;
      saveLocalStore();
    }
    return localStore.hierarchy;
  },

  async addSchool(schoolData) {
    if (!localStore.hierarchy) localStore.hierarchy = JSON.parse(JSON.stringify(DEFAULT_STORE.hierarchy));
    const cleanSlug = (schoolData.name || 'school').toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20);
    const schoolId = 'school-' + cleanSlug + '-' + Math.floor(100 + Math.random() * 900);
    const newSchool = {
      id: schoolId,
      name: schoolData.name || 'New School of Studies',
      dean_name: schoolData.dean_name || 'Dean / Director',
      dean_email: schoolData.dean_email || '',
      drive_folder_id: `1_DRIVE_${schoolId.toUpperCase()}`,
      drive_folder_url: `https://drive.google.com/drive/folders/CHRIST_${schoolId.toUpperCase()}`,
      departments: []
    };
    localStore.hierarchy.schools.push(newSchool);
    saveLocalStore();
    return newSchool;
  },

  async addDepartment(schoolId, deptData) {
    if (!localStore.hierarchy) localStore.hierarchy = JSON.parse(JSON.stringify(DEFAULT_STORE.hierarchy));
    const school = (localStore.hierarchy.schools || []).find(s => s.id === schoolId);
    if (!school) throw new Error('School not found: ' + schoolId);
    if (!school.departments) school.departments = [];

    const cleanSlug = (deptData.name || 'dept').toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20);
    const deptId = 'dept-' + cleanSlug + '-' + Math.floor(100 + Math.random() * 900);
    const newDept = {
      id: deptId,
      name: deptData.name || 'New Department',
      hod_name: deptData.hod_name || '',
      hod_email: deptData.hod_email || '',
      iqac_coordinator: deptData.iqac_coordinator || '',
      iqac_email: deptData.iqac_email || '',
      drive_folder_id: `1_DRIVE_${deptId.toUpperCase()}`,
      drive_folder_url: `https://drive.google.com/drive/folders/CHRIST_${deptId.toUpperCase()}`,
      sheets: {
        faculty: {
          title: `${deptData.name}_Faculty_Roster`,
          sheet_id: `SHEET_${deptId}_FACULTY`,
          sheet_url: `https://docs.google.com/spreadsheets/d/CHRIST_${deptId}_FACULTY/edit`,
          status: 'Connected',
          last_synced: new Date().toISOString()
        },
        students: {
          title: `${deptData.name}_Students_Cohort`,
          sheet_id: `SHEET_${deptId}_STUDENTS`,
          sheet_url: `https://docs.google.com/spreadsheets/d/CHRIST_${deptId}_STUDENTS/edit`,
          status: 'Connected',
          last_synced: new Date().toISOString()
        },
        infrastructure: {
          title: `${deptData.name}_Infrastructure_Labs`,
          sheet_id: `SHEET_${deptId}_INFRA`,
          sheet_url: `https://docs.google.com/spreadsheets/d/CHRIST_${deptId}_INFRA/edit`,
          status: 'Connected',
          last_synced: new Date().toISOString()
        },
        research: {
          title: `${deptData.name}_Research_Grants`,
          sheet_id: `SHEET_${deptId}_RESEARCH`,
          sheet_url: `https://docs.google.com/spreadsheets/d/CHRIST_${deptId}_RESEARCH/edit`,
          status: 'Connected',
          last_synced: new Date().toISOString()
        },
        events: {
          title: `${deptData.name}_Events_FDPs`,
          sheet_id: `SHEET_${deptId}_EVENTS`,
          sheet_url: `https://docs.google.com/spreadsheets/d/CHRIST_${deptId}_EVENTS/edit`,
          status: 'Connected',
          last_synced: new Date().toISOString()
        }
      }
    };
    school.departments.push(newDept);
    saveLocalStore();
    return newDept;
  },

  async updateDepartmentSheets(deptId, sheets) {
    if (!localStore.hierarchy) localStore.hierarchy = JSON.parse(JSON.stringify(DEFAULT_STORE.hierarchy));
    for (const school of localStore.hierarchy.schools || []) {
      const dept = (school.departments || []).find(d => d.id === deptId);
      if (dept) {
        dept.sheets = { ...(dept.sheets || {}), ...sheets };
        saveLocalStore();
        return dept.sheets;
      }
    }
    return null;
  },

  async syncAllState(fullState) {
    if (!fullState || typeof fullState !== 'object') throw new Error('Invalid state payload');
    if (fullState.institution) localStore.institution = fullState.institution;
    if (fullState.hierarchy) localStore.hierarchy = fullState.hierarchy;
    if (fullState.profile) localStore.profile = fullState.profile;
    if (Array.isArray(fullState.faculty)) localStore.faculty = fullState.faculty;
    if (Array.isArray(fullState.students)) localStore.students = fullState.students;
    if (Array.isArray(fullState.infrastructure)) localStore.infrastructure = fullState.infrastructure;
    if (Array.isArray(fullState.research)) localStore.research = fullState.research;
    if (Array.isArray(fullState.events)) localStore.events = fullState.events;
    if (Array.isArray(fullState.programs)) localStore.programs = fullState.programs;
    if (Array.isArray(fullState.tasks)) localStore.tasks = fullState.tasks;
    saveLocalStore();
    return true;
  }
};

module.exports = { initDatabase, db, DEFAULT_STORE };
