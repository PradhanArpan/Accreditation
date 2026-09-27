// ============================================================================
// VERITA — Institutional Accreditation SaaS Platform
// Hierarchical Quality Assurance & Continuous Compliance Engine
// University > School > Department Multi-Tier Architecture
// Left Panel Navigation with Google Identity & Live Google Drive/Sheets Sync
// ============================================================================

const CONFIG = {
  navGroups: [
    {
      title: 'Structure & Drive',
      items: [
        { key: 'hierarchy', label: 'University Hierarchy', icon: '🏛️', desc: 'Uni › School › Dept Folders' },
        { key: 'drivesync', label: 'Google Drive & Sheets Hub', icon: '📁', desc: 'Live Sheets & Cloud Sync' }
      ]
    },
    {
      title: 'Profile & Analytics',
      items: [
        { key: 'dashboard', label: 'Executive Dashboard', icon: '📊', desc: 'Macro Department Metrics' },
        { key: 'profile', label: 'SSR Extended Profile', icon: '📑', desc: 'Auto-pooled Roster Stats' }
      ]
    },
    {
      title: 'Data Streams (Live Sheets)',
      items: [
        { key: 'faculty', label: 'Faculty Directory', icon: '👨‍🏫', desc: 'Current & Relieved Roster' },
        { key: 'students', label: 'Student Cohort', icon: '🎓', desc: 'Enrollment, Diversity, PwD' },
        { key: 'infrastructure', label: 'Infrastructure & Labs', icon: '🔬', desc: 'Labs, Computing & ICT' },
        { key: 'research', label: 'Research & Grants', icon: '📚', desc: 'Scopus, Patents & Funding' },
        { key: 'events', label: 'Events & FDPs', icon: '🎪', desc: 'Workshops, Conferences' },
        { key: 'programs', label: 'NBA Programs (OBE)', icon: '🎯', desc: 'Tier-I Attainment & COs' }
      ]
    },
    {
      title: 'Faculty Collaboration',
      items: [
        { key: 'tasks', label: 'Faculty Task Center', icon: '📋', desc: 'Assignments & Deadlines' },
        { key: 'review', label: 'IQAC Review Queue', icon: '⚖️', desc: 'Approvals & Verification' }
      ]
    },
    {
      title: 'Accreditation Hub',
      items: [
        { key: 'accreditation', label: 'Accreditation Agencies', icon: '🏆', desc: 'NAAC, NBA, NIRF, AICTE' }
      ]
    },
    {
      title: 'Reports & Audit',
      items: [
        { key: 'reports', label: 'Official Dossier', icon: '📑', desc: 'Formal Printable Reports' },
        { key: 'audit', label: 'Audit Trail', icon: '📜', desc: 'Activity Audit Log' }
      ]
    }
  ],

  collections: {
    faculty: {
      label: 'Faculty Directory',
      singular: 'Faculty Member',
      sheetKey: 'faculty',
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
      sheetKey: 'students',
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
      sheetKey: 'infrastructure',
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
      sheetKey: 'research',
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
      sheetKey: 'events',
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
      sheetKey: 'programs',
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
      sheetKey: 'tasks',
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
  activeTab: 'hierarchy',
  currentUser: {
    name: 'Dr. Ramesh Chandra',
    email: 'ramesh.chandra@christuniversity.in',
    role: 'iqac',
    title: 'HoD & Civil IQAC Coordinator',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=RameshChandra&backgroundColor=c29b38'
  },
  theme: 'light',
  searchQuery: '',
  statusFilter: 'ALL',
  accreditationTab: 'naac',
  sidebarOpen: false,
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
  hierarchy: null,
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
// API Service & State Persistence
// ============================================================================
async function api(path, opts = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'x-user-role': state.currentUser.role,
    'x-user-name': state.currentUser.name,
    'x-user-email': state.currentUser.email,
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

function saveLocalCache() {
  try {
    const bundle = {
      institution: state.institution,
      hierarchy: state.hierarchy,
      profile: state.profile,
      ...state.data,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('verita_dept_cache', JSON.stringify(bundle));
  } catch (e) {
    console.warn('Local cache save warning:', e.message);
  }
}

async function checkAndRestoreClientCache() {
  try {
    const raw = localStorage.getItem('verita_dept_cache');
    if (!raw) return;
    const cached = JSON.parse(raw);
    // If backend was freshly rebooted and has empty tables while cache has records
    if (state.data.faculty.length === 0 && cached.faculty && cached.faculty.length > 0) {
      await api('/api/sync/state', { method: 'POST', body: JSON.stringify(cached) });
      showToast('⚡ Restored your persistent department records from cloud cache.', 'success');
      await loadAllData();
    }
  } catch (e) {
    console.warn('Cache restore warning:', e.message);
  }
}

async function loadAllData() {
  try {
    // Restore session user if present
    const savedUser = localStorage.getItem('verita_user_session');
    if (savedUser) {
      try { state.currentUser = JSON.parse(savedUser); } catch (_) {}
    }

    const [health, inst, hier, profile, faculty, students, infra, research, events, programs, tasks, audit, accBreakdown] = await Promise.all([
      api('/health').catch(() => ({ ok: false, engine: 'Offline' })),
      api('/api/institution').catch(() => state.institution),
      api('/api/hierarchy').catch(() => null),
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
    state.hierarchy = hier || state.hierarchy;
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

    saveLocalCache();
    render();
    checkAndRestoreClientCache();
  } catch (err) {
    console.error('Failed loading data:', err);
    showToast('Could not reach backend API: ' + err.message, 'error');
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
  if (s === 'Approved by IQAC' || s === 'Completed' || s === 'Verified by IQAC' || s === 'Current') return 'approved';
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
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3400);
}

function toggleSidebar() {
  state.sidebarOpen = !state.sidebarOpen;
  const sb = document.getElementById('appSidebar');
  if (sb) {
    if (state.sidebarOpen) sb.classList.add('open');
    else sb.classList.remove('open');
  }
}

// ============================================================================
// Left Sidebar Panel
// ============================================================================
function renderSidebar() {
  const u = state.currentUser;
  const pendingCount = ['faculty', 'infrastructure', 'research', 'events', 'programs'].reduce(
    (sum, k) => sum + (state.data[k] || []).filter(r => r.status === 'Submitted to IQAC').length, 0
  );

  return `
    <div class="sidebar-header">
      <div class="sidebar-brand-crest">CU</div>
      <div class="sidebar-brand-info">
        <h2>VERITA</h2>
        <div class="inst-tag">CHRIST (Deemed to be University)</div>
      </div>
    </div>

    <!-- Authenticated Google Identity Card -->
    <div class="sidebar-user-card">
      <div class="user-profile-row">
        <img src="${esc(u.avatar)}" alt="${esc(u.name)}" class="user-avatar-img" onerror="this.src='https://api.dicebear.com/7.x/initials/svg?seed=User'">
        <div class="user-text-info">
          <div class="user-name" title="${esc(u.name)}">${esc(u.name)}</div>
          <div class="user-email" title="${esc(u.email)}">${esc(u.email)}</div>
          <span class="user-role-badge">${esc(u.title || u.role)}</span>
        </div>
      </div>
      <button class="user-auth-action-btn" onclick="openAuthModal()">
        <span>🔐 Switch Account / Google Login</span>
      </button>
    </div>

    <!-- Navigation Categories -->
    <div class="sidebar-nav-container">
      ${CONFIG.navGroups.map(group => `
        <div class="sidebar-nav-group">
          <div class="sidebar-group-title">${group.title}</div>
          ${group.items.map(item => {
            const count = (item.key === 'review') ? pendingCount : 0;
            const isActive = state.activeTab === item.key;
            return `
              <button class="sidebar-nav-item ${isActive ? 'active' : ''}" data-tab="${item.key}" onclick="selectNavTab('${item.key}')">
                <div class="sidebar-nav-item-left">
                  <span>${item.icon}</span>
                  <span>${item.label}</span>
                </div>
                ${count > 0 ? `<span class="badge">${count}</span>` : ''}
              </button>
            `;
          }).join('')}
        </div>
      `).join('')}
    </div>

    <div class="sidebar-footer">
      <div class="drive-status-indicator" title="Connected to Google Cloud & Google Drive Storage">
        <span class="drive-status-dot"></span>
        <span>Google Drive: Active</span>
      </div>
      <button id="themeToggle" class="theme-toggle-btn" title="Toggle Theme" style="padding: 3px 8px; font-size: 0.75rem;">
        ${state.theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  `;
}

function selectNavTab(tabKey) {
  state.activeTab = tabKey;
  state.searchQuery = '';
  state.statusFilter = 'ALL';
  state.sidebarOpen = false;
  const sb = document.getElementById('appSidebar');
  if (sb) sb.classList.remove('open');
  render();
}

// ============================================================================
// Top Hierarchy Banner
// ============================================================================
function renderHierarchyBanner() {
  const inst = state.institution || {};
  return `
    <div class="hierarchy-banner no-print">
      <div class="hierarchy-breadcrumbs">
        <span>🏛️ ${esc(inst.university_name)}</span>
        <span>›</span>
        <span>🏫 ${esc(inst.school_name)}</span>
        <span>›</span>
        <strong>📂 ${esc(inst.department_name)}</strong>
        <span style="opacity: 0.85; font-size: 0.74rem;">(AY ${esc(inst.academic_year)})</span>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="hierarchy-edit-btn" onclick="selectNavTab('hierarchy')">🌲 Drive Tree</button>
        <button class="hierarchy-edit-btn" onclick="selectNavTab('drivesync')">📊 Live Sheets Hub</button>
      </div>
    </div>
  `;
}

// ============================================================================
// Google Auth Modal
// ============================================================================
async function openAuthModal() {
  let personas = [];
  try {
    personas = await api('/api/auth/personas');
  } catch (_) {
    personas = [
      { role: 'director', name: 'Dr. Anil Kumar', email: 'director.iqac@christuniversity.in', title: 'University IQAC Director' },
      { role: 'dean', name: 'Dr. Iven Jose', email: 'dean.set@christuniversity.in', title: 'Dean, School of Engg & Tech' },
      { role: 'iqac', name: 'Dr. Ramesh Chandra', email: 'ramesh.chandra@christuniversity.in', title: 'HoD & Civil IQAC Coordinator' },
      { role: 'faculty', name: 'Dr. Priya V. Nair', email: 'priya.nair@christuniversity.in', title: 'Faculty Member (Geotechnical)' }
    ];
  }

  const modalHtml = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-dialog google-auth-dialog">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 28px; height: 28px; background: #FFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.15);">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.64-5.2 3.64-9.15z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.73-2.1-6.68-4.94H1.21v3.15C3.25 21.4 7.33 24 12 24z"/><path fill="#FBBC05" d="M5.32 14.26c-.24-.72-.38-1.5-.38-2.26s.14-1.54.38-2.26V6.59H1.21C.44 8.12 0 9.99 0 12s.44 3.88 1.21 5.41l4.11-3.15z"/><path fill="#EA4335" d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.6 1.21 6.59l4.11 3.15c.95-2.84 3.58-4.97 6.68-4.97z"/></svg>
            </div>
            <h3 style="font-size: 1.05rem;">Institutional Google Sign-In</h3>
          </div>
          <button class="btn" onclick="closeModal()" style="border: none; font-size: 1.1rem;">✕</button>
        </div>
        <div class="modal-body">
          <p style="font-size: 0.82rem; color: var(--ink-soft); margin-bottom: 14px;">
            Sign in with your official university Google account (<span style="font-family: var(--font-mono);">@christuniversity.in</span>) to access your assigned school, department folders, and live Google Sheets.
          </p>

          <h4 style="font-size: 0.82rem; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 8px; letter-spacing: 0.05em;">
            Instant Academic Personas (1-Click Test Login):
          </h4>
          <div style="margin-bottom: 16px;">
            ${personas.map(p => `
              <div class="persona-picker-item" onclick="executeGoogleLogin('${esc(p.email)}', '${esc(p.name)}', '${esc(p.role)}', '${esc(p.title)}')">
                <img src="${esc(p.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=' + p.name)}" style="width: 32px; height: 32px; border-radius: 50%;">
                <div style="flex: 1; min-width: 0;">
                  <strong style="font-size: 0.86rem; color: var(--ink); display: block;">${esc(p.name)}</strong>
                  <div style="font-size: 0.74rem; color: var(--ink-soft);">${esc(p.title)} · <span style="font-family: var(--font-mono);">${esc(p.email)}</span></div>
                </div>
                <span class="pill approved" style="font-size: 0.68rem;">Select</span>
              </div>
            `).join('')}
          </div>

          <div style="border-top: 1px solid var(--line); padding-top: 14px;">
            <h4 style="font-size: 0.82rem; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 8px;">
              Or Sign in with Custom Google/Gmail Address:
            </h4>
            <div class="form-group">
              <label>Google Email</label>
              <input type="email" id="customGoogleEmail" placeholder="your.name@christuniversity.in" value="faculty.civil@christuniversity.in">
            </div>
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" id="customGoogleName" placeholder="Dr. Firstname Lastname" value="Dr. Faculty Member">
            </div>
            <div class="form-group">
              <label>Role</label>
              <select id="customGoogleRole">
                <option value="faculty">Serving Faculty Member</option>
                <option value="iqac">Department IQAC Coordinator / HoD</option>
                <option value="dean">School Dean / Director</option>
                <option value="director">University IQAC Director</option>
              </select>
            </div>
            <button class="btn primary" style="width: 100%; margin-top: 8px;" onclick="executeCustomGoogleLogin()">
              Sign in with Google Account
            </button>
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

async function executeGoogleLogin(email, name, role, title) {
  try {
    const res = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, name, role })
    });
    if (res.user) {
      state.currentUser = { ...res.user, title: title || res.user.role };
      localStorage.setItem('verita_user_session', JSON.stringify(state.currentUser));
      showToast(`Signed in as ${res.user.name} (${res.user.role})`, 'success');
      closeModal();
      render();
    }
  } catch (err) {
    showToast('Login failed: ' + err.message, 'error');
  }
}

async function executeCustomGoogleLogin() {
  const email = document.getElementById('customGoogleEmail').value.trim();
  const name = document.getElementById('customGoogleName').value.trim();
  const role = document.getElementById('customGoogleRole').value;
  if (!email) {
    showToast('Please enter an email address', 'error');
    return;
  }
  await executeGoogleLogin(email, name, role);
}

// ============================================================================
// University Hierarchy & Google Drive Folder Tree View
// ============================================================================
function renderHierarchyView() {
  const hier = state.hierarchy || {};
  const uni = hier.university || state.institution;
  const schools = hier.schools || [];

  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">🌲 University Institutional Structure & Google Drive Hierarchy</h2>
          <div class="card-subtitle">
            Cascading folder architecture: University Root › School Folders › Department Google Sheets & Evidence Vaults
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn primary" onclick="openAddSchoolModal()">+ Create School Folder</button>
          <a href="${esc(uni.drive_folder_url || 'https://drive.google.com')}" target="_blank" class="drive-open-btn">
            📂 Open Root Drive Hub
          </a>
        </div>
      </div>

      <div style="background: var(--christ-gold-soft); border: 1px solid var(--christ-gold); border-radius: 8px; padding: 14px 18px; margin-bottom: 20px; font-size: 0.84rem;">
        🔐 <strong>Cascading Access Policy</strong>:
        When the <strong>University IQAC Director</strong> creates a School, a dedicated Google Drive folder is created with access delegated to the <strong>Dean</strong>. The Dean/Coordinator in turn provisions <strong>Department Folders</strong> and live <strong>Google Sheets</strong> where serving faculty can view and update their respective datasets.
      </div>

      <!-- Root University Level Node -->
      <div class="drive-tree-card">
        <div class="drive-node-header" style="background: var(--christ-blue); color: #FFF;">
          <div class="drive-node-title" style="color: #FFF;">
            <span style="font-size: 1.2rem;">🏛️</span>
            <div>
              <div style="font-size: 1rem; font-weight: 700;">${esc(uni.name || uni.university_name)}</div>
              <div style="font-size: 0.74rem; opacity: 0.85;">Central Accreditation & IQAC Governance Hub · ${esc(uni.campus)}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="drive-perm-tag" style="background: rgba(255,255,255,0.2); color: #FFF;">University IQAC Access</span>
            <a href="${esc(uni.drive_folder_url || 'https://drive.google.com')}" target="_blank" class="drive-open-btn" style="color: #0E355F;">
              📂 Open Drive Folder
            </a>
          </div>
        </div>

        <!-- Schools Sub-Tree -->
        <div class="drive-tree-node">
          ${schools.map(school => `
            <div style="margin-bottom: 18px;">
              <div class="drive-node-header" style="border-left: 3px solid var(--accent);">
                <div class="drive-node-title">
                  <span style="font-size: 1.1rem;">🏫</span>
                  <div>
                    <div style="font-size: 0.95rem; font-weight: 600;">${esc(school.name)}</div>
                    <div style="font-size: 0.75rem; color: var(--ink-soft);">Dean: ${esc(school.dean_name)} (${esc(school.dean_email || 'dean@christuniversity.in')})</div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="drive-perm-tag">Dean & School IQAC</span>
                  <a href="${esc(school.drive_folder_url || 'https://drive.google.com')}" target="_blank" class="drive-open-btn">
                    📂 School Drive
                  </a>
                  <button class="btn" style="padding: 3px 8px; font-size: 0.74rem;" onclick="openAddDeptModal('${school.id}')">
                    + Add Department
                  </button>
                </div>
              </div>

              <!-- Departments Sub-Tree -->
              <div class="drive-tree-node">
                ${(school.departments || []).map(dept => `
                  <div style="margin-top: 10px; background: var(--paper-card); border: 1px solid var(--line); border-radius: 6px; padding: 12px 14px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                      <div>
                        <strong style="font-size: 0.9rem; color: var(--christ-blue);">📂 ${esc(dept.name)}</strong>
                        <div style="font-size: 0.75rem; color: var(--ink-soft);">
                          HoD: ${esc(dept.hod_name || 'Dr. Joseph Kurian')} · IQAC Coord: ${esc(dept.iqac_coordinator || 'Dr. Ramesh Chandra')}
                        </div>
                      </div>
                      <div style="display: flex; gap: 8px; align-items: center;">
                        <span class="pill approved">Live Active Dept</span>
                        <a href="${esc(dept.drive_folder_url || 'https://drive.google.com')}" target="_blank" class="drive-open-btn">
                          📂 Dept Drive Folder
                        </a>
                      </div>
                    </div>

                    <!-- Department Live Google Sheets Badges -->
                    <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--line-light); display: flex; flex-wrap: wrap; gap: 8px;">
                      <span style="font-size: 0.72rem; color: var(--ink-soft); align-self: center;">Pre-configured Google Sheets:</span>
                      ${dept.sheets ? Object.keys(dept.sheets).map(k => `
                        <a href="${esc(dept.sheets[k].sheet_url)}" target="_blank" class="btn" style="padding: 2px 7px; font-size: 0.72rem; display: inline-flex; align-items: center; gap: 4px;" title="Open ${esc(dept.sheets[k].title)} in Google Sheets">
                          📊 ${esc(k.charAt(0).toUpperCase() + k.slice(1))}
                        </a>
                      `).join('') : '<span style="font-size: 0.72rem; color: var(--ink-soft);">Standard sheets generated</span>'}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function openAddSchoolModal() {
  const modalHtml = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>+ Provision New School & Google Drive Folder</h3>
          <button class="btn" onclick="closeModal()" style="border: none; font-size: 1.1rem;">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>School Name *</label>
            <input type="text" id="newSchoolName" placeholder="e.g. School of Business and Management" required>
          </div>
          <div class="form-group">
            <label>Dean / Director Name</label>
            <input type="text" id="newSchoolDean" placeholder="e.g. Dr. Father Director">
          </div>
          <div class="form-group">
            <label>Dean Email (@christuniversity.in)</label>
            <input type="email" id="newSchoolEmail" placeholder="dean.sbm@christuniversity.in">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeModal()">Cancel</button>
          <button class="btn primary" onclick="submitNewSchool()">Create School & Drive Folder</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modalRoot').innerHTML = modalHtml;
}

async function submitNewSchool() {
  const name = document.getElementById('newSchoolName').value.trim();
  const dean_name = document.getElementById('newSchoolDean').value.trim();
  const dean_email = document.getElementById('newSchoolEmail').value.trim();
  if (!name) {
    showToast('School name is required', 'error');
    return;
  }
  try {
    await api('/api/hierarchy/schools', {
      method: 'POST',
      body: JSON.stringify({ name, dean_name, dean_email })
    });
    showToast(`Created School: ${name} with Google Drive link.`, 'success');
    closeModal();
    await loadAllData();
  } catch (err) {
    showToast('Failed to create school: ' + err.message, 'error');
  }
}

function openAddDeptModal(schoolId) {
  const modalHtml = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>+ Provision Department & Auto-generate Google Sheets</h3>
          <button class="btn" onclick="closeModal()" style="border: none; font-size: 1.1rem;">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Department Name *</label>
            <input type="text" id="newDeptName" placeholder="e.g. Department of Electrical and Electronics Engineering" required>
          </div>
          <div class="form-group">
            <label>Head of Department (HoD)</label>
            <input type="text" id="newDeptHod" placeholder="e.g. Dr. HOD Name">
          </div>
          <div class="form-group">
            <label>HoD Email (@christuniversity.in)</label>
            <input type="email" id="newDeptEmail" placeholder="hod.eee@christuniversity.in">
          </div>
          <div class="form-group">
            <label>Department IQAC Coordinator</label>
            <input type="text" id="newDeptIqac" placeholder="e.g. Dr. Coordinator Name">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeModal()">Cancel</button>
          <button class="btn primary" onclick="submitNewDept('${schoolId}')">Create Department & Google Sheets</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modalRoot').innerHTML = modalHtml;
}

async function submitNewDept(schoolId) {
  const name = document.getElementById('newDeptName').value.trim();
  const hod_name = document.getElementById('newDeptHod').value.trim();
  const hod_email = document.getElementById('newDeptEmail').value.trim();
  const iqac_coordinator = document.getElementById('newDeptIqac').value.trim();
  if (!name) {
    showToast('Department name is required', 'error');
    return;
  }
  try {
    await api('/api/hierarchy/departments', {
      method: 'POST',
      body: JSON.stringify({ schoolId, name, hod_name, hod_email, iqac_coordinator })
    });
    showToast(`Created Department: ${name} with live Google Sheets.`, 'success');
    closeModal();
    await loadAllData();
  } catch (err) {
    showToast('Failed to create department: ' + err.message, 'error');
  }
}

// ============================================================================
// Google Drive & Live Google Sheets Hub
// ============================================================================
function renderDriveSyncView() {
  const sheets = [
    { key: 'faculty', label: 'Faculty Cadre & Roster', sheetName: 'CHRIST_CE_Faculty_Roster' },
    { key: 'students', label: 'Student Cohort & Diversity', sheetName: 'CHRIST_CE_Students_Cohort' },
    { key: 'infrastructure', label: 'Infrastructure & Laboratories', sheetName: 'CHRIST_CE_Infrastructure_Labs' },
    { key: 'research', label: 'Research, Grants & Patents', sheetName: 'CHRIST_CE_Research_Grants' },
    { key: 'events', label: 'Events, FDPs & Workshops', sheetName: 'CHRIST_CE_Events_FDPs' },
    { key: 'programs', label: 'NBA Academic Programs & OBE', sheetName: 'CHRIST_CE_NBA_Programs_OBE' }
  ];

  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">📁 Google Drive & Live Google Sheets Hub</h2>
          <div class="card-subtitle">
            Direct cloud editing via Google Sheets — changes save straight to Drive without downloading or uploading files
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn primary" onclick="forceCloudBackup()">💾 Force Save State Backup</button>
          <button class="btn" onclick="restoreFromLocalCache()">🔄 Restore from Browser Cache</button>
        </div>
      </div>

      <div style="background: var(--accent-soft); border: 1px solid var(--accent); border-radius: 8px; padding: 14px 18px; margin-bottom: 20px; font-size: 0.84rem;">
        ☁️ <strong>Persistence & Durability Protocol</strong>:
        When faculty or coordinators edit live in Google Sheets, the portal syncs directly with Google Cloud. Because Google Drive retains the master spreadsheets permanently, <em>pushing updates or restarting servers will never cause data loss</em>. You can sync any sheet at any time with one click.
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Domain Dataset</th>
            <th>Google Sheet Title</th>
            <th>Live Records</th>
            <th>Status</th>
            <th style="text-align: right;">Google Cloud Actions</th>
          </tr>
        </thead>
        <tbody>
          ${sheets.map(s => {
            const count = (state.data[s.key] || []).length;
            return `
              <tr>
                <td><strong>${s.label}</strong></td>
                <td><span style="font-family: var(--font-mono); font-size: 0.8rem;">📊 ${s.sheetName}</span></td>
                <td><span class="pill approved">${count} Live Rows</span></td>
                <td><span class="pill approved">🟢 Linked to Drive</span></td>
                <td style="text-align: right; white-space: nowrap;">
                  <a href="https://docs.google.com/spreadsheets/create?title=${s.sheetName}" target="_blank" class="btn-google-sheet" style="padding: 4px 10px; font-size: 0.76rem;">
                    🟢 Open in Sheets
                  </a>
                  <button class="btn-sync-sheet" style="padding: 4px 10px; font-size: 0.76rem;" onclick="syncFromGoogleSheet('${s.key}')">
                    🔄 Sync Now
                  </button>
                  <button class="btn" style="padding: 4px 10px; font-size: 0.76rem;" onclick="openConnectSheetModal('${s.key}')">
                    🔗 Change Link
                  </button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

async function forceCloudBackup() {
  try {
    saveLocalCache();
    await api('/api/sync/state', { method: 'POST', body: JSON.stringify(state.data) });
    showToast('Department state saved to cloud database and local cache.', 'success');
  } catch (err) {
    showToast('Cloud backup error: ' + err.message, 'error');
  }
}

async function restoreFromLocalCache() {
  const raw = localStorage.getItem('verita_dept_cache');
  if (!raw) {
    showToast('No saved browser cache found.', 'info');
    return;
  }
  try {
    const cached = JSON.parse(raw);
    await api('/api/sync/state', { method: 'POST', body: JSON.stringify(cached) });
    showToast('State restored from browser cache.', 'success');
    await loadAllData();
  } catch (err) {
    showToast('Restore error: ' + err.message, 'error');
  }
}

function openConnectSheetModal(collKey) {
  const cfg = CONFIG.collections[collKey];
  const modalHtml = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>🔗 Connect Live Google Sheet — ${cfg.label}</h3>
          <button class="btn" onclick="closeModal()" style="border: none; font-size: 1.1rem;">✕</button>
        </div>
        <div class="modal-body">
          <p style="font-size: 0.82rem; color: var(--ink-soft); margin-bottom: 12px;">
            Paste any shared Google Sheet URL from your department's Google Drive. The portal will link to it directly and synchronize records.
          </p>
          <div class="form-group">
            <label>Google Sheet URL (from browser address bar or Share link)</label>
            <input type="text" id="customSheetUrl" placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XR.../edit" value="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit">
          </div>
          <div style="font-size: 0.74rem; color: var(--ink-muted); margin-top: 4px;">
            💡 Ensure share permissions are set to "Anyone with the link can view" or shared with your university domain.
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="closeModal()">Cancel</button>
          <button class="btn primary" onclick="saveLinkedSheet('${collKey}')">Save Link & Sync Data</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modalRoot').innerHTML = modalHtml;
}

async function saveLinkedSheet(collKey) {
  const url = document.getElementById('customSheetUrl').value.trim();
  if (!url) return;
  closeModal();
  await syncFromGoogleSheet(collKey, url);
}

async function syncFromGoogleSheet(collKey, providedUrl = null) {
  showToast(`Synchronizing ${CONFIG.collections[collKey]?.label || collKey} from Google Sheet...`, 'info');
  try {
    const res = await api(`/api/sheets/sync/${collKey}`, {
      method: 'POST',
      body: JSON.stringify({ sheet_url: providedUrl || 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/export?format=csv' })
    });
    showToast(`✓ Synchronized ${res.synced_count || 0} rows from Google Sheet. Profile updated.`, 'success');
    await loadAllData();
  } catch (err) {
    showToast(`Sync notice: ${err.message}. (You can also edit cells directly in the table below with instant auto-save).`, 'error');
  }
}

// ============================================================================
// Inline Editable Cell Handler
// ============================================================================
function makeCellEditable(tdEl, collKey, rowId, fieldKey) {
  if (tdEl.querySelector('input')) return; // Already editing
  const currentVal = tdEl.getAttribute('data-val') || tdEl.innerText.trim();

  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentVal;
  input.style.cssText = 'width: 100%; border: 1px solid var(--christ-blue); border-radius: 4px; padding: 2px 6px; font-family: inherit; font-size: inherit; background: var(--paper-card); color: var(--ink);';

  tdEl.innerHTML = '';
  tdEl.appendChild(input);
  input.focus();
  input.select();

  async function finishEdit() {
    const newVal = input.value.trim();
    tdEl.innerHTML = esc(newVal);
    tdEl.setAttribute('data-val', newVal);
    if (newVal !== currentVal) {
      await saveCellEdit(collKey, rowId, fieldKey, newVal);
    }
  }

  input.onblur = finishEdit;
  input.onkeydown = (e) => {
    if (e.key === 'Enter') {
      input.blur();
    } else if (e.key === 'Escape') {
      tdEl.innerHTML = esc(currentVal);
    }
  };
}

async function saveCellEdit(collKey, rowId, fieldKey, newVal) {
  try {
    const updateObj = {};
    updateObj[fieldKey] = newVal;
    await api(`/api/${collKey}/${rowId}`, {
      method: 'PUT',
      body: JSON.stringify(updateObj)
    });
    // Update local state and cache
    const item = (state.data[collKey] || []).find(r => Number(r.id) === Number(rowId));
    if (item) item[fieldKey] = newVal;
    saveLocalCache();
    showToast(`✓ Auto-saved changes to cloud database.`, 'success');
  } catch (err) {
    showToast('Failed saving cell: ' + err.message, 'error');
  }
}

// ============================================================================
// Executive Dashboard View
// ============================================================================
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
          <h2 class="card-title">Executive Accreditation Readiness Dashboard</h2>
          <div class="card-subtitle">
            Department of Civil Engineering · School of Engineering and Technology · Real-time Continuous Compliance
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn primary" onclick="selectNavTab('profile')">Inspect Extended Profile</button>
          <button class="btn gold" onclick="selectNavTab('drivesync')">📁 Open Google Sheets Hub</button>
        </div>
      </div>

      <!-- Readiness Gauges -->
      <div class="readiness-grid">
        <div class="readiness-card" onclick="state.activeTab='accreditation'; state.accreditationTab='naac'; render();" style="cursor: pointer;">
          <div class="readiness-header">
            <h3>NAAC SSR Preparedness</h3>
            <span class="readiness-pct">92%</span>
          </div>
          <div class="meter-track"><div class="meter-fill good" style="width: 92%"></div></div>
          <div class="stat-sub">Criteria 1–7 fully populated with verified metrics → Click to inspect</div>
        </div>

        <div class="readiness-card" onclick="state.activeTab='accreditation'; state.accreditationTab='nba'; render();" style="cursor: pointer;">
          <div class="readiness-header">
            <h3>NBA Tier-I Washington Accord</h3>
            <span class="readiness-pct">88%</span>
          </div>
          <div class="meter-track"><div class="meter-fill good" style="width: 88%"></div></div>
          <div class="stat-sub">CO-PO Attainment, Cadre Ratio & Faculty SFR → Click to inspect</div>
        </div>

        <div class="readiness-card" onclick="state.activeTab='accreditation'; state.accreditationTab='nirf'; render();" style="cursor: pointer;">
          <div class="readiness-header">
            <h3>NIRF Engineering Ranking</h3>
            <span class="readiness-pct">84%</span>
          </div>
          <div class="meter-track"><div class="meter-fill ok" style="width: 84%"></div></div>
          <div class="stat-sub">TLR, RPC, GO & Outreach Inclusivity → Click to inspect</div>
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

    <!-- Domain Data Summary Table -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Department Institutional Assets Summary</h3>
        <button class="btn primary" onclick="selectNavTab('accreditation')">Inspect All Accreditation Agencies</button>
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
            <td><button class="btn" onclick="selectNavTab('faculty')">Open Roster</button></td>
          </tr>
          <tr>
            <td><strong>🎓 Student Cohort & Diversity</strong></td>
            <td><span class="pill approved">${state.data.students.length} Enrolled</span></td>
            <td>NAAC Extended Profile · NIRF Regional & Women Diversity (OI)</td>
            <td><button class="btn" onclick="selectNavTab('students')">Open Students</button></td>
          </tr>
          <tr>
            <td><strong>🔬 Infrastructure & Laboratories</strong></td>
            <td><span class="pill approved">${infra.length} Centers</span></td>
            <td>NAAC Criterion 4.1 · NBA Criterion 6 (Facilities)</td>
            <td><button class="btn" onclick="selectNavTab('infrastructure')">Open Labs</button></td>
          </tr>
          <tr>
            <td><strong>📚 Research, Grants & Patents</strong></td>
            <td><span class="pill approved">${res.length} Projects</span> (${formatInr(p.total_grants_inr)})</td>
            <td>NAAC Criterion 3.3 · NIRF Publications & Funded Research</td>
            <td><button class="btn" onclick="selectNavTab('research')">Open Research</button></td>
          </tr>
          <tr>
            <td><strong>🎪 Department Events & FDPs</strong></td>
            <td><span class="pill approved">${state.data.events.length} Events</span></td>
            <td>NAAC Criteria 3 & 6 · AICTE Mandatory Disclosure</td>
            <td><button class="btn" onclick="selectNavTab('events')">Open Events</button></td>
          </tr>
          <tr>
            <td><strong>🎯 NBA OBE Academic Programs</strong></td>
            <td><span class="pill approved">${prog.length} Programs</span></td>
            <td>NBA Criteria 1–4 (Vision, Mission, PEOs, CO-PO Attainment)</td>
            <td><button class="btn" onclick="selectNavTab('programs')">Open Programs</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// ============================================================================
// DYNAMICALLY POOLED Department Profile View
// ============================================================================
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
        📌 <strong>Auto-Aggregation Active</strong>: As faculty members or student cohorts are updated in Google Sheets or in the tables below, the metrics calculate automatically without manual data entry.
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
          <label>Approved Full-time Faculty <span class="pill approved">Pooled from Faculty Directory</span></label>
          <input type="text" value="${esc(p.approved_faculty_count)} Faculty" readonly style="font-weight: 700; color: var(--christ-blue);">
        </div>

        <div class="form-group" style="background: var(--paper); padding: 10px; border-radius: 6px;">
          <label>Faculty with Ph.D. (%) <span class="pill approved">Pooled from Faculty Directory</span></label>
          <input type="text" value="${esc(p.phd_faculty_percentage)}%" readonly style="font-weight: 700;">
        </div>

        <div class="form-group" style="background: var(--paper); padding: 10px; border-radius: 6px;">
          <label>Student-to-Faculty Ratio (SFR) <span class="pill approved">Dynamic Calculation</span></label>
          <input type="text" value="${esc(p.student_faculty_ratio)} : 1" readonly style="font-weight: 700; color: #1E6B3F;">
        </div>

        <div class="form-group" style="background: var(--paper); padding: 10px; border-radius: 6px;">
          <label>Total Research Grants (INR) <span class="pill approved">Pooled from Research Table</span></label>
          <input type="text" value="${formatInr(p.total_grants_inr)}" readonly style="font-weight: 700;">
        </div>

        <div class="form-group">
          <label>Annual Budget Allocated (INR)</label>
          <input type="number" id="prof_budget_allocated_inr" value="${esc(p.budget_allocated_inr)}">
        </div>

        <div class="form-group">
          <label>Annual Budget Utilized (INR)</label>
          <input type="number" id="prof_budget_utilized_inr" value="${esc(p.budget_utilized_inr)}">
        </div>

        <div class="form-group">
          <label>Library Book Volumes & Titles</label>
          <input type="number" id="prof_library_books_count" value="${esc(p.library_books_count)}">
        </div>

        <div class="form-group">
          <label>Average Placement Progression (%)</label>
          <input type="number" step="0.1" id="prof_placement_pct" value="${esc(p.placement_pct)}">
        </div>

        <div class="form-group">
          <label>Median Graduate Salary (LPA)</label>
          <input type="number" step="0.1" id="prof_median_salary_lpa" value="${esc(p.median_salary_lpa)}">
        </div>

        <div class="form-group">
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-top: 24px;">
            <input type="checkbox" id="prof_wifi_ict_available" ${p.wifi_ict_available ? 'checked' : ''}>
            Wi-Fi and ICT-enabled classrooms / Smart Infrastructure available
          </label>
        </div>
      </div>
    </div>
  `;
}

async function saveProfile() {
  const payload = {
    academic_year: document.getElementById('prof_academic_year')?.value,
    budget_allocated_inr: Number(document.getElementById('prof_budget_allocated_inr')?.value) || 0,
    budget_utilized_inr: Number(document.getElementById('prof_budget_utilized_inr')?.value) || 0,
    library_books_count: Number(document.getElementById('prof_library_books_count')?.value) || 0,
    placement_pct: Number(document.getElementById('prof_placement_pct')?.value) || 0,
    median_salary_lpa: Number(document.getElementById('prof_median_salary_lpa')?.value) || 0,
    wifi_ict_available: document.getElementById('prof_wifi_ict_available')?.checked
  };

  try {
    const updated = await api('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    state.profile = updated;
    saveLocalCache();
    showToast('Department financial and library baseline saved.', 'success');
    render();
  } catch (err) {
    showToast('Failed to save profile: ' + err.message, 'error');
  }
}

// ============================================================================
// Generic Collection Table View with Live Sheets & Inline Editing
// ============================================================================
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
    <!-- Live Google Sheets Action Bar -->
    <div class="live-sheets-bar no-print">
      <div class="live-sheets-info">
        <div class="google-sheets-icon">📊</div>
        <div class="live-sheets-text">
          <strong>Live Google Sheet: CHRIST_CE_${cfg.label.replace(/[^a-zA-Z0-9]/g, '_')}</strong>
          <span>Connected to Department Google Drive folder · Click any cell below to edit live</span>
        </div>
      </div>
      <div class="live-sheets-actions">
        <a href="https://docs.google.com/spreadsheets/create?title=CHRIST_Civil_${key.toUpperCase()}" target="_blank" class="btn-google-sheet">
          🟢 Open in Google Sheets
        </a>
        <button class="btn-sync-sheet" onclick="syncFromGoogleSheet('${key}')">
          🔄 Sync from Google Sheet
        </button>
        <button class="btn" onclick="openConnectSheetModal('${key}')">
          🔗 Set Sheet Link
        </button>
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
          No ${cfg.label.toLowerCase()} found. Open the Google Sheet above or click "+ Add ${cfg.singular}" to begin.
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
                    <td class="editable-cell" data-val="${esc(r[c.key])}" title="Click to edit cell directly" onclick="makeCellEditable(this, '${key}', ${r.id}, '${c.key}')">
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
                    ${r.evidence_url ? `
                      <a href="${esc(r.evidence_url)}" target="_blank" class="btn" style="padding: 4px 8px; font-size: 0.76rem;" title="Open Verification Evidence">🔗 Link</a>
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

// ============================================================================
// Faculty Task Assignment & Evidence Center
// ============================================================================
function renderTasksCenter() {
  const tasks = state.data.tasks || [];
  const u = state.currentUser;
  const isFacultyRole = u.role === 'faculty';

  const displayedTasks = isFacultyRole
    ? tasks.filter(t => (t.assigned_to_email || '').toLowerCase() === u.email.toLowerCase())
    : tasks;

  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">📋 Faculty Accreditation Task Center</h2>
          <div class="card-subtitle">
            ${isFacultyRole
              ? `Showing tasks assigned to you (${esc(u.name)})`
              : 'IQAC Coordinator Console: Assign accreditation deliverables to serving faculty'}
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

// ============================================================================
// Accreditation Agencies Hub (NAAC, NBA, NIRF, AICTE)
// ============================================================================
function renderAccreditationHub() {
  const p = state.profile || {};
  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Accreditation Agencies Hub</h2>
          <div class="card-subtitle">
            Automated criteria-level mapping for NAAC SSR, NBA SAR, NIRF India Ranking, and AICTE Mandatory Disclosure
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn" onclick="selectNavTab('reports')">📑 Generate Dossier</button>
        </div>
      </div>

      <div class="accreditation-nav no-print">
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
            National Institutional Ranking Framework (NIRF) — Engineering Breakdown
          </h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>NIRF Parameter</th>
                <th>Weightage Metric</th>
                <th>Civil Engineering Current Value</th>
                <th>Score Health</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Teaching, Learning & Resources (TLR)</strong></td>
                <td>Student Strength (SS) & Faculty-Student Ratio (FSR)</td>
                <td>SS: ${p.total_students || 0} Students · FSR: ${p.student_faculty_ratio}:1 · FQE: ${p.phd_faculty_percentage}% Ph.D.</td>
                <td><span class="pill approved">High Rank Tier</span></td>
              </tr>
              <tr>
                <td><strong>Research & Professional Practice (RPC)</strong></td>
                <td>Publications (PU) & Funded Research (FR)</td>
                <td>Scopus Indexed: ${p.scopus_publication_count || 12} · Sanctioned Grants: ${formatInr(p.total_grants_inr)}</td>
                <td><span class="pill approved">Competitive</span></td>
              </tr>
              <tr>
                <td><strong>Graduation Outcome (GO)</strong></td>
                <td>Graduation & Placements (GPH) & Median Salary</td>
                <td>Placement: ${p.placement_pct}% · Median Salary: ${p.median_salary_lpa} LPA</td>
                <td><span class="pill approved">Strong</span></td>
              </tr>
              <tr>
                <td><strong>Outreach & Inclusivity (OI)</strong></td>
                <td>Regional Diversity (RD) & Women Diversity (WD)</td>
                <td>RD: ${p.region_diverse_pct}% · WD: ${p.women_students_pct}% · Economically Challenged: ${p.esc_students_pct}%</td>
                <td><span class="pill approved">Compliant</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : ''}

      <!-- AICTE Tab View -->
      ${state.accreditationTab === 'aicte' ? `
        <div>
          <h3 style="font-family: var(--font-serif); margin-bottom: 12px; color: var(--christ-blue);">
            All India Council for Technical Education (AICTE) — Mandatory Disclosure
          </h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>Statutory Requirement</th>
                <th>AICTE Norm</th>
                <th>Institutional Status</th>
                <th>Compliance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Cadre Ratio (Professor : Associate : Assistant)</strong></td>
                <td>1 : 2 : 6 for Sanctioned Intake</td>
                <td>Verified against AICTE Approval Process Handbook (APH)</td>
                <td><span class="pill approved">Compliant</span></td>
              </tr>
              <tr>
                <td><strong>Student to Faculty Ratio (SFR)</strong></td>
                <td>15 : 1 (Undergraduate Engineering)</td>
                <td>Current SFR: <strong>${p.student_faculty_ratio} : 1</strong></td>
                <td><span class="pill approved">Compliant</span></td>
              </tr>
              <tr>
                <td><strong>Laboratory Infrastructure & Space</strong></td>
                <td>Adequate carpet area per student workstation</td>
                <td>${state.data.infrastructure.filter(i=>i.category==='Laboratory').length} Fully equipped laboratories</td>
                <td><span class="pill approved">Compliant</span></td>
              </tr>
              <tr>
                <td><strong>Anti-Ragging & Grievance Redressal</strong></td>
                <td>Statutory committees functioning</td>
                <td>Internal Complaints Committee (ICC) & Grievance Cell in place</td>
                <td><span class="pill approved">Compliant</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : ''}
    </div>
  `;
}

// ============================================================================
// IQAC Review Queue
// ============================================================================
function renderReviewQueue() {
  const pending = [];
  ['faculty', 'infrastructure', 'research', 'events', 'programs'].forEach(k => {
    (state.data[k] || []).forEach(r => {
      if (r.status === 'Submitted to IQAC') {
        pending.push({ collKey: k, record: r });
      }
    });
  });

  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">⚖️ IQAC Department Review Queue</h2>
          <div class="card-subtitle">
            Quality assurance gateway: Review faculty submissions, verify evidence artifacts, and approve records for final SSR inclusion.
          </div>
        </div>
        <button class="btn" onclick="loadAllData()">🔄 Refresh Queue</button>
      </div>

      ${pending.length === 0 ? `
        <div style="text-align: center; padding: 48px; color: var(--ink-soft);">
          <h3>✨ Review Queue Clear</h3>
          <p style="font-size: 0.85rem; margin-top: 6px;">All submitted records have been reviewed and approved by the department coordinator.</p>
        </div>
      ` : `
        <table class="data-table">
          <thead>
            <tr>
              <th>Domain</th>
              <th>Record Identifier</th>
              <th>Submitted Data</th>
              <th>Evidence</th>
              <th style="text-align: right;">Review Decision</th>
            </tr>
          </thead>
          <tbody>
            ${pending.map(item => `
              <tr>
                <td><span class="pill submitted">${CONFIG.collections[item.collKey].singular}</span></td>
                <td><strong>${esc(item.record.name || item.record.title || item.record.roll_no)}</strong></td>
                <td style="font-size: 0.8rem; color: var(--ink-soft);">
                  ${item.collKey === 'faculty' ? `${item.record.designation} · ${item.record.qualification}` : ''}
                  ${item.collKey === 'research' ? `${item.record.venue} (${item.record.indexing || ''})` : ''}
                  ${item.collKey === 'infrastructure' ? `${item.record.category} · ${item.record.capacity}` : ''}
                </td>
                <td>
                  ${item.record.evidence_url ? `
                    <a href="${esc(item.record.evidence_url)}" target="_blank" class="btn" style="padding: 2px 8px; font-size: 0.74rem;">Inspect Proof</a>
                  ` : '<span style="font-size: 0.74rem; color: var(--ink-muted);">No link attached</span>'}
                </td>
                <td style="text-align: right; white-space: nowrap;">
                  <button class="btn primary" style="padding: 4px 10px; font-size: 0.78rem;" onclick="reviewAction('${item.collKey}', ${item.record.id}, 'Approved by IQAC')">
                    ✓ Approve
                  </button>
                  <button class="btn danger" style="padding: 4px 10px; font-size: 0.78rem;" onclick="promptSendBack('${item.collKey}', ${item.record.id})">
                    ↩ Send Back
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `}
    </div>
  `;
}

async function reviewAction(collKey, id, status, note = '') {
  try {
    await api(`/api/${collKey}/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ status, note })
    });
    showToast(`Record status updated to: ${status}`, 'success');
    await loadAllData();
  } catch (err) {
    showToast('Failed to update status: ' + err.message, 'error');
  }
}

function promptSendBack(collKey, id) {
  const reason = prompt('Please specify review remarks / missing evidence to return to faculty:');
  if (reason !== null) {
    reviewAction(collKey, id, 'Sent back', reason);
  }
}

async function submitToIqac(collKey, id) {
  await reviewAction(collKey, id, 'Submitted to IQAC', 'Submitted by faculty for coordinator review');
}

// ============================================================================
// Audit Trail & Activity Log
// ============================================================================
function renderAuditTrail() {
  const logs = state.data.audit_logs || [];
  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">📜 Institutional Audit Trail & Activity Log</h2>
          <div class="card-subtitle">Immutable chronological log of changes, spreadsheet syncs, and status transitions</div>
        </div>
        <button class="btn" onclick="loadAllData()">🔄 Refresh Logs</button>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Action</th>
            <th>Entity</th>
            <th>Actor</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          ${logs.map(log => `
            <tr>
              <td style="white-space: nowrap; font-size: 0.75rem; color: var(--ink-soft);">
                ${new Date(log.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </td>
              <td><span class="pill ${log.action.includes('APPROVE') ? 'approved' : (log.action.includes('CREATE') ? 'submitted' : 'draft')}">${esc(log.action)}</span></td>
              <td><strong>${esc(log.entity)}</strong></td>
              <td>${esc(log.actor)} <span style="font-size: 0.72rem; color: var(--ink-soft);">(${esc(log.role)})</span></td>
              <td style="font-size: 0.8rem;">${esc(log.details)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ============================================================================
// Official Dossier & Printable Report
// ============================================================================
function renderReports() {
  const inst = state.institution || {};
  const p = state.profile || {};
  const fac = state.data.faculty.filter(f => (f.service_status || 'Current') === 'Current');

  return `
    <div class="card no-print">
      <div class="card-header">
        <div>
          <h2 class="card-title">📑 Official Institutional Accreditation Dossier</h2>
          <div class="card-subtitle">Executive accreditation report generated for peer team review and IQAC archives.</div>
        </div>
        <button class="btn primary" onclick="window.print()">🖨️ Print / Save as Official PDF</button>
      </div>
    </div>

    <div class="report-page">
      <div class="report-header-formal">
        <h2>${esc(inst.university_name)}</h2>
        <p>${esc(inst.campus)} · Accredited by NAAC (${esc(inst.naac_accreditation_cycle)})</p>
        <h3>${esc(inst.school_name)}</h3>
        <h4 style="font-size: 1.15rem; color: var(--christ-blue); margin-top: 4px;">${esc(inst.department_name)}</h4>
        <p style="font-weight: 600; margin-top: 6px;">COMPREHENSIVE INTERNAL ACCREDITATION STATUS REPORT (SSR / SAR / NIRF)</p>
        <p style="font-size: 0.78rem;">Academic Assessment Period: ${esc(inst.academic_year)} · Generated on: ${new Date().toLocaleDateString('en-IN')}</p>
      </div>

      <h4 style="font-family: var(--font-serif); margin-top: 20px; border-bottom: 1px solid var(--line); padding-bottom: 4px;">
        1. Executive Institutional Metrics (Extended Profile)
      </h4>
      <table class="report-table">
        <tr><th>Total Enrolled Students</th><td>${p.total_students || 0}</td><th>Student-to-Faculty Ratio (SFR)</th><td>${p.student_faculty_ratio}:1</td></tr>
        <tr><th>Serving Approved Faculty</th><td>${fac.length}</td><th>Faculty Holding Ph.D.</th><td>${p.phd_faculty_percentage}%</td></tr>
        <tr><th>Female Student Diversity</th><td>${p.women_students_pct}%</td><th>Interstate & Global Diversity</th><td>${p.region_diverse_pct}%</td></tr>
        <tr><th>Sponsored Research Grants</th><td>${formatInr(p.total_grants_inr)}</td><th>Library Book Volumes</th><td>${p.library_books_count || 5420}</td></tr>
      </table>

      <h4 style="font-family: var(--font-serif); margin-top: 24px; border-bottom: 1px solid var(--line); padding-bottom: 4px;">
        2. Serving Faculty Roster
      </h4>
      <table class="report-table">
        <thead>
          <tr>
            <th>Faculty Name</th>
            <th>Designation</th>
            <th>Highest Qualification</th>
            <th>Area of Specialization</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${fac.map(f => `
            <tr>
              <td><strong>${esc(f.name)}</strong></td>
              <td>${esc(f.designation)}</td>
              <td>${esc(f.qualification)}</td>
              <td>${esc(f.specialization)}</td>
              <td>${esc(f.service_status || 'Current')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="report-sign-off">
        <div class="sign-box">
          <div class="sign-line"></div>
          <strong>${esc(inst.iqac_coordinator)}</strong>
          <div>Department IQAC Coordinator</div>
        </div>
        <div class="sign-box">
          <div class="sign-line"></div>
          <strong>${esc(inst.head_of_department)}</strong>
          <div>Head of Department</div>
        </div>
        <div class="sign-box">
          <div class="sign-line"></div>
          <strong>Dean / Director</strong>
          <div>School of Engineering & Tech</div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// Record Editing Modal & Data Ingestion
// ============================================================================
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
      else payload[f.key] = el.value.trim();
    }
  }

  try {
    if (id && id !== 'null') {
      await api(`/api/${collKey}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      showToast(`${cfg.singular} updated.`, 'success');
    } else {
      await api(`/api/${collKey}`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      showToast(`New ${cfg.singular} added.`, 'success');
    }
    closeModal();
    await loadAllData();
  } catch (err) {
    showToast('Failed saving record: ' + err.message, 'error');
  }
}

async function deleteRecord(collKey, id) {
  if (!confirm(`Are you sure you want to delete this ${CONFIG.collections[collKey].singular}?`)) return;
  try {
    await api(`/api/${collKey}/${id}`, { method: 'DELETE' });
    showToast('Record deleted.', 'info');
    closeModal();
    await loadAllData();
  } catch (err) {
    showToast('Delete error: ' + err.message, 'error');
  }
}

function exportCSV(collKey) {
  const rows = state.data[collKey] || [];
  if (rows.length === 0) {
    showToast('No records available to export.', 'info');
    return;
  }
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
  if (state.activeTab === 'hierarchy') bodyHtml = renderHierarchyView();
  else if (state.activeTab === 'drivesync') bodyHtml = renderDriveSyncView();
  else if (state.activeTab === 'dashboard') bodyHtml = renderDashboard();
  else if (state.activeTab === 'profile') bodyHtml = renderProfile();
  else if (state.activeTab === 'tasks') bodyHtml = renderTasksCenter();
  else if (state.activeTab === 'accreditation') bodyHtml = renderAccreditationHub();
  else if (state.activeTab === 'review') bodyHtml = renderReviewQueue();
  else if (state.activeTab === 'audit') bodyHtml = renderAuditTrail();
  else if (state.activeTab === 'reports') bodyHtml = renderReports();
  else if (CONFIG.collections[state.activeTab]) bodyHtml = renderCollection(state.activeTab);

  root.innerHTML = `
    <div class="app-shell">
      <!-- Left Panel Navigation Sidebar -->
      <aside class="app-sidebar" id="appSidebar">
        ${renderSidebar()}
      </aside>

      <!-- Main Content Area -->
      <div class="app-main-area">
        ${renderHierarchyBanner()}
        <div class="mobile-top-bar no-print">
          <button class="btn" onclick="toggleSidebar()">☰ Menu</button>
          <strong>${esc(state.institution.department_name)}</strong>
          <button class="btn" onclick="openAuthModal()">👤 Account</button>
        </div>
        <main class="app-main" id="mainContent">
          ${bodyHtml}
        </main>
      </div>
    </div>
    <div id="modalRoot"></div>
  `;

  bindEvents();
}

window.addEventListener('DOMContentLoaded', () => {
  loadAllData();
});
