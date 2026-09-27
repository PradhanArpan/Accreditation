// ============================================================================
// VERITA — Civil Engineering Accreditation Portal Application Controller
// Department of Civil Engineering · CHRIST (Deemed to be University)
// ============================================================================

const CONFIG = {
  tabs: [
    { key: 'dashboard', label: 'Executive Dashboard', icon: '📊' },
    { key: 'profile', label: 'Dept. Profile & SSR', icon: '🏛️' },
    { key: 'faculty', label: 'Faculty Directory', icon: '👨‍🏫' },
    { key: 'infrastructure', label: 'Infrastructure & Labs', icon: '🔬' },
    { key: 'research', label: 'Research & Grants', icon: '📚' },
    { key: 'programs', label: 'NBA Programs (OBE)', icon: '🎯' },
    { key: 'review', label: 'IQAC Review Queue', icon: '⚖️' },
    { key: 'audit', label: 'Audit Trail', icon: '📜' },
    { key: 'reports', label: 'Formal Reports & Dossier', icon: '📑' },
  ],

  collections: {
    faculty: {
      label: 'Faculty Members',
      singular: 'Faculty Member',
      consumers: 'NAAC SSR (Criterion 2) · NBA SAR (Criterion 5) · NIRF (TLR/FQE/FSR) · AICTE Mandatory Disclosure',
      fields: [
        { key: 'name', label: 'Full Name (with Title)', type: 'text', req: true, placeholder: 'e.g. Dr. Ramesh Chandra' },
        { key: 'designation', label: 'Designation', type: 'select', options: ['Professor', 'Associate Professor', 'Assistant Professor', 'Adjunct / Visiting Professor'] },
        { key: 'qualification', label: 'Highest Qualification', type: 'select', options: ['Ph.D.', 'M.Tech / M.E.', 'M.Sc.', 'B.Tech / B.E.', 'Other'] },
        { key: 'specialization', label: 'Area of Specialization', type: 'text', placeholder: 'e.g. Structural Dynamics & Earthquake Engg' },
        { key: 'experience_years', label: 'Total Teaching / Industry Experience (Years)', type: 'number' },
        { key: 'employment_type', label: 'Employment Cadre / Type', type: 'select', options: ['Regular', 'Contract', 'Adjunct'] },
        { key: 'publications_3yr', label: 'Indexed Publications (Last 3 Years)', type: 'number' },
        { key: 'patents', label: 'Patents / IPR Filed / Granted', type: 'number' },
        { key: 'evidence_url', label: 'Profile / ORCID / Scholar URL', type: 'text', placeholder: 'https://orcid.org/0000-...' },
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
        { key: 'evidence_note', label: 'NABL / AMC / Calibration Reference', type: 'text', placeholder: 'e.g. Calibration certificate ref #2026/CE/CAL/09' },
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
    }
  },

  profileFields: [
    { key: 'academic_year', label: 'Academic Year', type: 'text', placeholder: '2026-27' },
    { key: 'total_students', label: 'Total Enrolled Civil Engg Students', type: 'number' },
    { key: 'women_students_pct', label: 'Female Student Enrollment (%)', type: 'number' },
    { key: 'region_diverse_pct', label: 'Interstate & International Diversity (%)', type: 'number' },
    { key: 'esc_students_pct', label: 'Economically / Socially Challenged Students (%)', type: 'number' },
    { key: 'pwd_facilities', label: 'Full Facilities for Divyangjan (PwD)', type: 'checkbox' },
    { key: 'placement_pct', label: 'Graduation Placement Rate (%)', type: 'number' },
    { key: 'median_salary_lpa', label: 'Median Placement Package (LPA in Lakhs)', type: 'number' },
    { key: 'higher_studies_pct', label: 'Higher Studies & Competitive Exams (%)', type: 'number' },
    { key: 'budget_allocated_inr', label: 'Annual Department Budget Allocated (INR)', type: 'number' },
    { key: 'budget_utilized_inr', label: 'Annual Department Budget Utilized (INR)', type: 'number' },
    { key: 'library_books_count', label: 'Department Library Titles / Accessions', type: 'number' },
    { key: 'wifi_ict_available', label: 'High-Speed Wi-Fi & Smart ICT in all Classrooms', type: 'checkbox' },
  ]
};

// Global App State
const state = {
  activeTab: 'dashboard',
  userRole: 'staff', // 'staff', 'iqac', 'admin'
  userName: 'Faculty / Staff Member',
  theme: 'light',
  searchQuery: '',
  statusFilter: 'ALL',
  data: {
    faculty: [],
    infrastructure: [],
    research: [],
    programs: [],
    audit_logs: []
  },
  profile: {},
  analytics: {},
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
    const [health, profile, faculty, infra, research, programs, audit, analytics] = await Promise.all([
      api('/health').catch(() => ({ ok: false, engine: 'Offline' })),
      api('/api/profile').catch(() => ({})),
      api('/api/faculty').catch(() => []),
      api('/api/infrastructure').catch(() => []),
      api('/api/research').catch(() => []),
      api('/api/programs').catch(() => []),
      api('/api/audit').catch(() => []),
      api('/api/analytics').catch(() => ({}))
    ]);

    state.systemStatus = health;
    state.profile = profile || {};
    state.data.faculty = faculty || [];
    state.data.infrastructure = infra || [];
    state.data.research = research || [];
    state.data.programs = programs || [];
    state.data.audit_logs = audit || [];
    state.analytics = analytics || {};

    render();
  } catch (err) {
    console.error('Failed loading data:', err);
    showToast('Could not reach backend API. Check server status.', 'error');
  }
}

