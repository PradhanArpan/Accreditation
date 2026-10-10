# QUALEX 360 — Academic Quality & Accreditation Intelligence Platform

*Autonomous Multi-Tier Compliance, Evidence Vault & Continuous Quality Improvement Suite*

A multi-tier, institutional SaaS platform for continuous quality assurance and regulatory accreditation compliance across **NAAC SSR (Criteria 1–7)**, **NBA SAR (Washington Accord Tier-I OBE)**, **NIRF Engineering Ranking**, and **AICTE Mandatory Disclosure**.

---

## 🏛️ 1. Multi-Tier Institutional Hierarchy Embedded

Designed to scale across any university or college while focusing on the active department:

```
Level 1: Overarching University / HEI (e.g. Apex University)
    │
    └── Level 2: School / Faculty / Deanery (e.g. School of Engineering and Technology)
            │
            └── Level 3: Department / Discipline (e.g. Department of Civil Engineering)
```

- **Interactive Hierarchy Breadcrumbs**: Configurable via the top navigation bar (`⚙️ Configure Hierarchy & Institute`).
- **Scoped Compliance**: Every metric, SFR ratio, and faculty list rolls up cleanly to the department, school, and university level.

---

## 📊 2. Standardized Spreadsheet Ingestion Hub (Download, Fill, Upload)

To eliminate manual one-by-one data entry, every domain includes pre-built templates:

| Domain | Downloadable Templates | Automated Mapping & Validation |
| :--- | :--- | :--- |
| **Faculty Directory** | `.xlsx` / `.csv` | Name, Designation, Qualification, Specialization, Experience, Cadre, 3-Yr Pubs, Patents, ORCID URL |
| **Infrastructure & Labs** | `.xlsx` / `.csv` | Category, Facility Name, Capacity, Equipment Count, Year Established, NABL/Calibration Ref |
| **Research & Grants** | `.xlsx` / `.csv` | Contribution Type, Title, Authors, Year, Journal/Funding Agency, Scopus/WoS Indexing, Amount INR, DOI |
| **NBA OBE Programs** | `.xlsx` / `.csv` | Program Title, Level (UG/PG), NBA Tier, Approved Intake, CO Count, PO Count, Direct Attainment % |
| **Institutional Profile** | UI Form & Master Backup | Student Demographics, Gender Diversity, PwD, Placements, Median Salary, Budget Utilization |

### Ingestion Workflow:
1. **Download Template**: Click **`📥 Template (.xlsx)`** or **`📥 Template (.csv)`** from any tab or the **`⚡ Data Hub`**.
2. **Fill Offline**: Department staff populate the sheet using Microsoft Excel, Google Sheets, or LibreOffice.
3. **Upload & Ingest**: Click **`📤 Upload Filled Spreadsheet`**. Choose:
   - **Append**: Adds new records to the current database.
   - **Replace**: Fresh overwrite for an updated academic year.
4. **Instant Radar Update**: The portal parses the sheet, validates rows, auto-computes Student-to-Faculty Ratio (SFR), updates the accreditation gauges, and refreshes the official dossier immediately!

---

## 🧹 3. Data Governance: Clean Slate & Demo Modes

Click **`⚡ Data Hub`** in the top navigation:
- **`Clear All Records (Clean Slate)`**: Empties all sample demonstration data so the department can start fresh with 100% genuine institutional records.
- **`Populate Demonstration Data`**: One-click reload of sample baseline academic accreditation data for demo sessions with deans or review committees.
- **`Download Master Backup`**: Single-click export of the entire database in JSON format.

---

## 🚀 4. Running Locally

```powershell
# Navigate to the project directory
Set-Location "C:\Users\HP\OneDrive\3. Advanced Learning\2. Personal App Projects\Accreditation Portal\Accreditation Portal"

# Install dependencies (Node 18+)
npm install

# Start the server
npm start
```
Visit **`http://localhost:3000`** in your browser.

---

## ☁️ 5. Cloud Deployment on Render

1. On [Render Dashboard](https://dashboard.render.com), click **`+ New` → `Web Service`**.
2. Connect your GitHub repository: **`PradhanArpan/Accreditation`**.
3. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
4. Deploy! The application uses its embedded persistent storage out of the box and seamlessly switches to PostgreSQL whenever `DATABASE_URL` is configured.
