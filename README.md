# Civil Engineering — Accreditation Data Portal

Dept. of Civil Engineering · School of Engineering & Technology · CHRIST (Deemed to be University)

A small full-stack app: Express API + Postgres + a plain-JS frontend. Same data model and workflow as the earlier prototype (Faculty / Infrastructure / Research / Programs, IQAC review, readiness dashboard, printable reports) — now backed by a real database you control, instead of living only inside a Claude artifact.

---

## 1. Run it locally

**Requirements:** Node.js 18+, and a Postgres database (local install, or Docker).

```bash
# from inside the civil-portal folder
npm install

# get a local Postgres running (skip if you already have one)
# Docker one-liner:
docker run --name civil-portal-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

# create the database and load the schema
createdb civil_portal            # or: docker exec -it civil-portal-db createdb -U postgres civil_portal
psql civil_portal -f db/schema.sql   # or the docker-exec equivalent

# set your connection string
cp .env.example .env
# edit .env if your Postgres isn't at the default local address

npm start
```

Open **http://localhost:3000** — that's the same UI as before, now reading and writing to your local Postgres.

---

## 2. Push it to GitHub

```bash
cd civil-portal
git init
git add .
git commit -m "Initial commit — accreditation data portal"
```

Then, on github.com:
1. Create a new **empty** repository (no README/license, so it doesn't conflict with what you already have) — e.g. `civil-eng-accreditation-portal`. Set it **private** — this holds department data, even if just structural for now.
2. GitHub will show you the remote URL. Back in your terminal:
```bash
git remote add origin https://github.com/<your-username>/civil-eng-accreditation-portal.git
git branch -M main
git push -u origin main
```

You now have the code on GitHub. `.env` is git-ignored on purpose — your real database credentials never get committed.

---

## 3. Deploy on Render

Render is a good fit here: free/low-cost managed Postgres, deploys straight from a GitHub repo, and handles HTTPS for you.

**Step 1 — Create the database**
1. In the Render dashboard: **New → PostgreSQL**.
2. Name it (e.g. `civil-portal-db`), pick the free tier to start, create it.
3. Once it's up, open it and find the **Internal Connection String** — Render will wire this to your web service automatically in the next step, so you don't need to copy it by hand.
4. Run the schema against it once: Render's Postgres page gives you an external connection string too — use that with `psql` from your machine, or Render's built-in shell:
   ```bash
   psql <external-connection-string> -f db/schema.sql
   ```

**Step 2 — Create the web service**
1. **New → Web Service**, connect your GitHub account, pick the `civil-eng-accreditation-portal` repo.
2. Build command: `npm install`
3. Start command: `npm start`
4. Under **Environment**, click **Add Environment Variable → Add from Database** (or similar, naming varies slightly by Render UI version) and link the Postgres instance from Step 1 — this sets `DATABASE_URL` for you automatically.
5. Deploy. Render gives you a URL like `https://civil-eng-accreditation-portal.onrender.com`.

**Step 3 — Verify**
- Visit the Render URL, confirm the dashboard loads and `/health` returns `{"ok":true}`.
- Add a test faculty record, refresh the page, confirm it's still there — that confirms it's writing to Postgres, not just holding state in the browser.

**Free-tier note:** Render's free web services spin down after inactivity and take ~30–60 seconds to wake on the next request. Fine for internal department use; upgrade to a paid instance if that delay becomes annoying, or if you want it always warm before an accreditation visit.

---

## 4. What's still missing before this is "production" for real institutional use

This mirrors the honest caveats from the prototype — carrying them forward so nothing gets lost in the excitement of it being "live":

- **No login yet.** The `users` table exists in the schema but nothing in `server.js` checks it. Right now, anyone with the URL can edit data. Before sharing the link beyond yourself, add:
  - a login page + session (simplest: `express-session` + `bcrypt` for password hashing, checked against the `users` table), or
  - put the whole app behind CHRIST's SSO/Google Workspace login if that's available to you, which is usually less work than building your own auth.
- **No role separation.** "IQAC approves" is currently just a status field anyone can flip. Once login exists, gate the Approve/Send-back buttons to `role = 'iqac'` or `'admin'`.
- **No backups configured.** Render's free Postgres doesn't include automated backups — take this seriously once real data is in it. Paid tiers add backups; at minimum, periodically export via `pg_dump`.
- **Single department, single row of "profile" data per year.** Fine for now; if you extend to other departments or need multiple academic years live at once, the schema needs an `institution_id` / `academic_year` composite key rather than a single row.
- **NBA CO/PO/attainment is still just a summary number**, not the full per-course attainment table described in the earlier requirements document — extend `programs` into a proper `courses` + `attainment` table when you're ready to go deeper.

None of this blocks you from using it for real department record-keeping today — it blocks you from treating it as secure/multi-user yet. Add auth before anyone besides you touches it.

---

## 5. Project structure

```
civil-portal/
├── server.js          # Express app + REST API
├── db/
│   ├── schema.sql      # run once against your Postgres database
│   └── pool.js         # pg connection pool
├── public/
│   └── index.html      # the entire frontend (HTML+CSS+JS, no build step)
├── package.json
├── .env.example
└── .gitignore
```

No build step, no framework — the frontend is one HTML file talking to a small REST API. Easy to hand to another developer, easy to extend one route/field at a time.