// ============================================================================
// Helpers & Utilities
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
  if (s === 'Approved by IQAC') return 'approved';
  if (s === 'Submitted to IQAC') return 'submitted';
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
    background: ${type === 'error' ? '#B93826' : (type === 'success' ? '#237A47' : '#1C2B45')};
    color: #FFF; padding: 12px 20px; border-radius: 8px; font-size: 0.86rem;
    box-shadow: 0 4px 14px rgba(0,0,0,0.2); transition: opacity 0.3s;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3200);
}

// ============================================================================
// UI Renderers
// ============================================================================
function renderHeader() {
  const pendingCount = ['faculty', 'infrastructure', 'research', 'programs'].reduce(
    (sum, k) => sum + state.data[k].filter(r => r.status === 'Submitted to IQAC').length, 0
  );

  return `
    <header class="app-header">
      <div class="header-top">
        <div class="brand-section">
          <div class="brand-crest">CU</div>
          <div class="brand-titles">
            <h1>VERITA — Civil Engineering Accreditation Portal</h1>
            <div class="dept-sub">Dept. of Civil Engineering · School of Engineering & Technology · CHRIST (Deemed to be University)</div>
          </div>
        </div>

        <div class="header-controls no-print">
          <div class="role-badge-wrapper">
            <label for="roleSelector">Role:</label>
            <select id="roleSelector" class="role-select">
              <option value="staff" ${state.userRole === 'staff' ? 'selected' : ''}>Faculty / Department Staff</option>
              <option value="iqac" ${state.userRole === 'iqac' ? 'selected' : ''}>IQAC Reviewer / HoD</option>
              <option value="admin" ${state.userRole === 'admin' ? 'selected' : ''}>Accreditation Lead / Admin</option>
            </select>
          </div>

          <button id="themeToggle" class="theme-toggle-btn" title="Toggle Light / Dark theme">
            ${state.theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>

          <a href="/api/export-all" class="btn" title="Download Complete Backup" download>
            💾 Backup JSON
          </a>
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
  const fac = state.data.faculty.filter(f => f.status === 'Approved by IQAC');
  const infra = state.data.infrastructure.filter(i => i.status === 'Approved by IQAC');
  const res = state.data.research.filter(r => r.status === 'Approved by IQAC');
  const prog = state.data.programs.filter(pr => pr.status === 'Approved by IQAC');

  // Compute live scores
  let naacScore = 0;
  if (p.academic_year) naacScore += 15;
  if (p.total_students > 0) naacScore += 15;
  if (fac.length >= 5) naacScore += 25;
  if (infra.length >= 3) naacScore += 20;
  if (res.length >= 2) naacScore += 25;

  let nbaScore = 0;
  if (prog.length > 0) nbaScore += 30;
  if (prog.some(pr => pr.attainment_pct >= 75)) nbaScore += 30;
  if (fac.length > 0) nbaScore += 20;
  if (infra.some(i => i.category === 'Laboratory')) nbaScore += 20;

  let nirfScore = 0;
  if (p.placement_pct > 70) nirfScore += 25;
  if (p.median_salary_lpa > 5) nirfScore += 25;
  if (res.some(r => r.indexing === 'Scopus')) nirfScore += 25;
  if (p.women_students_pct > 25) nirfScore += 25;

  let aicteScore = 0;
  if (fac.length > 0) aicteScore += 30;
  if (infra.length > 0) aicteScore += 30;
  if (p.budget_allocated_inr > 0) aicteScore += 40;

  const totalStudents = Number(p.total_students) || 0;
  const sfr = fac.length > 0 ? (totalStudents / fac.length).toFixed(1) : '—';
  const phdFacCount = fac.filter(f => f.qualification === 'Ph.D.').length;
  const phdPct = fac.length > 0 ? Math.round((phdFacCount / fac.length) * 100) : 0;

  const pendingReview = ['faculty', 'infrastructure', 'research', 'programs'].reduce(
    (s, k) => s + state.data[k].filter(r => r.status === 'Submitted to IQAC').length, 0
  );

  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Institutional Accreditation Health & Readiness Index</h2>
          <div class="card-subtitle">Continuous OBE & Compliance Radar for Academic Year ${esc(p.academic_year || '2026-27')}</div>
        </div>
        <div>
          <span class="pill approved">Engine: ${state.systemStatus.engine}</span>
        </div>
      </div>

      <div class="readiness-grid">
        <div class="readiness-card">
          <div class="readiness-header">
            <h3>NAAC SSR Readiness</h3>
            <span class="readiness-pct">${naacScore}%</span>
          </div>
          <div class="meter-track"><div class="meter-fill ${naacScore >= 75 ? 'good' : 'warning'}" style="width: ${naacScore}%"></div></div>
          <div class="stat-sub">Criteria 1-7 Quality Indicators & Metric Evidences</div>
        </div>

        <div class="readiness-card">
          <div class="readiness-header">
            <h3>NBA SAR (Tier-I OBE)</h3>
            <span class="readiness-pct">${nbaScore}%</span>
          </div>
          <div class="meter-track"><div class="meter-fill ${nbaScore >= 75 ? 'good' : 'warning'}" style="width: ${nbaScore}%"></div></div>
          <div class="stat-sub">PO/PSO Attainment & Continuous Curriculum Loop</div>
        </div>

        <div class="readiness-card">
          <div class="readiness-header">
            <h3>NIRF India Ranking</h3>
            <span class="readiness-pct">${nirfScore}%</span>
          </div>
          <div class="meter-track"><div class="meter-fill ${nirfScore >= 75 ? 'good' : 'warning'}" style="width: ${nirfScore}%"></div></div>
          <div class="stat-sub">Teaching Resources, Research Output & Outreach</div>
        </div>

        <div class="readiness-card">
          <div class="readiness-header">
            <h3>AICTE Compliance</h3>
            <span class="readiness-pct">${aicteScore}%</span>
          </div>
          <div class="meter-track"><div class="meter-fill ${aicteScore >= 75 ? 'good' : 'warning'}" style="width: ${aicteScore}%"></div></div>
          <div class="stat-sub">Mandatory Disclosure, Cadre Ratio & Infra Norms</div>
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Student-Faculty Ratio (SFR)</div>
        <div class="stat-value">${sfr} : 1</div>
        <div class="stat-sub">NBA Tier-I Standard: ≤ 15:1 (${totalStudents} students / ${fac.length} approved faculty)</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Doctorate Qualification (Ph.D.)</div>
        <div class="stat-value">${phdPct}%</div>
        <div class="stat-sub">${phdFacCount} of ${fac.length} faculty members hold Ph.D. degrees</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Research Grants & Consultancy</div>
        <div class="stat-value">${formatInr(res.reduce((sum, r) => sum + (Number(r.amount_inr) || 0), 0))}</div>
        <div class="stat-sub">${res.length} approved research & sponsored project records</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Pending IQAC Queue</div>
        <div class="stat-value">${pendingReview}</div>
        <div class="stat-sub">${pendingReview === 0 ? 'All submitted records vetted' : 'Awaiting HoD / IQAC verification'}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Department Data Assets Summary</h3>
        <button class="btn primary" onclick="state.activeTab='reports'; render();">Open Full Accreditation Dossier</button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Assessment Category</th>
            <th>Approved Records</th>
            <th>Draft / In-Review</th>
            <th>Primary Accreditation Standard</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Faculty & Academic Cadre</strong></td>
            <td><span class="pill approved">${fac.length} Approved</span></td>
            <td>${state.data.faculty.length - fac.length} pending</td>
            <td>NAAC Criterion 2.4 · NBA Criterion 5 · NIRF FQE</td>
          </tr>
          <tr>
            <td><strong>Infrastructure, Labs & Computing</strong></td>
            <td><span class="pill approved">${infra.length} Approved</span></td>
            <td>${state.data.infrastructure.length - infra.length} pending</td>
            <td>NAAC Criterion 4.1 · NBA Criterion 6 (Facilities)</td>
          </tr>
          <tr>
            <td><strong>Research, Publications & IPR</strong></td>
            <td><span class="pill approved">${res.length} Approved</span></td>
            <td>${state.data.research.length - res.length} pending</td>
            <td>NAAC Criterion 3.3 · NIRF Publications & Patents</td>
          </tr>
          <tr>
            <td><strong>OBE Academic Programs</strong></td>
            <td><span class="pill approved">${prog.length} Approved</span></td>
            <td>${state.data.programs.length - prog.length} pending</td>
            <td>NBA Criteria 1-4 (Vision, Mission, PEOs, CO-PO)</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// --- Profile View ---
function renderProfile() {
  const p = state.profile || {};
  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Department Institutional Profile (SSR Extended Profile)</h2>
          <div class="card-subtitle">Master institutional parameters for NAAC Part-A, NIRF Overall, and AICTE Annual Return.</div>
        </div>
        <button class="btn primary" id="saveProfileBtn">💾 Save Profile Changes</button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
        ${CONFIG.profileFields.map(f => {
          const val = p[f.key];
          if (f.type === 'checkbox') {
            return `
              <div class="form-group">
                <label style="display: flex; align-items: center; cursor: pointer;">
                  <input type="checkbox" id="prof_${f.key}" ${val ? 'checked' : ''}>
                  ${f.label}
                </label>
              </div>
            `;
          }
          return `
            <div class="form-group">
              <label for="prof_${f.key}">${f.label}</label>
              <input type="${f.type}" id="prof_${f.key}" value="${esc(val)}" placeholder="${f.placeholder || ''}">
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// --- Collection Table View ---
function renderCollection(key) {
  const cfg = CONFIG.collections[key];
  const allRows = state.data[key] || [];

  // Filter & Search
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
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">${cfg.label}</h2>
          <div class="card-subtitle">Feeds: ${cfg.consumers}</div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn" onclick="exportCSV('${key}')">📥 Export CSV</button>
          <button class="btn primary" onclick="openEditModal('${key}', null)">+ Add ${cfg.singular}</button>
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
          No ${cfg.label.toLowerCase()} found matching your filters.
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
                    <span class="pill ${statusClass(r.status)}">${r.status || 'Draft'}</span>
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
  Object.keys(CONFIG.collections).forEach(collKey => {
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
          <div class="card-subtitle">Review, verify supporting documentary evidences, and approve records for final SSR/SAR compilation.</div>
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
            const primaryTitle = record.name || record.title || `${cfg.singular} #${record.id}`;
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
                    ${record.evidence_note ? `
                      <div style="margin-top: 4px; font-size: 0.8rem; color: var(--accent);">
                        📌 <strong>Evidence Note:</strong> ${esc(record.evidence_note)}
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
          <h2 class="card-title">Immutable Audit Trail & Activity Log</h2>
          <div class="card-subtitle">Timestamped governance log tracking all additions, modifications, reviews, and status changes.</div>
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
                  <span class="pill ${log.action === 'APPROVE' ? 'approved' : (log.action === 'SEND_BACK' ? 'sentback' : 'draft')}">
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
  const p = state.profile || {};
  const fac = state.data.faculty.filter(f => f.status === 'Approved by IQAC');
  const infra = state.data.infrastructure.filter(i => i.status === 'Approved by IQAC');
  const res = state.data.research.filter(r => r.status === 'Approved by IQAC');
  const prog = state.data.programs.filter(pr => pr.status === 'Approved by IQAC');

  const totalStudents = Number(p.total_students) || 0;
  const sfr = fac.length > 0 ? (totalStudents / fac.length).toFixed(1) : 'N/A';

  return `
    <div class="no-print" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <div>
        <h2 style="font-family: var(--font-serif); font-size: 1.25rem;">Accreditation Dossier & Compliance Reports</h2>
        <p style="font-size: 0.82rem; color: var(--ink-soft);">Compiled strictly from IQAC-approved records for official submission.</p>
      </div>
      <button class="btn primary" onclick="window.print()">🖨️ Print / Save Official PDF</button>
    </div>

    <div class="report-page">
      <div class="report-header-formal">
        <h2>CHRIST (Deemed to be University)</h2>
        <h3>School of Engineering and Technology · Department of Civil Engineering</h3>
        <p>INTERNAL QUALITY ASSURANCE CELL (IQAC) — ACCREDITATION COMPLIANCE DOSSIER</p>
        <p><strong>Academic Year: ${esc(p.academic_year || '2026-27')}</strong> · Document Ref: CU/SET/CIVIL/IQAC/${new Date().getFullYear()}/01</p>
      </div>

      <h4 style="font-family: var(--font-serif); font-size: 1.05rem; margin-top: 18px; color: var(--christ-blue);">
        1. NAAC SSR Extended Profile & Criterion Metrics Summary
      </h4>
      <table class="report-table">
        <tbody>
          <tr><td width="40%"><strong>Department & Academic Year</strong></td><td>Civil Engineering · ${esc(p.academic_year)}</td></tr>
          <tr><td><strong>Total Enrolled Students</strong></td><td>${esc(p.total_students)}</td></tr>
          <tr><td><strong>Approved Full-Time Faculty Count</strong></td><td>${fac.length}</td></tr>
          <tr><td><strong>Student-to-Faculty Ratio (SFR)</strong></td><td><strong>${sfr} : 1</strong> (Compliant with AICTE/NBA norms)</td></tr>
          <tr><td><strong>Approved Laboratory & ICT Facilities</strong></td><td>${infra.length} Registered Centers</td></tr>
          <tr><td><strong>Approved Research Publications & Patents</strong></td><td>${res.length} Indexed Publications / Grants</td></tr>
          <tr><td><strong>Annual Department Budget (Allocated / Utilized)</strong></td><td>${formatInr(p.budget_allocated_inr)} / ${formatInr(p.budget_utilized_inr)}</td></tr>
        </tbody>
      </table>

      <h4 style="font-family: var(--font-serif); font-size: 1.05rem; margin-top: 24px; color: var(--christ-blue);">
        2. NBA Program-wise Outcome-Based Education (OBE) Status
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
          Accreditation Coordinator
        </div>
        <div class="sign-box">
          <div class="sign-line"></div>
          <strong>Verified by</strong><br>
          IQAC Department Lead
        </div>
        <div class="sign-box">
          <div class="sign-line"></div>
          <strong>Approved by</strong><br>
          Head of the Department (HoD)
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// Modal & Action Controllers
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
              return `
                <div class="form-group">
                  <label for="${fId}">${f.label} ${f.req ? '*' : ''}</label>
                  <input type="${f.type}" id="${fId}" value="${esc(val)}" placeholder="${f.placeholder || ''}" ${f.req ? 'required' : ''}>
                </div>
              `;
            }).join('')}

            ${existing ? `
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
      if (f.type === 'number') payload[f.key] = el.value === '' ? null : Number(el.value);
      else payload[f.key] = el.value;
    }
  }

  // Basic validation
  const reqField = cfg.fields.find(f => f.req);
  if (reqField && !payload[reqField.key]) {
    showToast(`Please enter the required field: ${reqField.label}`, 'error');
    return;
  }

  try {
    if (id) {
      await api(`/api/${collKey}/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
      showToast(`${cfg.singular} updated successfully.`, 'success');
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
    showToast('Record submitted to IQAC queue for verification.', 'success');
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
  const payload = {};
  CONFIG.profileFields.forEach(f => {
    const el = document.getElementById(`prof_${f.key}`);
    if (el) {
      if (f.type === 'checkbox') payload[f.key] = el.checked;
      else if (f.type === 'number') payload[f.key] = el.value === '' ? null : Number(el.value);
      else payload[f.key] = el.value;
    }
  });

  try {
    await api('/api/profile', { method: 'PUT', body: JSON.stringify(payload) });
    showToast('Department Profile saved successfully.', 'success');
    await loadAllData();
  } catch (err) {
    showToast(`Profile save failed: ${err.message}`, 'error');
  }
}

function exportCSV(collKey) {
  const rows = state.data[collKey] || [];
  const cfg = CONFIG.collections[collKey];
  const cols = cfg.fields.map(f => f.key).concat(['status', 'note']);
  
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
  // Tabs
  document.querySelectorAll('.nav-tab').forEach(tabBtn => {
    tabBtn.onclick = () => {
      state.activeTab = tabBtn.dataset.tab;
      state.searchQuery = '';
      state.statusFilter = 'ALL';
      render();
    };
  });

  // Role selector
  const roleSelect = document.getElementById('roleSelector');
  if (roleSelect) {
    roleSelect.onchange = (e) => {
      state.userRole = e.target.value;
      if (state.userRole === 'staff') state.userName = 'Faculty / Staff Member';
      else if (state.userRole === 'iqac') state.userName = 'Dr. Joseph Kurian (IQAC Lead)';
      else state.userName = 'System Administrator';
      showToast(`Role switched to: ${e.target.options[e.target.selectedIndex].text}`, 'info');
      render();
    };
  }

  // Theme toggle
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.onclick = () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', state.theme);
      render();
    };
  }

  // Save profile button
  const saveProfBtn = document.getElementById('saveProfileBtn');
  if (saveProfBtn) saveProfBtn.onclick = saveProfile;

  // Search input in collection table
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

  // Status filter in collection table
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

// Initial Boot
window.addEventListener('DOMContentLoaded', () => {
  loadAllData();
});
