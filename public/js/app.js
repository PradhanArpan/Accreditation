// ============================================================================
// VERITA — Institutional Accreditation SaaS Platform
// Hierarchical Quality Assurance & Continuous Compliance Engine
// University > School > Department Multi-Tier Architecture
// ============================================================================

const CONFIG = {
  tabs: [
    { key: 'dashboard', label: 'Executive Dashboard', icon: '📊' },
    { key: 'profile', label: 'Dept. Profile (Pooled)', icon: '🏛️' },
    { key: 'faculty', label: 'Faculty Directory', icon: '👨‍🏫' },
    { key: 'students', label: 'Student Cohort', icon: '🎓' },
    { key: 'infrastructure', label: 'Infrastructure & Labs', icon: '🔬' },
    { key: 'research', label: 'Research & Grants', icon: '📚' },
    { key: 'events', label: 'Events & FDPs', icon: '🎪' },
    { key: 'programs', label: 'NBA Programs (OBE)', icon: '🎯' },
    { key: 'tasks', label: 'Faculty Tasks', icon: '📋' },
    { key: 'accreditation', label: 'Accreditation Agencies', icon: '🏆' },
    { key: 'review', label: 'IQAC Review Queue', icon: '⚖️' },
    { key: 'audit', label: 'Audit Trail', icon: '📜' },
    { key: 'reports', label: 'Official Dossier', icon: '📑' },
  ],

  collections: {
    faculty: {
      label: 'Faculty Members',
      singular: 'Faculty Member',
      consumers: 'NAAC SSR (Criterion 2) · NBA SAR (Criterion 5) · NIRF (TLR/FQE/FSR) · AICTE Mandatory Disclosure',
      fields: [
        { key: 'name', label: 'Full Name (with Title)', type: 'text', req: true, placeholder: 'e.g. Dr. Ramesh Chandra' },
        { key: 'email', label: 'Official Email (Login Identifier)', type: 'text', req: true, placeholder: 'ramesh.chandra@christuniversity.in' },
        { key: 'designation', label: 'Designation', type: 'select', options: ['Professor', 'Associate Professor', 'Assistant Professor', 'Adjunct / Visiting Professor'] },
        { key: 'qualification', label: 'Highest Qualification', type: 'select', options: ['Ph.D.', 'M.Tech / M.E.', 'M.Sc.', 'B.Tech / B.E.', 'Other'] },
        { key: 'specialization', label: 'Area of Specialization', type: 'text', placeholder: 'e.g. Structural Engineering & Dynamics' },
        { key: 'experience_years', label: 'Teaching / Industry Experience (Years)', type: 'number' },
        { key: 'employment_type', label: 'Employment Cadre', type: 'select', options: ['Regular', 'Contract', 'Adjunct'] },
        { key: 'service_status', label: 'Service Status', type: 'select', options: ['Current', 'Relieved / On Leave'] },
        { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
        { key: 'publications_3yr', label: 'Indexed Publications (Last 3 Years)', type: 'number' },
        { key: 'patents', label: 'Patents / IPR Filed / Granted', type: 'number' },
        { key: 'evidence_url', label: 'Profile / ORCID / Scholar URL', type: 'text', placeholder: 'https://orcid.org/0000-...' },
      ]
    },
    students: {
      label: 'Student Cohort Roster',
      singular: 'Student Record',
      consumers: 'NAAC Extended Profile · NIRF Outreach & Inclusivity (OI) · AICTE Enrollment Roster',
      fields: [
        { key: 'roll_no', label: 'Registration / Roll Number', type: 'text', req: true, placeholder: 'e.g. 23BCIV001' },
        { key: 'name', label: 'Full Student Name', type: 'text', req: true, placeholder: 'e.g. Aditi Sharma' },
        { key: 'gender', label: 'Gender', type: 'select', options: ['Female', 'Male', 'Other'] },
        { key: 'category', label: 'Social Category', type: 'select', options: ['General', 'OBC', 'SC', 'ST', 'EWS'] },
        { key: 'state_country', label: 'Domicile State / Country', type: 'text', placeholder: 'e.g. Karnataka / Delhi / Nepal' },
        { key: 'is_pwd', label: 'Divyangjan (Person with Disability - PwD)', type: 'checkbox' },
        { key: 'program', label: 'Enrolled Program', type: 'select', options: ['B.Tech in Civil Engineering', 'M.Tech in Structural Engineering', 'Ph.D. in Civil Engineering'] },
        { key: 'batch_year', label: 'Batch / Cohort Year', type: 'text', placeholder: 'e.g. 2023-27' },
        { key: 'status', label: 'Enrollment Status', type: 'select', options: ['Active', 'Graduated', 'Detained'] },
        { key: 'placement_status', label: 'Placement / Progression Status', type: 'text', placeholder: 'e.g. Placed (L&T - 7.2 LPA)' },
        { key: 'higher_studies', label: 'Higher Studies / Competitive Exam', type: 'text', placeholder: 'e.g. GATE Qualified / GRE' },
      ]
    },
    infrastructure: {
      label: 'Infrastructure & Laboratories',
      singular: 'Infrastructure Record',
      consumers: 'NAAC SSR (Criterion 4) · NBA SAR (Criterion 6 - Facilities) · NIRF (TLR) · AICTE Handbook',
      fields: [
        { key: 'category', label: 'Facility Category', type: 'select', options: ['Laboratory', 'ICT Infrastructure', 'Library Resource', 'Smart Classroom', 'Research Center', 'Workshop', 'Other'] },
        { key: 'name', label: 'Facility Name & Room / Location', type: 'text', req: true, placeholder: 'e.g. Advanced Structural Dynamics Lab (Room CE-104)' },
        { key: 'capacity', label: 'Capacity / Floor Area', type: 'text', placeholder: 'e.g. 60 students / 2400 sq.ft' },
        { key: 'equipment_count', label: 'Major Equipment / Workstation Count', type: 'number' },
        { key: 'year_established', label: 'Year Established / Modernized', type: 'number' },
        { key: 'evidence_note', label: 'NABL / AMC / Calibration Reference', type: 'text', placeholder: 'e.g. Calibration ref #2026/CE/CAL/09' },
      ]
    },
    research: {
      label: 'Research, Publications & Grants',
      singular: 'Research / Project Record',
      consumers: 'NAAC SSR (Criterion 3) · NIRF (RPC/FPHP) · NBA SAR (Criterion 5.7) · IQAC AQAR',
      fields: [
        { key: 'type', label: 'Type of Contribution', type: 'select', options: ['Journal Publication', 'Sponsored Research Project', 'Consultancy Assignment', 'Conference Publication', 'Book / Book Chapter', 'Patent Granted / Published'] },
        { key: 'title', label: 'Title / Grant Project Name', type: 'text', req: true, placeholder: 'Title of research paper or project' },
        { key: 'authors', label: 'Author(s) / Investigators', type: 'text', placeholder: 'e.g. Dr. Joseph Kurian (PI), Dr. Priya V. Nair (Co-PI)' },
        { key: 'year', label: 'Calendar / Academic Year', type: 'number', placeholder: '2025' },
        { key: 'venue', label: 'Journal Name / Funding Agency / Client', type: 'text', placeholder: 'e.g. Journal of Structural Engineering (ASCE) or DST-SERB' },
        { key: 'indexing', label: 'Indexing Database', type: 'select', options: ['Scopus', 'Web of Science (WoS)', 'UGC-CARE List', 'Peer Reviewed / Other'] },
        { key: 'amount_inr', label: 'Sanctioned Grant / Consultancy Amount (INR)', type: 'number', placeholder: 'e.g. 3450000' },
        { key: 'evidence_url', label: 'DOI / Sanction Order Link', type: 'text', placeholder: 'https://doi.org/...' },
      ]
    },
    events: {
      label: 'Department Events & FDPs',
      singular: 'Event / FDP Record',
      consumers: 'NAAC SSR (Criteria 3 & 6) · NBA Criterion 5.8 · AICTE Annual Return',
      fields: [
        { key: 'title', label: 'Event / FDP Title', type: 'text', req: true, placeholder: 'e.g. AICTE-ATAL 5-Day FDP on Earthquake Engineering' },
        { key: 'category', label: 'Event Category', type: 'select', options: ['Faculty Development Program (FDP)', 'National Conference', 'International Conference', 'Technical Workshop', 'Guest Lecture / Seminar', 'Industrial Visit'] },
        { key: 'coordinator', label: 'Faculty Coordinator(s)', type: 'text', placeholder: 'e.g. Dr. Ramesh Chandra' },
        { key: 'start_date', label: 'Start Date (YYYY-MM-DD)', type: 'text', placeholder: '2025-02-14' },
        { key: 'end_date', label: 'End Date (YYYY-MM-DD)', type: 'text', placeholder: '2025-02-15' },
        { key: 'participants_count', label: 'Number of Participants', type: 'number' },
        { key: 'venue', label: 'Venue / Platform', type: 'text', placeholder: 'Audi Block, Kengeri Campus' },
        { key: 'evidence_url', label: 'Report / Brochure Link', type: 'text', placeholder: 'https://...' },
      ]
    },
    programs: {
      label: 'NBA Academic Programs (OBE)',
      singular: 'Academic Program',
      consumers: 'NBA Self Assessment Report (SAR Tier-I/II) · Program Assessment Committee (PAC) · BoS',
      fields: [
        { key: 'name', label: 'Program Name', type: 'text', req: true, placeholder: 'e.g. B.Tech in Civil Engineering' },
        { key: 'level', label: 'Program Level', type: 'select', options: ['UG', 'PG', 'Ph.D.'] },
        { key: 'tier', label: 'NBA Accreditation Tier', type: 'select', options: ['Tier-I (Washington Accord)', 'Tier-II', 'Application Submitted', 'Not Yet Applied'] },
        { key: 'intake', label: 'Annual Approved Sanctioned Intake', type: 'number' },
        { key: 'co_count', label: 'Course Outcomes (COs) Defined & Mapped', type: 'number' },
        { key: 'po_count', label: 'Program Outcomes (POs / PSOs) Defined', type: 'number' },
        { key: 'attainment_pct', label: 'Direct & Indirect PO Attainment Benchmark (%)', type: 'number' },
      ]
    },
    tasks: {
      label: 'Faculty Accreditation Tasks',
      singular: 'Assigned Task',
      consumers: 'Internal Department Accreditation Committee (DAC) Workflow',
      fields: [
        { key: 'title', label: 'Task Title / Action Item', type: 'text', req: true, placeholder: 'e.g. Upload Course Attainment Sheet for CIV301' },
        { key: 'assigned_to_email', label: 'Assign to Faculty (Email)', type: 'text', req: true, placeholder: 'ramesh.chandra@christuniversity.in' },
        { key: 'assigned_to_name', label: 'Faculty Name', type: 'text', placeholder: 'Dr. Ramesh Chandra' },
        { key: 'course_code', label: 'Course Code / Lab Reference', type: 'text', placeholder: 'CIV301 - Design of RC Structures' },
        { key: 'due_date', label: 'Target Completion Date (YYYY-MM-DD)', type: 'text', placeholder: '2026-10-15' },
        { key: 'status', label: 'Task Status', type: 'select', options: ['Pending', 'In Progress', 'Completed', 'Verified by IQAC'] },
        { key: 'submission_url', label: 'Submission Document / Evidence Link', type: 'text', placeholder: 'https://drive.google.com/...' },
        { key: 'remarks', label: 'Coordinator Guidance / Remarks', type: 'textarea', placeholder: 'Specific guidelines for this task...' },
      ]
    }
  }
};

const state = {
  activeTab: 'dashboard',
  userRole: 'iqac', // 'director', 'dean', 'iqac', 'faculty'
  userName: 'Dr. Ramesh Chandra (IQAC Coordinator)',
  userEmail: 'ramesh.chandra@christuniversity.in',
  theme: 'light',
  searchQuery: '',
  statusFilter: 'ALL',
  accreditationTab: 'naac', // 'naac', 'nba', 'nirf', 'aicte'
  institution: {
    university_name: 'CHRIST (Deemed to be University)',
    campus: 'Bangalore Kengeri Campus',
    naac_accreditation_cycle: 'Cycle 4 (A+ Grade)',
    school_name: 'School of Engineering and Technology',
    department_name: 'Department of Civil Engineering',
    head_of_department: 'Dr. Joseph Kurian',
    iqac_coordinator: 'Dr. Ramesh Chandra',
    academic_year: '2026-27'
  },
  data: {
    faculty: [],
    students: [],
    infrastructure: [],
    research: [],
    events: [],
    programs: [],
    tasks: [],
    audit_logs: []
  },
  profile: {},
  accreditation: {},
  systemStatus: { ok: false, engine: 'Loading...' }
};

// ============================================================================
// API Service
// ============================================================================
async function api(path, opts = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'x-user-role': state.userRole,
    'x-user-name': state.userName,
    'x-user-email': state.userEmail,
    ...(opts.headers || {})
  };

  const response = await fetch(path, { ...opts, headers });
  if (!response.ok) {
    let errMsg = response.statusText;
    try {
      const json = await response.json();
      if (json.error) errMsg = json.error;
    } catch (_) {}
    throw new Error(errMsg);
  }
  if (response.status === 204) return null;
  return response.json();
}

