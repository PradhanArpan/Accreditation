const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const DATA_FILE = path.join(__dirname, 'local_data.json');

// Default initial dataset for Christ (Deemed to be University) - Dept. of Civil Engineering
const SEED_DATA = {
  profile: {
    id: 1,
    academic_year: '2026-27',
    total_students: 480,
    women_students_pct: 32.5,
    region_diverse_pct: 44.0,
    esc_students_pct: 28.0,
    pwd_facilities: true,
    placement_pct: 88.5,
    median_salary_lpa: 6.8,
    higher_studies_pct: 14.2,
    budget_allocated_inr: 8500000,
    budget_utilized_inr: 8120000,
    library_books_count: 5420,
    wifi_ict_available: true,
    updated_at: new Date().toISOString()
  },
  faculty: [
    {
      id: 1,
      name: 'Dr. Ramesh Chandra',
      designation: 'Professor',
      qualification: 'Ph.D.',
      specialization: 'Structural Engineering & Earthquake Resilient Design',
      experience_years: 22,
      employment_type: 'Regular',
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
      designation: 'Associate Professor',
      qualification: 'Ph.D.',
      specialization: 'Geotechnical & Geo-environmental Engineering',
      experience_years: 15,
      employment_type: 'Regular',
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
      designation: 'Assistant Professor',
      qualification: 'Ph.D.',
      specialization: 'Water Resources & Climate Change Modeling',
      experience_years: 8,
      employment_type: 'Regular',
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
      designation: 'Assistant Professor',
      qualification: 'M.Tech / M.E.',
      specialization: 'Transportation Systems & Smart Urban Mobility',
      experience_years: 6,
      employment_type: 'Regular',
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
      designation: 'Professor',
      qualification: 'Ph.D.',
      specialization: 'Environmental Engineering & Sustainable Concrete',
      experience_years: 25,
      employment_type: 'Regular',
      publications_3yr: 15,
      patents: 3,
      status: 'Approved by IQAC',
      note: 'Head of Department; verified.',
      evidence_url: 'https://orcid.org/0000-0002-7719-3321',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  infrastructure: [
    {
      id: 1,
      category: 'Laboratory',
      name: 'Advanced Structural Dynamics & Heavy Testing Lab',
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
      name: 'Geotechnical & Soil Mechanics Testing Lab',
      capacity: '40 students / 1800 sq.ft',
      equipment_count: 18,
      year_established: 2017,
      evidence_note: 'Triaxial testing setup, direct shear apparatus verified',
      status: 'Approved by IQAC',
      note: 'Maintained with annual AMC logbooks.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      category: 'ICT Infrastructure',
      name: 'BIM, GIS & Civil CAD Center (60 Workstations)',
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
      name: 'Environmental Engineering & Water Quality Lab',
      capacity: '40 students / 1500 sq.ft',
      equipment_count: 12,
      year_established: 2019,
      evidence_note: 'Spectrophotometer, BOD Incubators, Turbidity meters',
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
      type: 'Sponsored Project',
      title: 'Development of low-carbon alkali-activated geopolymer concrete utilizing industrial slag',
      authors: 'Dr. Joseph Kurian (PI), Dr. Priya V. Nair (Co-PI)',
      year: 2024,
      venue: 'Department of Science and Technology (DST-SERB)',
      indexing: 'Other / None',
      amount_inr: 3450000,
      status: 'Approved by IQAC',
      note: 'Sanction order copy verified: DST/SERB/CRG/2024/004128',
      evidence_url: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      type: 'Patent',
      title: 'Smart sensor-embedded permeable pavement block for stormwater filtration and real-time runoff monitoring',
      authors: 'Dr. Anand K. Murthy, Dr. Ramesh Chandra',
      year: 2025,
      venue: 'Indian Patent Office (Application No. 202541019283)',
      indexing: 'Other / None',
      amount_inr: null,
      status: 'Approved by IQAC',
      note: 'Published in Indian Patent Journal.',
      evidence_url: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      type: 'Consultancy',
      title: 'Structural health monitoring and retrofitting design for multi-story residential towers in Bangalore',
      authors: 'Dr. Ramesh Chandra, Dr. Priya V. Nair',
      year: 2025,
      venue: 'Shobha Developers Ltd.',
      indexing: 'Other / None',
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
      tier: 'Tier-I',
      intake: 120,
      co_count: 360,
      po_count: 12,
      attainment_pct: 84.2,
      status: 'Approved by IQAC',
      note: 'NBA Tier-I accredited for 3 years; SAR updated for current cycle.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'M.Tech in Structural Engineering',
      level: 'PG',
      tier: 'Tier-I',
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
  audit_logs: [
    {
      id: 1,
      action: 'INIT',
      entity: 'system',
      entity_id: '1',
      actor: 'System Administrator',
      role: 'admin',
      details: 'Department portal initialized with CHRIST Civil Eng dataset.',
      timestamp: new Date().toISOString()
    }
  ]
};

// Database state
let usePostgres = false;
let pgPool = null;
let localStore = null;

function loadLocalStore() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf8');
      localStore = JSON.parse(content);
    } catch (err) {
      console.warn('Could not parse existing local_data.json, re-initializing with seed data.', err.message);
      localStore = JSON.parse(JSON.stringify(SEED_DATA));
      saveLocalStore();
    }
  } else {
    localStore = JSON.parse(JSON.stringify(SEED_DATA));
    saveLocalStore();
  }
}

function saveLocalStore() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(localStore, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving local_data.json:', err.message);
  }
}

