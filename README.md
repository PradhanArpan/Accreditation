# VERITA — Civil Engineering Accreditation Portal

**Department of Civil Engineering · School of Engineering & Technology**  
**CHRIST (Deemed to be University), Bengaluru**

An enterprise-grade, full-stack continuous accreditation and quality assurance portal designed to streamline **NAAC SSR (Criteria 1–7)**, **NBA SAR (Washington Accord Tier-I OBE)**, **NIRF Engineering Ranking**, and **AICTE Mandatory Disclosure** data collection, verification, and report compilation.

---

## 🌟 Key Features & Architectural Upgrades

1. **Hybrid Zero-Config Database Architecture**:
   - **Local Mode**: Runs instantly out of the box with embedded persistent JSON storage (`db/local_data.json`) — zero external database installation required.
   - **Production / Cloud Mode**: Seamlessly switches to managed **PostgreSQL** when `DATABASE_URL` is set (e.g., Render, Neon, Supabase, AWS RDS).
   - **Auto-Seeding**: Comes pre-populated with realistic department datasets (Faculty profiles with ORCID/Scopus IDs, Geotechnical & Structural Labs, Scopus journal publications, DST-SERB research grants, B.Tech/M.Tech NBA OBE attainment records).

2. **Accreditation Readiness & Analytics Radar**:
   - Live compliance percentage gauges for **NAAC**, **NBA**, **NIRF**, and **AICTE**.
   - Automatic calculation of **Student-to-Faculty Ratio (SFR)** against AICTE/NBA norms ($\le 15:1$).
   - Ph.D. faculty ratio, Cadre ratio analysis, and Research Grant tracking.

3. **Multi-Role Simulation & Governance**:
   - **Faculty / Department Staff**: Draft, edit, and submit records with supporting evidence links.
   - **IQAC Reviewer / HoD**: Dedicated QA inbox to verify documentary evidence, approve records, or send back submissions with actionable feedback.
   - **Accreditation Lead / Admin**: Full administrative rights and system-wide dossier generation.

4. **Evidence & Audit Trail**:
   - Support for ORCID, DOI URLs, Scopus Author IDs, geo-tagged lab equipment records, and NABL calibration reports.
   - Immutable **Audit Trail** capturing all actions, timestamps, actors, and reviewer remarks.

5. **Formal Compliance Dossier & Export**:
   - Official, printable Christ University institutional compliance report with formal header and sign-off blocks.
   - Single-click **JSON full backup** and per-table **CSV exports**.
   - Accessible **Dark / Light Theme** toggle with persistent styling.

---

## 🚀 1. Running the Portal Locally

### Prerequisites
- Node.js 18+ (Tested on Node v24)

### Quick Start
```bash
# Navigate to the project directory
cd "Accreditation Portal"

# Install dependencies
npm install

# Start the portal
npm start
```

Open your browser and visit:  
👉 **`http://localhost:3000`**

---

## 🌐 2. Pushing to GitHub

```bash
# Set your remote GitHub repository URL
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# Push to main branch
git push -u origin main
```

---

## ☁️ 3. Deploying to Render (Free Cloud Hosting + Postgres)

1. **Create Database**:
   - On [Render](https://render.com), create a new **PostgreSQL** database (e.g. `christ-civil-portal-db`).
2. **Create Web Service**:
   - Create a new **Web Service** connected to your GitHub repository.
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Link the Postgres database under Environment Variables (`DATABASE_URL`).
3. **Run**:
   - Render automatically connects the database and launches HTTPS endpoints.

---

## 📁 Project Structure

```
Accreditation Portal/
├── db/
│   ├── database.js     # Hybrid storage engine (Postgres + Zero-Config fallback)
│   ├── pool.js         # Connection pool export
│   ├── schema.sql      # Postgres DDL schema definition
│   └── local_data.json # Persistent local storage & seed dataset
├── public/
│   ├── index.html      # Clean HTML5 entrypoint
│   ├── css/
│   │   └── style.css   # Modern responsive stylesheet + Dark/Light themes + Print styles
│   └── js/
│       └── app.js      # Frontend controller, live metrics, role simulator & modals
├── server.js           # Express REST API, audit logger & analytics engine
├── package.json        # Node manifest & scripts
├── .env.example        # Environment variable template
└── .gitignore          # Git ignore rules
```