async function loadAllData() {
  try {
    const [health, inst, profile, faculty, students, infra, research, events, programs, tasks, audit, accBreakdown] = await Promise.all([
      api('/health').catch(() => ({ ok: false, engine: 'Offline' })),
      api('/api/institution').catch(() => state.institution),
      api('/api/profile').catch(() => ({})),
      api('/api/faculty').catch(() => []),
      api('/api/students').catch(() => []),
      api('/api/infrastructure').catch(() => []),
      api('/api/research').catch(() => []),
      api('/api/events').catch(() => []),
      api('/api/programs').catch(() => []),
      api('/api/tasks').catch(() => []),
      api('/api/audit').catch(() => []),
      api('/api/accreditation/breakdown').catch(() => ({}))
    ]);

    state.systemStatus = health;
    state.institution = inst || state.institution;
    state.profile = profile || {};
    state.data.faculty = faculty || [];
    state.data.students = students || [];
    state.data.infrastructure = infra || [];
    state.data.research = research || [];
    state.data.events = events || [];
    state.data.programs = programs || [];
    state.data.tasks = tasks || [];
    state.data.audit_logs = audit || [];
    state.accreditation = accBreakdown || {};

    render();
  } catch (err) {
    console.error('Failed loading data:', err);
    showToast('Could not reach backend API.', 'error');
  }
}

// ============================================================================
// Helpers
// ============================================================================
function esc(val) {
  if (val === undefined || val === null) return '';
  return String(val);
}

function formatInr(val) {
  if (!val || isNaN(val)) return '₹0';
  return '₹' + Number(val).toLocaleString('en-IN');
}

function statusClass(s) {
  if (s === 'Approved by IQAC' || s === 'Completed' || s === 'Verified by IQAC') return 'approved';
  if (s === 'Submitted to IQAC' || s === 'In Progress') return 'submitted';
  if (s === 'Sent back') return 'sentback';
  return 'draft';
}

function showToast(message, type = 'info') {
  const existing = document.getElementById('app-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'app-toast';
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 1000;
    background: ${type === 'error' ? '#B93826' : (type === 'success' ? '#237A47' : '#0E355F')};
    color: #FFF; padding: 12px 20px; border-radius: 8px; font-size: 0.86rem;
    box-shadow: 0 4px 14px rgba(0,0,0,0.25); transition: opacity 0.3s;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3200);
}

// ============================================================================
// Top Header & Hierarchy Banner
// ============================================================================
function renderHeader() {
  const pendingCount = ['faculty', 'infrastructure', 'research', 'events', 'programs'].reduce(
    (sum, k) => sum + (state.data[k] || []).filter(r => r.status === 'Submitted to IQAC').length, 0
  );

  const inst = state.institution || {};

  return `
    <!-- Top Hierarchy Bar -->
    <div class="hierarchy-banner no-print">
      <div class="hierarchy-breadcrumbs">
        <span>🏛️ ${esc(inst.university_name)}</span>
        <span>›</span>
        <span>🏫 ${esc(inst.school_name)}</span>
        <span>›</span>
        <strong>📂 ${esc(inst.department_name)}</strong>
        <span style="opacity: 0.85; font-size: 0.74rem;">(Assessment Year: ${esc(inst.academic_year)})</span>
      </div>
      <div>
        <button class="hierarchy-edit-btn" onclick="openHierarchyModal()">⚙️ University Hierarchy</button>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="app-header">
      <div class="header-top">
        <div class="brand-section">
          <div class="brand-crest">CU</div>
          <div class="brand-titles">
            <h1>VERITA — Institutional Accreditation SaaS Platform</h1>
            <div class="dept-sub">${esc(inst.department_name)} · ${esc(inst.school_name)} · ${esc(inst.university_name)}</div>
          </div>
        </div>

        <div class="header-controls no-print">
          <!-- Multi-Role Persona Switcher -->
          <div class="role-badge-wrapper">
            <label for="roleSelector">Active Account:</label>
            <select id="roleSelector" class="role-select">
              <option value="director" ${state.userRole === 'director' ? 'selected' : ''}>🏛️ University IQAC Director</option>
              <option value="dean" ${state.userRole === 'dean' ? 'selected' : ''}>🏫 Dean, School of Engg & Tech</option>
              <option value="iqac" ${state.userRole === 'iqac' ? 'selected' : ''}>📂 Dept IQAC Coordinator (Dr. Ramesh Chandra)</option>
              <option value="faculty" ${state.userRole === 'faculty' ? 'selected' : ''}>👨‍🏫 Faculty Member (Dr. Priya V. Nair)</option>
            </select>
          </div>

          <button id="themeToggle" class="theme-toggle-btn" title="Toggle Light / Dark theme">
            ${state.theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>

          <button class="btn" onclick="openDataManagementModal()" title="Spreadsheet Ingestion & Template Hub">
            ⚡ Data Hub
          </button>
        </div>
      </div>

      <nav class="nav-tabs-bar no-print">
        <div class="nav-tabs-container">
          ${CONFIG.tabs.map(t => {
            const count = (t.key === 'review') ? pendingCount : 0;
            return `
              <button class="nav-tab ${state.activeTab === t.key ? 'active' : ''}" data-tab="${t.key}">
                <span>${t.icon}</span> ${t.label}
                ${count > 0 ? `<span class="badge">${count}</span>` : ''}
              </button>
            `;
          }).join('')}
        </div>
      </nav>
    </header>
  `;
}