// Initialize Postgres schema if connected
async function initPgSchema(pool) {
  const schemaSql = `
    CREATE TABLE IF NOT EXISTS faculty (
      id SERIAL PRIMARY KEY,
      name TEXT,
      designation TEXT,
      qualification TEXT,
      specialization TEXT,
      experience_years INTEGER,
      employment_type TEXT,
      publications_3yr INTEGER,
      patents INTEGER,
      status TEXT DEFAULT 'Draft',
      note TEXT,
      evidence_url TEXT,
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

    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY DEFAULT 1,
      academic_year TEXT,
      total_students INTEGER,
      women_students_pct NUMERIC,
      region_diverse_pct NUMERIC,
      esc_students_pct NUMERIC,
      pwd_facilities BOOLEAN,
      placement_pct NUMERIC,
      median_salary_lpa NUMERIC,
      higher_studies_pct NUMERIC,
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

  // Check if profile is seeded
  const { rows } = await pool.query('SELECT COUNT(*) FROM profile');
  if (parseInt(rows[0].count, 10) === 0) {
    console.log('Seeding initial Postgres database with Christ Civil Engineering records...');
    const p = SEED_DATA.profile;
    await pool.query(`
      INSERT INTO profile (id, academic_year, total_students, women_students_pct, region_diverse_pct, esc_students_pct, pwd_facilities, placement_pct, median_salary_lpa, higher_studies_pct, budget_allocated_inr, budget_utilized_inr, library_books_count, wifi_ict_available)
      VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (id) DO NOTHING
    `, [p.academic_year, p.total_students, p.women_students_pct, p.region_diverse_pct, p.esc_students_pct, p.pwd_facilities, p.placement_pct, p.median_salary_lpa, p.higher_studies_pct, p.budget_allocated_inr, p.budget_utilized_inr, p.library_books_count, p.wifi_ict_available]);

    for (const f of SEED_DATA.faculty) {
      await pool.query(`INSERT INTO faculty (name, designation, qualification, specialization, experience_years, employment_type, publications_3yr, patents, status, note, evidence_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [f.name, f.designation, f.qualification, f.specialization, f.experience_years, f.employment_type, f.publications_3yr, f.patents, f.status, f.note, f.evidence_url]);
    }
    for (const inf of SEED_DATA.infrastructure) {
      await pool.query(`INSERT INTO infrastructure (category, name, capacity, equipment_count, year_established, evidence_note, status, note) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [inf.category, inf.name, inf.capacity, inf.equipment_count, inf.year_established, inf.evidence_note, inf.status, inf.note]);
    }
    for (const r of SEED_DATA.research) {
      await pool.query(`INSERT INTO research (type, title, authors, year, venue, indexing, amount_inr, status, note, evidence_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [r.type, r.title, r.authors, r.year, r.venue, r.indexing, r.amount_inr, r.status, r.note, r.evidence_url]);
    }
    for (const pr of SEED_DATA.programs) {
      await pool.query(`INSERT INTO programs (name, level, tier, intake, co_count, po_count, attainment_pct, status, note) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [pr.name, pr.level, pr.tier, pr.intake, pr.co_count, pr.po_count, pr.attainment_pct, pr.status, pr.note]);
    }
  }
}

// Initialize connection
async function initDatabase() {
  if (process.env.DATABASE_URL) {
    try {
      const isRender = process.env.DATABASE_URL.includes('render.com') || process.env.DATABASE_URL.includes('sslmode=require');
      pgPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: isRender ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 4000
      });
      // Test connection
      await pgPool.query('SELECT 1');
      usePostgres = true;
      console.log('Connected successfully to PostgreSQL database.');
      await initPgSchema(pgPool);
      return;
    } catch (err) {
      console.warn('PostgreSQL connection attempt failed (' + err.message + '). Falling back to zero-config local storage.');
      usePostgres = false;
    }
  } else {
    console.log('No DATABASE_URL configured. Running with embedded persistent storage in db/local_data.json.');
  }

  loadLocalStore();
}

// Universal Query Interface
const db = {
  isPostgres: () => usePostgres,
  
  async getProfile() {
    if (usePostgres) {
      const { rows } = await pgPool.query('SELECT * FROM profile WHERE id=1');
      return rows[0] || {};
    }
    return localStore.profile || {};
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
        console.warn('Audit logging to Postgres failed:', e.message);
      }
    } else {
      if (!localStore.audit_logs) localStore.audit_logs = [];
      const maxId = localStore.audit_logs.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0);
      localStore.audit_logs.unshift({ ...logItem, id: maxId + 1 });
      if (localStore.audit_logs.length > 200) localStore.audit_logs.pop();
      saveLocalStore();
    }
  },

  async getAuditLogs(limit = 50) {
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
      profile: await this.getProfile(),
      faculty: await this.getCollection('faculty'),
      infrastructure: await this.getCollection('infrastructure'),
      research: await this.getCollection('research'),
      programs: await this.getCollection('programs'),
      audit_logs: await this.getAuditLogs(100),
      engine: usePostgres ? 'PostgreSQL' : 'Embedded Zero-Config JSON'
    };
  }
};

module.exports = { initDatabase, db };