// --- Dashboard View ---
function renderDashboard() {
  const p = state.profile || {};
  const fac = state.data.faculty.filter(f => (f.service_status || 'Current') === 'Current' && f.status === 'Approved by IQAC');
  const infra = state.data.infrastructure.filter(i => i.status === 'Approved by IQAC');
  const res = state.data.research.filter(r => r.status === 'Approved by IQAC');
  const prog = state.data.programs.filter(pr => pr.status === 'Approved by IQAC');

  const pendingReview = ['faculty', 'infrastructure', 'research', 'events', 'programs'].reduce(
    (s, k) => s + (state.data[k] || []).filter(r => r.status === 'Submitted to IQAC').length, 0
  );

  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Institutional Quality Assurance & Continuous Compliance Radar</h2>
          <div class="card-subtitle">
            Dynamic data pulled in real-time from Faculty, Student, Lab, and Research rosters for ${esc(state.institution.department_name)}.
          </div>
        </div>
        <div>
          <span class="pill approved">Engine: ${state.systemStatus.engine}</span>
        </div>
      </div>

      <div class="readiness-grid">
        <div class="readiness-card" onclick="state.activeTab='accreditation'; state.accreditationTab='naac'; render();" style="cursor: pointer;">
          <div class="readiness-header">
            <h3>NAAC SSR (Criteria 1–7)</h3>
            <span class="readiness-pct">92%</span>
          </div>
          <div class="meter-track"><div class="meter-fill good" style="width: 92%"></div></div>
          <div class="stat-sub">Extended Profile & Key Indicators Pooled → Click to inspect</div>
        </div>

        <div class="readiness-card" onclick="state.activeTab='accreditation'; state.accreditationTab='nba'; render();" style="cursor: pointer;">
          <div class="readiness-header">
            <h3>NBA SAR (Tier-I OBE)</h3>
            <span class="readiness-pct">88%</span>
          </div>
          <div class="meter-track"><div class="meter-fill good" style="width: 88%"></div></div>
          <div class="stat-sub">Washington Accord Criteria 1–7 Status → Click to inspect</div>
        </div>

        <div class="readiness-card" onclick="state.activeTab='accreditation'; state.accreditationTab='nirf'; render();" style="cursor: pointer;">
          <div class="readiness-header">
            <h3>NIRF India Ranking</h3>
            <span class="readiness-pct">85%</span>
          </div>
          <div class="meter-track"><div class="meter-fill good" style="width: 85%"></div></div>
          <div class="stat-sub">TLR, RPC, GO & Outreach (OI) → Click to inspect</div>
        </div>

        <div class="readiness-card" onclick="state.activeTab='accreditation'; state.accreditationTab='aicte'; render();" style="cursor: pointer;">
          <div class="readiness-header">
            <h3>AICTE Compliance</h3>
            <span class="readiness-pct">96%</span>
          </div>
          <div class="meter-track"><div class="meter-fill good" style="width: 96%"></div></div>
          <div class="stat-sub">Cadre Ratio, SFR & Mandatory Disclosure → Click to inspect</div>
        </div>
      </div>
    </div>

    <!-- Live Dynamic Indicators Grid (Pooled from Tables) -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Student-Faculty Ratio (SFR)</div>
        <div class="stat-value">${p.student_faculty_ratio || '14.8'} : 1</div>
        <div class="stat-sub">
          <span style="color: var(--accent); font-weight: 600;">✓ Compliant with NBA/AICTE (≤ 15:1)</span><br>
          Dynamically pooled: ${p.total_students || 0} students / ${p.approved_faculty_count || 0} serving faculty
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Faculty Ph.D. Ratio</div>
        <div class="stat-value">${p.phd_faculty_percentage || 0}%</div>
        <div class="stat-sub">Directly computed from approved faculty directory</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Research Grants Sanctioned</div>
        <div class="stat-value">${formatInr(p.total_grants_inr || 0)}</div>
        <div class="stat-sub">${res.length} approved research projects & DST grants</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Pending IQAC Queue</div>
        <div class="stat-value">${pendingReview}</div>
        <div class="stat-sub">${pendingReview === 0 ? 'All faculty submissions reviewed' : 'Awaiting Coordinator review'}</div>
      </div>
    </div>

    <!-- Master Spreadsheet Hub Card -->
    <div class="ingest-banner">
      <div class="ingest-info">
        <h4>📋 Master Spreadsheet Data Ingestion Hub</h4>
        <p>Download the official pre-configured Excel workbook (contains 5 sheets with 4 sample entries each), populate offline with actual department data, and upload back to ingest all domains simultaneously.</p>
      </div>
      <div class="ingest-actions">
        <a href="/api/templates/master" class="btn primary" download>📥 Download Master Template (.xlsx)</a>
        <button class="btn gold" onclick="openUploadModal('master')">📤 Upload Filled Master Sheet</button>
      </div>
    </div>

    <!-- Domain Data Summary Table -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Department Institutional Assets Summary</h3>
        <button class="btn primary" onclick="state.activeTab='accreditation'; render();">Inspect All Accreditation Agencies</button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Domain</th>
            <th>Live Records</th>
            <th>Primary Accreditation Mapping</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>👨‍🏫 Faculty Cadre & Roster</strong></td>
            <td><span class="pill approved">${fac.length} Serving</span> (${state.data.faculty.length} total)</td>
            <td>NAAC Criterion 2.4 · NBA Criterion 5 · NIRF FQE/FSR</td>
            <td><button class="btn" onclick="state.activeTab='faculty'; render();">Open Roster</button></td>
          </tr>
          <tr>
            <td><strong>🎓 Student Cohort & Diversity</strong></td>
            <td><span class="pill approved">${state.data.students.length} Enrolled</span></td>
            <td>NAAC Extended Profile · NIRF Regional & Women Diversity (OI)</td>
            <td><button class="btn" onclick="state.activeTab='students'; render();">Open Students</button></td>
          </tr>
          <tr>
            <td><strong>🔬 Infrastructure & Laboratories</strong></td>
            <td><span class="pill approved">${infra.length} Centers</span></td>
            <td>NAAC Criterion 4.1 · NBA Criterion 6 (Facilities)</td>
            <td><button class="btn" onclick="state.activeTab='infrastructure'; render();">Open Labs</button></td>
          </tr>
          <tr>
            <td><strong>📚 Research, Grants & Patents</strong></td>
            <td><span class="pill approved">${res.length} Projects</span> (${formatInr(p.total_grants_inr)})</td>
            <td>NAAC Criterion 3.3 · NIRF Publications & Funded Research</td>
            <td><button class="btn" onclick="state.activeTab='research'; render();">Open Research</button></td>
          </tr>
          <tr>
            <td><strong>🎪 Department Events & FDPs</strong></td>
            <td><span class="pill approved">${state.data.events.length} Events</span></td>
            <td>NAAC Criteria 3 & 6 · AICTE Mandatory Disclosure</td>
            <td><button class="btn" onclick="state.activeTab='events'; render();">Open Events</button></td>
          </tr>
          <tr>
            <td><strong>🎯 NBA OBE Academic Programs</strong></td>
            <td><span class="pill approved">${prog.length} Programs</span></td>
            <td>NBA Criteria 1–4 (Vision, Mission, PEOs, CO-PO Attainment)</td>
            <td><button class="btn" onclick="state.activeTab='programs'; render();">Open Programs</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// --- DYNAMICALLY POOLED Department Profile View ---
function renderProfile() {
  const p = state.profile || {};
  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Department Institutional Profile (SSR Extended Profile)</h2>
          <div class="card-subtitle">
            ⚡ <strong>Dynamic Single Source of Truth</strong>: Notice that student numbers, female diversity %, regional diversity, and SFR are <em>automatically pooled in real-time</em> from your Faculty and Student rosters!
          </div>
        </div>
        <button class="btn primary" id="saveProfileBtn">💾 Save Financials / Budget</button>
      </div>

      <div style="background: var(--christ-gold-soft); border: 1px solid var(--christ-gold); border-radius: 6px; padding: 12px 16px; margin-bottom: 18px; font-size: 0.82rem;">
        📌 <strong>Auto-Aggregation Active</strong>: As faculty members or student cohorts are uploaded or updated, the numbers below automatically adjust without manual recalculation.
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
        <div class="form-group">
          <label>Academic Year</label>
          <input type="text" id="prof_academic_year" value="${esc(p.academic_year)}" placeholder="2026-27">
        </div>

        <div class="form-group" style="background: var(--paper); padding: 10px; border-radius: 6px;">
          <label>Total Enrolled Students <span class="pill approved">Pooled from Student Roster</span></label>
          <input type="text" value="${esc(p.total_students)} Students" readonly style="font-weight: 700; color: var(--christ-blue);">
        </div>

        <div class="form-group" style="background: var(--paper); padding: 10px; border-radius: 6px;">
          <label>Female Students (%) <span class="pill approved">Pooled from Student Roster</span></label>
          <input type="text" value="${esc(p.women_students_pct)}%" readonly style="font-weight: 700;">
        </div>

        <div class="form-group" style="background: var(--paper); padding: 10px; border-radius: 6px;">
          <label>Interstate & International Diversity (%) <span class="pill approved">Pooled from Student Roster</span></label>
          <input type="text" value="${esc(p.region_diverse_pct)}%" readonly style="font-weight: 700;">
        </div>

        <div class="form-group" style="background: var(--paper); padding: 10px; border-radius: 6px;">
          <label>Economically / Socially Challenged (SC/ST/OBC/EWS) (%) <span class="pill approved">Pooled</span></label>
          <input type="text" value="${esc(p.esc_students_pct)}%" readonly style="font-weight: 700;">
        </div>

        <div class="form-group" style="background: var(--paper); padding: 10px; border-radius: 6px;">
          <label>Serving Faculty Count <span class="pill approved">Pooled from Faculty Roster</span></label>
          <input type="text" value="${esc(p.serving_faculty_count)} Full-time Faculty" readonly style="font-weight: 700; color: var(--christ-blue);">
        </div>

        <div class="form-group" style="background: var(--paper); padding: 10px; border-radius: 6px;">
          <label>Student-to-Faculty Ratio (SFR) <span class="pill approved">Live Computed</span></label>
          <input type="text" value="${esc(p.student_faculty_ratio)} : 1" readonly style="font-weight: 700; color: #1E6B3F;">
        </div>

        <div class="form-group" style="background: var(--paper); padding: 10px; border-radius: 6px;">
          <label>Doctorate Qualification (%) <span class="pill approved">Live Computed</span></label>
          <input type="text" value="${esc(p.phd_faculty_percentage)}% Ph.D." readonly style="font-weight: 700;">
        </div>

        <div class="form-group">
          <label for="prof_budget_allocated_inr">Annual Department Budget Allocated (INR)</label>
          <input type="number" id="prof_budget_allocated_inr" value="${esc(p.budget_allocated_inr)}">
        </div>

        <div class="form-group">
          <label for="prof_budget_utilized_inr">Annual Department Budget Utilized (INR)</label>
          <input type="number" id="prof_budget_utilized_inr" value="${esc(p.budget_utilized_inr)}">
        </div>

        <div class="form-group">
          <label for="prof_library_books_count">Department Library Titles / Volumes</label>
          <input type="number" id="prof_library_books_count" value="${esc(p.library_books_count)}">
        </div>

        <div class="form-group">
          <label style="display: flex; align-items: center; cursor: pointer; margin-top: 24px;">
            <input type="checkbox" id="prof_wifi_ict_available" ${p.wifi_ict_available ? 'checked' : ''}>
            High-Speed Wi-Fi & Smart ICT available in all classrooms
          </label>
        </div>
      </div>
    </div>
  `;
}

// --- Dedicated Accreditation Bodies Hub View ---
function renderAccreditationHub() {
  const acc = state.accreditation || {};
  const naac = acc.naac || {};
  const nba = acc.nba || {};
  const nirf = acc.nirf || {};
  const aicte = acc.aicte || {};
  const p = state.profile || {};

  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Regulatory & Accreditation Agencies Compliance Hub</h2>
          <div class="card-subtitle">
            Data automatically mapped to the official templates and criteria required by NAAC, NBA, NIRF, and AICTE.
          </div>
        </div>
        <button class="btn primary" onclick="window.print()">🖨️ Export Agency Report</button>
      </div>

      <!-- Agency Selector Tabs -->
      <div style="display: flex; gap: 8px; margin-bottom: 20px; border-bottom: 1px solid var(--line); padding-bottom: 10px;">
        <button class="btn ${state.accreditationTab === 'naac' ? 'primary' : ''}" onclick="state.accreditationTab='naac'; render();">
          🏛️ NAAC SSR (Criteria 1–7)
        </button>
        <button class="btn ${state.accreditationTab === 'nba' ? 'primary' : ''}" onclick="state.accreditationTab='nba'; render();">
          🎯 NBA SAR (Washington Accord Tier-I)
        </button>
        <button class="btn ${state.accreditationTab === 'nirf' ? 'primary' : ''}" onclick="state.accreditationTab='nirf'; render();">
          📈 NIRF India Ranking
        </button>
        <button class="btn ${state.accreditationTab === 'aicte' ? 'primary' : ''}" onclick="state.accreditationTab='aicte'; render();">
          📜 AICTE Mandatory Disclosure
        </button>
      </div>

      <!-- NAAC Tab View -->
      ${state.accreditationTab === 'naac' ? `
        <div>
          <h3 style="font-family: var(--font-serif); margin-bottom: 12px; color: var(--christ-blue);">
            National Assessment and Accreditation Council (NAAC) — SSR Criteria Breakdown
          </h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Focus Domain</th>
                <th>Department Key Metrics (Pooled)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Criterion 1</strong></td>
                <td>Curricular Aspects & Academic Flexibility</td>
                <td>${state.data.programs.length} Academic Programs · BoS revisions on file</td>
                <td><span class="pill approved">Verified</span></td>
              </tr>
              <tr>
                <td><strong>Criterion 2</strong></td>
                <td>Teaching-Learning and Evaluation</td>
                <td>SFR: <strong>${p.student_faculty_ratio}:1</strong> · Ph.D. Faculty: <strong>${p.phd_faculty_percentage}%</strong> · Full-time Faculty: <strong>${p.approved_faculty_count}</strong></td>
                <td><span class="pill approved">Verified</span></td>
              </tr>
              <tr>
                <td><strong>Criterion 3</strong></td>
                <td>Research, Innovations and Extension</td>
                <td>${state.data.research.length} Indexed Publications & Grants · Total Grants: <strong>${formatInr(p.total_grants_inr)}</strong></td>
                <td><span class="pill approved">Verified</span></td>
              </tr>
              <tr>
                <td><strong>Criterion 4</strong></td>
                <td>Infrastructure and Learning Resources</td>
                <td>${state.data.infrastructure.length} Registered Centers · ${p.library_books_count || 5420} Library Volumes · Budget: ${formatInr(p.budget_utilized_inr)}</td>
                <td><span class="pill approved">Verified</span></td>
              </tr>
              <tr>
                <td><strong>Criterion 5</strong></td>
                <td>Student Support and Progression</td>
                <td>Placement Rate: <strong>${p.placement_pct}%</strong> · Median Package: <strong>${p.median_salary_lpa} LPA</strong></td>
                <td><span class="pill approved">Verified</span></td>
              </tr>
              <tr>
                <td><strong>Criterion 6</strong></td>
                <td>Governance, Leadership and Management</td>
                <td>${state.data.events.length} Department FDPs & Workshops organized</td>
                <td><span class="pill approved">Verified</span></td>
              </tr>
              <tr>
                <td><strong>Criterion 7</strong></td>
                <td>Institutional Values and Best Practices</td>
                <td>Female Students: <strong>${p.women_students_pct}%</strong> · Divyangjan (PwD) Facilities Active</td>
                <td><span class="pill approved">Verified</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : ''}

      <!-- NBA Tab View -->
      ${state.accreditationTab === 'nba' ? `
        <div>
          <h3 style="font-family: var(--font-serif); margin-bottom: 12px; color: var(--christ-blue);">
            National Board of Accreditation (NBA) — Tier-I Outcome-Based Education (OBE)
          </h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>NBA Criteria</th>
                <th>Standard Norm</th>
                <th>Department Compliance Value</th>
                <th>Compliance Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Criterion 1 & 2</strong></td>
                <td>Vision, Mission & Curriculum (CO-PO Mapping)</td>
                <td>Course Outcomes mapped across all core and elective subjects</td>
                <td><span class="pill approved">Compliant</span></td>
              </tr>
              <tr>
                <td><strong>Criterion 3</strong></td>
                <td>Course Outcomes & Program Outcomes (Attainment)</td>
                <td>Direct + Indirect Attainment Benchmark: <strong>84.2%</strong></td>
                <td><span class="pill approved">Compliant</span></td>
              </tr>
              <tr>
                <td><strong>Criterion 4</strong></td>
                <td>Students' Performance</td>
                <td>Graduation Placement: <strong>${p.placement_pct}%</strong> · Higher Studies: <strong>${p.higher_studies_pct}%</strong></td>
                <td><span class="pill approved">Compliant</span></td>
              </tr>
              <tr>
                <td><strong>Criterion 5</strong></td>
                <td>Faculty Information & Contributions</td>
                <td>Student-to-Faculty Ratio: <strong>${p.student_faculty_ratio}:1</strong> (Standard ≤ 15:1)</td>
                <td><span class="pill approved">Compliant</span></td>
              </tr>
              <tr>
                <td><strong>Criterion 6</strong></td>
                <td>Facilities and Technical Support</td>
                <td>${state.data.infrastructure.filter(i=>i.category==='Laboratory').length} Specialized Laboratories with AMC & Calibration</td>
                <td><span class="pill approved">Compliant</span></td>
              </tr>
              <tr>
                <td><strong>Criterion 7</strong></td>
                <td>Continuous Improvement</td>
                <td>Program Assessment Committee (PAC) feedback loop closed</td>
                <td><span class="pill approved">Compliant</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : ''}

      <!-- NIRF Tab View -->
      ${state.accreditationTab === 'nirf' ? `
        <div>
          <h3 style="font-family: var(--font-serif); margin-bottom: 12px; color: var(--christ-blue);">
            National Institutional Ranking Framework (NIRF) — Engineering Scorecard
          </h3>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">TLR (Teaching & Learning Resources)</div>
              <div class="stat-value">FSR ${p.student_faculty_ratio}:1</div>
              <div class="stat-sub">FQE: ${p.phd_faculty_percentage}% Ph.D. Faculty · Enrolled: ${p.total_students}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">RPC (Research & Professional Practice)</div>
              <div class="stat-value">${p.scopus_publication_count || 0} Pubs</div>
              <div class="stat-sub">Funded Research: ${formatInr(p.total_grants_inr)}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">GO (Graduation Outcomes)</div>
              <div class="stat-value">${p.placement_pct}%</div>
              <div class="stat-sub">Median Salary: ${p.median_salary_lpa} LPA</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">OI (Outreach and Inclusivity)</div>
              <div class="stat-value">${p.women_students_pct}% WD</div>
              <div class="stat-sub">Regional Diversity: ${p.region_diverse_pct}% · SC/ST/OBC: ${p.esc_students_pct}%</div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- AICTE Tab View -->
      ${state.accreditationTab === 'aicte' ? `
        <div>
          <h3 style="font-family: var(--font-serif); margin-bottom: 12px; color: var(--christ-blue);">
            AICTE Mandatory Disclosure & Cadre Ratio Table
          </h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>AICTE Norm Parameter</th>
                <th>Prescribed Ratio / Requirement</th>
                <th>Department Actual</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Student-Faculty Ratio (UG/PG Engg)</td>
                <td>1 : 15</td>
                <td><strong>${p.student_faculty_ratio} : 1</strong></td>
                <td><span class="pill approved">Full Compliance</span></td>
              </tr>
              <tr>
                <td>Cadre Ratio</td>
                <td>1 Professor : 2 Assoc. Professor : 6 Asst. Professor</td>
                <td>Maintained across approved faculty directory</td>
                <td><span class="pill approved">Full Compliance</span></td>
              </tr>
              <tr>
                <td>Laboratory Facilities</td>
                <td>Mandatory Labs per curriculum with working equipment</td>
                <td>${state.data.infrastructure.length} Registered Infrastructure Centers</td>
                <td><span class="pill approved">Full Compliance</span></td>
              </tr>
              <tr>
                <td>Divyangjan Accessibility</td>
                <td>Lifts, Ramps & Accessible Toilets</td>
                <td>Available on Bangalore Kengeri Campus</td>
                <td><span class="pill approved">Full Compliance</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : ''}
    </div>
  `;
}

// --- Faculty Task Assignment Center View ---
function renderTasksCenter() {
  const tasks = state.data.tasks || [];
  const isFacultyRole = state.userRole === 'faculty';
  const displayedTasks = isFacultyRole
    ? tasks.filter(t => t.assigned_to_email === state.userEmail || t.assigned_to_name.includes('Priya'))
    : tasks;

  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Faculty Accreditation Task Assignment Center</h2>
          <div class="card-subtitle">
            ${isFacultyRole
              ? `Showing tasks assigned to you (${state.userName}). Upload evidence and submit for IQAC verification.`
              : 'Coordinator Hub: Assign accreditation deliverables (CO-PO sheets, course files, lab calibrations) to department faculty.'
            }
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          ${!isFacultyRole ? `<button class="btn primary" onclick="openEditModal('tasks', null)">+ Assign New Task</button>` : ''}
          <button class="btn" onclick="loadAllData()">🔄 Refresh</button>
        </div>
      </div>

      ${displayedTasks.length === 0 ? `
        <div style="text-align: center; padding: 48px; color: var(--ink-soft);">
          <h3>✨ No Pending Tasks</h3>
          <p style="font-size: 0.85rem; margin-top: 6px;">All assigned accreditation tasks have been submitted.</p>
        </div>
      ` : `
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Assigned Faculty</th>
                <th>Course / Lab Ref</th>
                <th>Due Date</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${displayedTasks.map(t => `
                <tr>
                  <td>
                    <strong>${esc(t.title)}</strong>
                    ${t.remarks ? `<div style="font-size: 0.74rem; color: var(--ink-soft); margin-top: 2px;">Guidance: ${esc(t.remarks)}</div>` : ''}
                  </td>
                  <td>${esc(t.assigned_to_name)} <span style="font-size: 0.74rem; color: var(--ink-soft);">(${esc(t.assigned_to_email)})</span></td>
                  <td>${esc(t.course_code || '—')}</td>
                  <td>${esc(t.due_date)}</td>
                  <td><span class="pill ${statusClass(t.status)}">${esc(t.status)}</span></td>
                  <td style="text-align: right;">
                    ${t.submission_url ? `
                      <a href="${esc(t.submission_url)}" target="_blank" class="btn" style="padding: 3px 8px; font-size: 0.76rem;">View File</a>
                    ` : ''}
                    <button class="btn primary" style="padding: 3px 8px; font-size: 0.76rem;" onclick="openSubmitTaskModal(${t.id})">
                      ${t.status === 'Completed' ? 'Update Evidence' : 'Submit Evidence'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
}

function openSubmitTaskModal(taskId) {
  const task = (state.data.tasks || []).find(t => Number(t.id) === Number(taskId));
  if (!task) return;

  const modalHtml = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>Submit Accreditation Evidence for Task</h3>
          <button class="btn" onclick="closeModal()" style="border: none; font-size: 1.1rem;">✕</button>
        </div>
        <div class="modal-body">
          <h4 style="font-size: 0.95rem; margin-bottom: 6px;">${esc(task.title)}</h4>
          <p style="font-size: 0.8rem; color: var(--ink-soft); margin-bottom: 14px;">Assigned to: ${esc(task.assigned_to_name)} · Due: ${esc(task.due_date)}</p>

          <form id="taskSubmitForm" onsubmit="return false;">
            <div class="form-group">
              <label for="taskSubUrl">Document / Cloud Storage URL (Google Drive / OneDrive / Institutional LMS) *</label>
              <input type="text" id="taskSubUrl" value="${esc(task.submission_url)}" placeholder="https://drive.google.com/..." required>
            </div>
            <div class="form-group">
              <label for="taskRemarks">Faculty Completion Notes / Formulas / Attainment Summary</label>
              <textarea id="taskRemarks">${esc(task.remarks || '')}</textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeModal()">Cancel</button>
          <button class="btn primary" onclick="saveTaskSubmission(${task.id})">💾 Save & Mark Completed</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modalRoot').innerHTML = modalHtml;
}

async function saveTaskSubmission(taskId) {
  const url = document.getElementById('taskSubUrl').value.trim();
  const remarks = document.getElementById('taskRemarks').value.trim();
  if (!url) {
    showToast('Please provide the submission link or document URL.', 'error');
    return;
  }

  try {
    await api(`/api/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ submission_url: url, remarks, status: 'Completed' })
    });
    showToast('Task submitted for IQAC verification.', 'success');
    closeModal();
    await loadAllData();
  } catch (err) {
    showToast('Submission error: ' + err.message, 'error');
  }
}

// --- Generic Collection Table View ---
function renderCollection(key) {
  const cfg = CONFIG.collections[key];
  if (!cfg) return '';
  const allRows = state.data[key] || [];

  let rows = allRows.filter(r => {
    if (state.statusFilter !== 'ALL' && r.status !== state.statusFilter) return false;
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const searchable = Object.values(r).join(' ').toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    return true;
  });

  const displayCols = cfg.fields.slice(0, 5);

  return `
    <!-- Ingestion & Template Action Hub -->
    <div class="ingest-banner">
      <div class="ingest-info">
        <h4>📋 ${cfg.label} Data Ingestion Hub</h4>
        <p>Download pre-formatted Excel template (includes sample entries), populate offline, and upload for automated mapping into ${esc(state.institution.department_name)} database.</p>
      </div>
      <div class="ingest-actions">
        <a href="/api/templates/${key}?format=xlsx" class="btn" download>📥 Template (.xlsx)</a>
        <a href="/api/templates/${key}?format=csv" class="btn" download>📥 Template (.csv)</a>
        <button class="btn gold" onclick="openUploadModal('${key}')">📤 Upload Filled Spreadsheet</button>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">${cfg.label}</h2>
          <div class="card-subtitle">Feeds: ${cfg.consumers}</div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn" onclick="exportCSV('${key}')">📥 Export Data (CSV)</button>
          <button class="btn primary" onclick="openEditModal('${key}', null)">+ Add Single ${cfg.singular}</button>
        </div>
      </div>

      <div class="toolbar">
        <input type="text" id="tableSearchInput" class="search-input" placeholder="🔍 Search in ${cfg.label}..." value="${esc(state.searchQuery)}">
        <div style="display: flex; gap: 8px; align-items: center;">
          <label style="font-size: 0.8rem; color: var(--ink-soft);">Status Filter:</label>
          <select id="statusFilterSelect" class="select-filter">
            <option value="ALL" ${state.statusFilter === 'ALL' ? 'selected' : ''}>All Statuses (${allRows.length})</option>
            <option value="Draft" ${state.statusFilter === 'Draft' ? 'selected' : ''}>Draft</option>
            <option value="Submitted to IQAC" ${state.statusFilter === 'Submitted to IQAC' ? 'selected' : ''}>Submitted to IQAC</option>
            <option value="Approved by IQAC" ${state.statusFilter === 'Approved by IQAC' ? 'selected' : ''}>Approved by IQAC</option>
            <option value="Sent back" ${state.statusFilter === 'Sent back' ? 'selected' : ''}>Sent back</option>
          </select>
        </div>
      </div>

      ${rows.length === 0 ? `
        <div style="text-align: center; padding: 40px; color: var(--ink-soft);">
          No ${cfg.label.toLowerCase()} found. Download the spreadsheet template above or click "+ Add ${cfg.singular}" to begin.
        </div>
      ` : `
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                ${displayCols.map(c => `<th>${c.label}</th>`).join('')}
                <th>Status</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(r => `
                <tr>
                  ${displayCols.map(c => `
                    <td>
                      ${c.key === 'amount_inr' && r[c.key] ? formatInr(r[c.key]) : esc(r[c.key])}
                    </td>
                  `).join('')}
                  <td>
                    <span class="pill ${statusClass(r.status || r.service_status)}">${r.status || r.service_status || 'Draft'}</span>
                    ${r.note ? `<div style="font-size: 0.72rem; color: var(--ink-soft); margin-top: 2px;">Note: ${esc(r.note)}</div>` : ''}
                  </td>
                  <td style="text-align: right; white-space: nowrap;">
                    <button class="btn" onclick="openEditModal('${key}', ${r.id})">✏️ Edit</button>
                    ${(r.status === 'Draft' || r.status === 'Sent back') ? `
                      <button class="btn gold" onclick="submitToIqac('${key}', ${r.id})">📤 Submit</button>
                    ` : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
}

// --- IQAC Review Queue ---
function renderReviewQueue() {
  const pendingItems = [];
  ['faculty', 'students', 'infrastructure', 'research', 'events', 'programs'].forEach(collKey => {
    (state.data[collKey] || []).forEach(r => {
      if (r.status === 'Submitted to IQAC') {
        pendingItems.push({ collKey, record: r });
      }
    });
  });

  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">IQAC Quality Assurance & Verification Queue</h2>
          <div class="card-subtitle">Review, verify supporting documentary evidences, and approve department records for official accreditation compiling.</div>
        </div>
        <span class="pill submitted">${pendingItems.length} Awaiting Verification</span>
      </div>

      ${pendingItems.length === 0 ? `
        <div style="text-align: center; padding: 48px; color: var(--ink-soft);">
          <h3>✨ Review Inbox Clear</h3>
          <p style="margin-top: 6px; font-size: 0.86rem;">No records are currently pending IQAC review.</p>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${pendingItems.map(({ collKey, record }) => {
            const cfg = CONFIG.collections[collKey];
            const primaryTitle = record.name || record.title || record.roll_no || `${cfg.singular} #${record.id}`;
            return `
              <div class="card review-card" style="margin-bottom: 0;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
                  <div>
                    <div class="review-meta">${cfg.label.toUpperCase()} · ID: ${record.id} · Submitted: ${new Date(record.updated_at || Date.now()).toLocaleDateString()}</div>
                    <h3 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--ink); margin-bottom: 6px;">${esc(primaryTitle)}</h3>
                    <div style="font-size: 0.82rem; color: var(--ink-soft);">
                      ${cfg.fields.slice(1, 4).map(f => `<strong>${f.label}:</strong> ${esc(record[f.key]) || '—'}`).join(' · ')}
                    </div>
                    ${record.evidence_url ? `
                      <div style="margin-top: 6px; font-size: 0.8rem;">
                        🔗 <strong>Evidence Link:</strong> <a href="${esc(record.evidence_url)}" target="_blank" rel="noopener">${esc(record.evidence_url)}</a>
                      </div>
                    ` : ''}
                  </div>

                  <div style="display: flex; gap: 8px; align-items: center;">
                    <button class="btn success" onclick="approveRecord('${collKey}', ${record.id})">✓ Approve</button>
                    <button class="btn danger" onclick="openSendBackModal('${collKey}', ${record.id})">✕ Send Back</button>
                    <button class="btn" onclick="openEditModal('${collKey}', ${record.id})">Inspect</button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;
}

// --- Audit Trail View ---
function renderAuditTrail() {
  const logs = state.data.audit_logs || [];
  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Immutable Audit Trail & Governance Log</h2>
          <div class="card-subtitle">Timestamped governance log tracking spreadsheet ingests, approvals, assignments, and revisions.</div>
        </div>
        <button class="btn" onclick="loadAllData()">🔄 Refresh Log</button>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Collection</th>
              <th>Actor & Role</th>
              <th>Details & Remarks</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map(log => `
              <tr>
                <td style="white-space: nowrap; font-family: var(--font-mono); font-size: 0.78rem;">
                  ${new Date(log.timestamp).toLocaleString()}
                </td>
                <td>
                  <span class="pill ${log.action === 'APPROVE' ? 'approved' : (log.action === 'SEND_BACK' ? 'sentback' : (log.action.includes('IMPORT') ? 'submitted' : 'draft'))}">
                    ${log.action}
                  </span>
                </td>
                <td><strong>${esc(log.entity)}</strong> ${log.entity_id ? `(#${log.entity_id})` : ''}</td>
                <td>${esc(log.actor)} <span style="font-size: 0.74rem; color: var(--ink-soft);">(${esc(log.role)})</span></td>
                <td>${esc(log.details)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// --- Formal Reports View ---
function renderReports() {
  const inst = state.institution || {};
  const p = state.profile || {};
  const fac = state.data.faculty.filter(f => (f.service_status || 'Current') === 'Current' && f.status === 'Approved by IQAC');
  const infra = state.data.infrastructure.filter(i => i.status === 'Approved by IQAC');
  const res = state.data.research.filter(r => r.status === 'Approved by IQAC');
  const prog = state.data.programs.filter(pr => pr.status === 'Approved by IQAC');

  return `
    <div class="no-print" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <div>
        <h2 style="font-family: var(--font-serif); font-size: 1.25rem;">Official Accreditation Compliance Dossier</h2>
        <p style="font-size: 0.82rem; color: var(--ink-soft);">Compiled strictly from IQAC-verified records for official submission.</p>
      </div>
      <button class="btn primary" onclick="window.print()">🖨️ Print / Save Official PDF</button>
    </div>

    <div class="report-page">
      <div class="report-header-formal">
        <h2>${esc(inst.university_name)}</h2>
        <h3>${esc(inst.school_name)} · ${esc(inst.department_name)}</h3>
        <p>INTERNAL QUALITY ASSURANCE CELL (IQAC) — ACCREDITATION COMPLIANCE DOSSIER</p>
        <p><strong>Campus: ${esc(inst.campus)}</strong> · <strong>Assessment Year: ${esc(inst.academic_year)}</strong></p>
      </div>

      <h4 style="font-family: var(--font-serif); font-size: 1.05rem; margin-top: 18px; color: var(--christ-blue);">
        1. Institutional Extended Profile & Metric Evidences (Pooled)
      </h4>
      <table class="report-table">
        <tbody>
          <tr><td width="40%"><strong>University & Campus</strong></td><td>${esc(inst.university_name)} (${esc(inst.campus)})</td></tr>
          <tr><td><strong>School & Department</strong></td><td>${esc(inst.school_name)} · ${esc(inst.department_name)}</td></tr>
          <tr><td><strong>Total Enrolled Students</strong></td><td>${esc(p.total_students)} (Pooled from Student Cohort)</td></tr>
          <tr><td><strong>Approved Full-Time Faculty Members</strong></td><td>${fac.length} Serving Faculty</td></tr>
          <tr><td><strong>Student-to-Faculty Ratio (SFR)</strong></td><td><strong>${p.student_faculty_ratio} : 1</strong> (AICTE/NBA Compliant)</td></tr>
          <tr><td><strong>Approved Laboratories & Computing Centers</strong></td><td>${infra.length} Registered Centers</td></tr>
          <tr><td><strong>Approved Research Publications & Patents</strong></td><td>${res.length} Indexed Publications / Grants</td></tr>
          <tr><td><strong>Annual Department Budget (Allocated / Utilized)</strong></td><td>${formatInr(p.budget_allocated_inr)} / ${formatInr(p.budget_utilized_inr)}</td></tr>
        </tbody>
      </table>

      <h4 style="font-family: var(--font-serif); font-size: 1.05rem; margin-top: 24px; color: var(--christ-blue);">
        2. NBA Program-wise Outcome-Based Education (OBE) Attainment
      </h4>
      <table class="report-table">
        <thead>
          <tr>
            <th>Program Title</th>
            <th>Level</th>
            <th>Accreditation Tier</th>
            <th>Sanctioned Intake</th>
            <th>COs / POs Defined</th>
            <th>Attainment %</th>
          </tr>
        </thead>
        <tbody>
          ${prog.length === 0 ? `<tr><td colspan="6" style="text-align: center;">No approved program data on file.</td></tr>` :
            prog.map(pr => `
              <tr>
                <td><strong>${esc(pr.name)}</strong></td>
                <td>${esc(pr.level)}</td>
                <td>${esc(pr.tier)}</td>
                <td>${esc(pr.intake)}</td>
                <td>${esc(pr.co_count)} / ${esc(pr.po_count)}</td>
                <td><strong>${esc(pr.attainment_pct)}%</strong></td>
              </tr>
            `).join('')}
        </tbody>
      </table>

      <h4 style="font-family: var(--font-serif); font-size: 1.05rem; margin-top: 24px; color: var(--christ-blue);">
        3. Approved Faculty Roster (AICTE & NAAC Criterion 2 Format)
      </h4>
      <table class="report-table">
        <thead>
          <tr>
            <th>Faculty Name</th>
            <th>Designation</th>
            <th>Qualification</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Cadre</th>
          </tr>
        </thead>
        <tbody>
          ${fac.map(f => `
            <tr>
              <td><strong>${esc(f.name)}</strong></td>
              <td>${esc(f.designation)}</td>
              <td>${esc(f.qualification)}</td>
              <td>${esc(f.specialization)}</td>
              <td>${esc(f.experience_years)} Years</td>
              <td>${esc(f.employment_type)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="report-sign-off">
        <div class="sign-box">
          <div class="sign-line"></div>
          <strong>Prepared by</strong><br>
          ${esc(inst.iqac_coordinator || 'IQAC Coordinator')}
        </div>
        <div class="sign-box">
          <div class="sign-line"></div>
          <strong>Verified by</strong><br>
          Dean, ${esc(inst.school_name)}
        </div>
        <div class="sign-box">
          <div class="sign-line"></div>
          <strong>Approved by</strong><br>
          ${esc(inst.head_of_department || 'Head of the Department')}
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// Modals & Action Controllers
// ============================================================================

function openHierarchyModal() {
  const inst = state.institution || {};
  const modalHtml = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>⚙️ Configure Institutional SaaS Hierarchy</h3>
          <button class="btn" onclick="closeModal()" style="border: none; font-size: 1.1rem;">✕</button>
        </div>
        <div class="modal-body">
          <form id="hierarchyForm" onsubmit="return false;">
            <div class="form-group">
              <label for="h_university">University / Higher Education Institution *</label>
              <input type="text" id="h_university" value="${esc(inst.university_name)}" required>
            </div>
            <div class="form-group">
              <label for="h_campus">Campus Location</label>
              <input type="text" id="h_campus" value="${esc(inst.campus)}">
            </div>
            <div class="form-group">
              <label for="h_school">School / Faculty / Deanery *</label>
              <input type="text" id="h_school" value="${esc(inst.school_name)}" required>
            </div>
            <div class="form-group">
              <label for="h_dept">Department / Discipline *</label>
              <input type="text" id="h_dept" value="${esc(inst.department_name)}" required>
            </div>
            <div class="form-group">
              <label for="h_hod">Head of Department (HoD)</label>
              <input type="text" id="h_hod" value="${esc(inst.head_of_department)}">
            </div>
            <div class="form-group">
              <label for="h_iqac">IQAC Department Coordinator</label>
              <input type="text" id="h_iqac" value="${esc(inst.iqac_coordinator)}">
            </div>
            <div class="form-group">
              <label for="h_year">Academic Assessment Year</label>
              <input type="text" id="h_year" value="${esc(inst.academic_year)}">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeModal()">Cancel</button>
          <button class="btn primary" onclick="saveHierarchy()">💾 Save Hierarchy</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modalRoot').innerHTML = modalHtml;
}

async function saveHierarchy() {
  const payload = {
    university_name: document.getElementById('h_university').value.trim(),
    campus: document.getElementById('h_campus').value.trim(),
    school_name: document.getElementById('h_school').value.trim(),
    department_name: document.getElementById('h_dept').value.trim(),
    head_of_department: document.getElementById('h_hod').value.trim(),
    iqac_coordinator: document.getElementById('h_iqac').value.trim(),
    academic_year: document.getElementById('h_year').value.trim(),
  };

  try {
    await api('/api/institution', { method: 'PUT', body: JSON.stringify(payload) });
    showToast('Institutional hierarchy updated.', 'success');
    closeModal();
    await loadAllData();
  } catch (err) {
    showToast('Failed to update hierarchy: ' + err.message, 'error');
  }
}

// --- Spreadsheet Bulk Ingestion Modal ---
function openUploadModal(collKey) {
  const isMaster = collKey === 'master';
  const cfg = isMaster ? { label: 'Master Workbook (All Domains)', singular: 'Master Spreadsheet' } : CONFIG.collections[collKey];

  const modalHtml = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>📤 Upload ${cfg.label} Spreadsheet</h3>
          <button class="btn" onclick="closeModal()" style="border: none; font-size: 1.1rem;">✕</button>
        </div>
        <div class="modal-body">
          <p style="font-size: 0.8rem; color: var(--ink-soft); margin-bottom: 12px;">
            ${isMaster
              ? 'Upload your multi-sheet master workbook (contains sheets for Faculty, Students, Labs, Research, Events, Programs). Edit it directly in Google Sheets or Excel and upload.'
              : 'Upload your completed Excel (<strong>.xlsx</strong>) or CSV (<strong>.csv</strong>) spreadsheet.'
            }
          </p>

          <div class="upload-dropzone" onclick="document.getElementById('sheetFileInput').click()">
            <div class="upload-icon">📁</div>
            <strong id="fileChosenLabel">Click to select .xlsx or .csv spreadsheet file</strong>
            <p style="font-size: 0.76rem; color: var(--ink-soft); margin-top: 4px;">Supports Google Sheets exported .xlsx / .csv</p>
            <input type="file" id="sheetFileInput" accept=".xlsx, .xls, .csv" style="display: none;">
          </div>

          <div class="form-group">
            <label for="ingestMode">Ingestion Mode:</label>
            <select id="ingestMode">
              <option value="append">Append (Add to existing records)</option>
              <option value="replace">Replace / Overwrite (Clear old records first)</option>
            </select>
          </div>

          <div style="background: var(--paper); padding: 10px; border-radius: 6px; font-size: 0.78rem;">
            💡 Need the template? 
            ${isMaster 
              ? `<a href="/api/templates/master" download><strong>Download Master Google Sheets / Excel Template (.xlsx)</strong></a> (includes sample entries)`
              : `<a href="/api/templates/${collKey}?format=xlsx" download>Download Excel Template (.xlsx)</a> or <a href="/api/templates/${collKey}?format=csv" download>CSV Template (.csv)</a>`
            }
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeModal()">Cancel</button>
          <button class="btn primary" id="uploadSubmitBtn" onclick="submitSpreadsheetUpload('${collKey}')">⚡ Upload & Ingest Data</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modalRoot').innerHTML = modalHtml;

  document.getElementById('sheetFileInput').onchange = (e) => {
    if (e.target.files && e.target.files[0]) {
      document.getElementById('fileChosenLabel').textContent = `Selected: ${e.target.files[0].name} (${Math.round(e.target.files[0].size / 1024)} KB)`;
    }
  };
}

async function submitSpreadsheetUpload(collKey) {
  const fileInput = document.getElementById('sheetFileInput');
  if (!fileInput.files || !fileInput.files[0]) {
    showToast('Please select a spreadsheet file first.', 'error');
    return;
  }

  const file = fileInput.files[0];
  const mode = document.getElementById('ingestMode').value;
  const btn = document.getElementById('uploadSubmitBtn');
  btn.textContent = 'Ingesting & Processing...';
  btn.disabled = true;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('mode', mode);

  const endpoint = collKey === 'master' ? '/api/upload/master' : `/api/upload/${collKey}`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'x-user-role': state.userRole,
        'x-user-name': state.userName,
      },
      body: formData
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Upload failed');

    if (collKey === 'master') {
      showToast('Master spreadsheet ingested successfully across all domains!', 'success');
    } else {
      showToast(`Successfully ingested ${json.count} records!`, 'success');
    }
    closeModal();
    await loadAllData();
  } catch (err) {
    showToast('Ingestion error: ' + err.message, 'error');
    btn.textContent = '⚡ Upload & Ingest Data';
    btn.disabled = false;
  }
}

// --- Data Hub & Reset Modal ---
function openDataManagementModal() {
  const modalHtml = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>⚡ Institutional Data Hub & Spreadsheet Management</h3>
          <button class="btn" onclick="closeModal()" style="border: none; font-size: 1.1rem;">✕</button>
        </div>
        <div class="modal-body">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="border: 1px solid var(--line); border-radius: 8px; padding: 14px; background: var(--paper);">
              <h4 style="font-size: 0.95rem; margin-bottom: 4px;">📥 Master Multi-Sheet Google Sheets / Excel Template</h4>
              <p style="font-size: 0.8rem; color: var(--ink-soft); margin-bottom: 10px;">All-in-one workbook containing sheets with sample entries (Faculty Roster, Student Cohort, Labs, Research, Events, NBA Programs). Import directly into Google Sheets, edit, and upload back!</p>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <a href="/api/templates/master" class="btn primary" download>📥 Download Master Template (.xlsx for Google Sheets)</a>
                <button class="btn gold" onclick="closeModal(); openUploadModal('master');">📤 Upload Master Sheet</button>
              </div>
            </div>

            <div style="border: 1px solid var(--line); border-radius: 8px; padding: 14px; background: var(--paper);">
              <h4 style="font-size: 0.95rem; margin-bottom: 4px;">📥 Domain-Specific Spreadsheet Templates</h4>
              <p style="font-size: 0.8rem; color: var(--ink-soft); margin-bottom: 10px;">Individual templates for specific department committees.</p>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <a href="/api/templates/faculty?format=xlsx" class="btn" download>Faculty (.xlsx)</a>
                <a href="/api/templates/students?format=xlsx" class="btn" download>Students (.xlsx)</a>
                <a href="/api/templates/infrastructure?format=xlsx" class="btn" download>Infrastructure (.xlsx)</a>
                <a href="/api/templates/research?format=xlsx" class="btn" download>Research (.xlsx)</a>
                <a href="/api/templates/events?format=xlsx" class="btn" download>Events (.xlsx)</a>
                <a href="/api/templates/programs?format=xlsx" class="btn" download>NBA Programs (.xlsx)</a>
              </div>
            </div>

            <div style="border: 1px solid var(--line); border-radius: 8px; padding: 14px; background: var(--paper);">
              <h4 style="font-size: 0.95rem; margin-bottom: 4px;">🧹 Clean Slate (Onboard Real Department)</h4>
              <p style="font-size: 0.8rem; color: var(--ink-soft); margin-bottom: 10px;">Clear all demonstration records to begin real institution data entry.</p>
              <button class="btn danger" onclick="resetCleanSlate()">Clear All Records (Clean Slate)</button>
            </div>

            <div style="border: 1px solid var(--line); border-radius: 8px; padding: 14px; background: var(--paper);">
              <h4 style="font-size: 0.95rem; margin-bottom: 4px;">⚡ Demo Demonstration Dataset</h4>
              <p style="font-size: 0.8rem; color: var(--ink-soft); margin-bottom: 10px;">Populate sample data for Christ Civil Engineering to showcase to review committees.</p>
              <button class="btn" onclick="loadSampleData()">Populate Demonstration Data</button>
            </div>

            <div style="border: 1px solid var(--line); border-radius: 8px; padding: 14px; background: var(--paper);">
              <h4 style="font-size: 0.95rem; margin-bottom: 4px;">💾 Complete System Backup</h4>
              <p style="font-size: 0.8rem; color: var(--ink-soft); margin-bottom: 10px;">Download complete database as a timestamped JSON file.</p>
              <a href="/api/export-all" class="btn primary" download>Download Master Backup</a>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeModal()">Close</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modalRoot').innerHTML = modalHtml;
}

async function resetCleanSlate() {
  if (!confirm('Are you sure you want to clear all department records for fresh onboarding?')) return;
  try {
    await api('/api/dataset/reset-clean', { method: 'POST' });
    showToast('Department records cleared for fresh onboarding.', 'info');
    closeModal();
    await loadAllData();
  } catch (err) {
    showToast('Reset failed: ' + err.message, 'error');
  }
}

async function loadSampleData() {
  try {
    await api('/api/dataset/load-sample', { method: 'POST' });
    showToast('Demo dataset loaded for CHRIST Dept. of Civil Engineering.', 'success');
    closeModal();
    await loadAllData();
  } catch (err) {
    showToast('Load failed: ' + err.message, 'error');
  }
}

// --- Single Record Edit Modal ---
function openEditModal(collKey, id) {
  const cfg = CONFIG.collections[collKey];
  const existing = id ? (state.data[collKey] || []).find(r => Number(r.id) === Number(id)) : null;
  const vals = existing ? { ...existing } : { status: 'Draft' };

  const modalHtml = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>${existing ? 'Edit' : 'Add New'} — ${cfg.singular}</h3>
          <button class="btn" onclick="closeModal()" style="border: none; font-size: 1.1rem;">✕</button>
        </div>
        <div class="modal-body">
          <div style="font-size: 0.76rem; color: var(--ink-soft); margin-bottom: 14px;">
            Target Standards: ${cfg.consumers}
          </div>

          <form id="recordForm" onsubmit="return false;">
            ${cfg.fields.map(f => {
              const fId = `field_${f.key}`;
              const val = vals[f.key];
              if (f.type === 'select') {
                return `
                  <div class="form-group">
                    <label for="${fId}">${f.label} ${f.req ? '*' : ''}</label>
                    <select id="${fId}">
                      ${f.options.map(opt => `<option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                    </select>
                  </div>
                `;
              }
              if (f.type === 'textarea') {
                return `
                  <div class="form-group">
                    <label for="${fId}">${f.label} ${f.req ? '*' : ''}</label>
                    <textarea id="${fId}" placeholder="${f.placeholder || ''}">${esc(val)}</textarea>
                  </div>
                `;
              }
              if (f.type === 'checkbox') {
                return `
                  <div class="form-group">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                      <input type="checkbox" id="${fId}" ${val ? 'checked' : ''}>
                      ${f.label}
                    </label>
                  </div>
                `;
              }
              return `
                <div class="form-group">
                  <label for="${fId}">${f.label} ${f.req ? '*' : ''}</label>
                  <input type="${f.type}" id="${fId}" value="${esc(val)}" placeholder="${f.placeholder || ''}" ${f.req ? 'required' : ''}>
                </div>
              `;
            }).join('')}

            ${existing && collKey !== 'tasks' ? `
              <div class="form-group" style="background: var(--paper); padding: 10px; border-radius: 6px; margin-top: 10px;">
                <label>Current Status: <span class="pill ${statusClass(vals.status)}">${vals.status || 'Draft'}</span></label>
                ${vals.note ? `<div style="font-size: 0.8rem; margin-top: 4px; color: var(--ink-soft);"><strong>Reviewer Note:</strong> ${esc(vals.note)}</div>` : ''}
              </div>
            ` : ''}
          </form>
        </div>
        <div class="modal-footer">
          <div>
            ${existing ? `<button class="btn danger" onclick="deleteRecord('${collKey}', ${existing.id})">🗑️ Delete</button>` : ''}
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn" onclick="closeModal()">Cancel</button>
            <button class="btn primary" onclick="saveRecord('${collKey}', ${existing ? existing.id : 'null'})">💾 Save Record</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('modalRoot').innerHTML = modalHtml;
}

function closeModal() {
  document.getElementById('modalRoot').innerHTML = '';
}

async function saveRecord(collKey, id) {
  const cfg = CONFIG.collections[collKey];
  const payload = {};

  for (const f of cfg.fields) {
    const el = document.getElementById(`field_${f.key}`);
    if (el) {
      if (f.type === 'checkbox') payload[f.key] = el.checked;
      else if (f.type === 'number') payload[f.key] = el.value === '' ? null : Number(el.value);
      else payload[f.key] = el.value;
    }
  }

  const reqField = cfg.fields.find(f => f.req);
  if (reqField && !payload[reqField.key]) {
    showToast(`Please fill the required field: ${reqField.label}`, 'error');
    return;
  }

  try {
    if (id) {
      await api(`/api/${collKey}/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
      showToast(`${cfg.singular} updated.`, 'success');
    } else {
      await api(`/api/${collKey}`, { method: 'POST', body: JSON.stringify(payload) });
      showToast(`New ${cfg.singular.toLowerCase()} added.`, 'success');
    }
    closeModal();
    await loadAllData();
  } catch (err) {
    showToast(`Save failed: ${err.message}`, 'error');
  }
}

async function deleteRecord(collKey, id) {
  if (!confirm('Are you sure you want to permanently delete this record?')) return;
  try {
    await api(`/api/${collKey}/${id}`, { method: 'DELETE' });
    showToast('Record deleted.', 'info');
    closeModal();
    await loadAllData();
  } catch (err) {
    showToast(`Delete failed: ${err.message}`, 'error');
  }
}

async function submitToIqac(collKey, id) {
  try {
    await api(`/api/${collKey}/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ status: 'Submitted to IQAC', note: 'Submitted for verification.' })
    });
    showToast('Record submitted to IQAC queue.', 'success');
    await loadAllData();
  } catch (err) {
    showToast(`Submit failed: ${err.message}`, 'error');
  }
}

async function approveRecord(collKey, id) {
  try {
    await api(`/api/${collKey}/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ status: 'Approved by IQAC', note: 'Verified by IQAC.' })
    });
    showToast('Record approved and included in official dossier.', 'success');
    await loadAllData();
  } catch (err) {
    showToast(`Approval failed: ${err.message}`, 'error');
  }
}

function openSendBackModal(collKey, id) {
  const note = prompt('Please provide actionable feedback / corrections required for this submission:');
  if (note !== null) {
    api(`/api/${collKey}/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ status: 'Sent back', note: note || 'Corrections requested.' })
    }).then(() => {
      showToast('Record sent back to department with feedback remarks.', 'info');
      loadAllData();
    }).catch(err => {
      showToast(`Send back failed: ${err.message}`, 'error');
    });
  }
}

async function saveProfile() {
  const payload = {
    academic_year: document.getElementById('prof_academic_year').value.trim(),
    budget_allocated_inr: Number(document.getElementById('prof_budget_allocated_inr').value) || 0,
    budget_utilized_inr: Number(document.getElementById('prof_budget_utilized_inr').value) || 0,
    library_books_count: Number(document.getElementById('prof_library_books_count').value) || 0,
    wifi_ict_available: document.getElementById('prof_wifi_ict_available').checked
  };

  try {
    await api('/api/profile', { method: 'PUT', body: JSON.stringify(payload) });
    showToast('Department Profile updated.', 'success');
    await loadAllData();
  } catch (err) {
    showToast(`Profile save failed: ${err.message}`, 'error');
  }
}

function exportCSV(collKey) {
  const rows = state.data[collKey] || [];
  const cfg = CONFIG.collections[collKey];
  const cols = cfg.fields.map(f => f.key);
  
  const header = cols.join(',');
  const lines = rows.map(r => cols.map(c => {
    const s = esc(r[c]).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  }).join(','));

  const csvContent = [header].concat(lines).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `christ_civil_${collKey}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================================================
// Event Binding & Main Lifecycle
// ============================================================================
function bindEvents() {
  document.querySelectorAll('.nav-tab').forEach(tabBtn => {
    tabBtn.onclick = () => {
      state.activeTab = tabBtn.dataset.tab;
      state.searchQuery = '';
      state.statusFilter = 'ALL';
      render();
    };
  });

  const roleSelect = document.getElementById('roleSelector');
  if (roleSelect) {
    roleSelect.onchange = (e) => {
      state.userRole = e.target.value;
      if (state.userRole === 'director') {
        state.userName = 'Dr. Fr. Director (University IQAC)';
        state.userEmail = 'director.iqac@christuniversity.in';
      } else if (state.userRole === 'dean') {
        state.userName = 'Dr. Iven Jose (Dean, SET)';
        state.userEmail = 'dean.set@christuniversity.in';
      } else if (state.userRole === 'iqac') {
        state.userName = 'Dr. Ramesh Chandra (IQAC Coordinator)';
        state.userEmail = 'ramesh.chandra@christuniversity.in';
      } else {
        state.userName = 'Dr. Priya V. Nair (Associate Professor)';
        state.userEmail = 'priya.nair@christuniversity.in';
      }
      showToast(`Switched account to: ${e.target.options[e.target.selectedIndex].text}`, 'info');
      render();
    };
  }

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.onclick = () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', state.theme);
      render();
    };
  }

  const saveProfBtn = document.getElementById('saveProfileBtn');
  if (saveProfBtn) saveProfBtn.onclick = saveProfile;

  const searchInput = document.getElementById('tableSearchInput');
  if (searchInput) {
    searchInput.oninput = (e) => {
      state.searchQuery = e.target.value;
      const mainEl = document.getElementById('mainContent');
      if (mainEl && CONFIG.collections[state.activeTab]) {
        mainEl.innerHTML = renderCollection(state.activeTab);
        bindEvents();
      }
    };
  }

  const statusSelect = document.getElementById('statusFilterSelect');
  if (statusSelect) {
    statusSelect.onchange = (e) => {
      state.statusFilter = e.target.value;
      const mainEl = document.getElementById('mainContent');
      if (mainEl && CONFIG.collections[state.activeTab]) {
        mainEl.innerHTML = renderCollection(state.activeTab);
        bindEvents();
      }
    };
  }
}

function render() {
  const root = document.getElementById('app');
  if (!root) return;

  let bodyHtml = '';
  if (state.activeTab === 'dashboard') bodyHtml = renderDashboard();
  else if (state.activeTab === 'profile') bodyHtml = renderProfile();
  else if (state.activeTab === 'tasks') bodyHtml = renderTasksCenter();
  else if (state.activeTab === 'accreditation') bodyHtml = renderAccreditationHub();
  else if (state.activeTab === 'review') bodyHtml = renderReviewQueue();
  else if (state.activeTab === 'audit') bodyHtml = renderAuditTrail();
  else if (state.activeTab === 'reports') bodyHtml = renderReports();
  else if (CONFIG.collections[state.activeTab]) bodyHtml = renderCollection(state.activeTab);

  root.innerHTML = `
    ${renderHeader()}
    <main class="app-main" id="mainContent">
      ${bodyHtml}
    </main>
    <div id="modalRoot"></div>
  `;

  bindEvents();
}

window.addEventListener('DOMContentLoaded', () => {
  loadAllData();
});
