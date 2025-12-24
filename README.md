# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# Escapra Admin - Static Content Management System (CMS)

## 1. Overview
The **Escapra Static CMS** provides dynamic content management for all Escapra website pages.  
It is built on a **hybrid architecture**:

- **Elasticsearch → Draft Workspace**  
- **PostgreSQL → Published Live Content**  
- **React Admin Panel → Content Editor**  
- **Multilingual structured content (EN, AR, UR)**  
- **Versioned draft updates with publishing workflow**

## 2. Core Functionality

### 🧱 Page Management
- Create, edit, publish, and manage dynamic pages.
- Each page contains multiple **sections**.
- Automatic merging of **published DB sections + draft ES sections**.

### 🧩 Section Management
- Add reusable sections such as:
  - discounts_flights
  - explore_destinations
  - featured_hotels
  - get_our_app
- Each update creates a **new draft version** in Elasticsearch.
- Publishing moves the section into the database.

### 🌍 Localization
- Titles, descriptions, content, and items support:
  - English (`en`)
  - Arabic (`ar`)
  - Urdu (`ur`)
- Each language stored as:
```json
{
  "title": { "en": "", "ar": "", "ur": "" }
}
```

### 🔄 Versioning Rules
- Every update increases ES version → `1 → 2 → 3 → ...`
- Publishing stores latest version into DB.
- ES draft entry is deleted after publishing.
- DB stores the ES ID as `elastic_id`.

## 3. System Architecture

### 🔵 Elasticsearch (Draft Layer)
- Holds ALL drafts of sections.
- Used during editing/reviewing.
- Versions increment automatically.
- Does **not** affect live site until published.

### 🟢 PostgreSQL (Published Layer)
- Stores published sections.
- Stores `elastic_id` for connectivity.
- Live frontend reads from here ONLY.

## 4. Section Lifecycle Flow

### 1️⃣ Create Draft
- Section is created in ES only.
- Version = `1`
- Status = `draft`

### 2️⃣ Update Draft
- Uses same ES ID (from DB.elastic_id if exists).
- Version increments.
- Database is **NOT** modified.

### 3️⃣ Publish Section
- ES draft moved → DB
- ES draft entry deleted
- DB stores:
  - content
  - translations
  - items
  - version
  - elastic_id
  - status: "published"

### 4️⃣ Frontend Fetch
- API merges:
  - Published DB sections
  - Draft ES sections (same page)
- Removes duplicates
- Sorted by `order_idx`

## 5. Page Fetch Flow (`getPageWithSections`)

When frontend calls:
```
GET /pages/{slug}/details?lang=en
```

System does:

```
Fetch page (ES)        →
Fetch page (DB)        →
Merge metadata         →
Fetch ES draft sections  →
Fetch DB sections        →
Merge + dedupe + sort   →
Return final data
```

## 6. How to Run the Admin CMS

```bash
npm install
npm run dev
```

Admin URL:
```
http://localhost:5173
```

## 7. How to Test the Full Flow

### ✔ Step 1 — Create Draft
Create a section → Saved into Elasticsearch.

### ✔ Step 2 — Update Draft
Update section multiple times → Versions increase in ES:
```
v1 → v2 → v3 → ...
```

### ✔ Step 3 — Publish
Reviewer presses **Publish**:
- ES draft removed
- New record created in DB
- `elastic_id` stored for future updates

### ✔ Step 4 — Verify via API
Load frontend:
```
GET /pages/homepage/details?lang=en
```

You will see:
- DB published sections  
- ES draft sections (if any)  

Automatically merged.

## 8. Environment Configuration

```env
VITE_SCMS_API_URL=https://static-cms.stg.escapra.com
SCMS_API_URL=http://localhost:8000
```

## 9. Future Enhancements

- Full drag-drop page builder
- Live preview mode
- Reusable global section templates
- Role-based permissions
- Full version history browser
- Auto-rollback drafts

## 10. FULL SYSTEM FLOWCHART (ASCII)

```
                              ┌───────────────────────────┐
                              │      React Admin CMS      │
                              └───────────────┬───────────┘
                                              │
                                              ▼
                                 Create / Edit Section
                                              │
                        ┌─────────────────────┴─────────────────────┐
                        │                                           │
                        ▼                                           ▼
              Section exists already?                       New section being created?
                        │                                           │
                        ▼                                           ▼
            Use DB.elastic_id → ES ID                      Generate new ES ID (UUID)
                        │                                           │
                        └─────────────────────┬─────────────────────┘
                                              │
                                              ▼
                                       saveDraft()
                                              │
                                              ▼
                              ┌─────────────────────────────────  ─┐
                              │       Elasticsearch (Drafts)       │
                              │     - Versioned draft content      │
                              │     - status: draft                │
                              └───────────────────┬────────────────┘
                                                  │
                                     Draft saved / version incremented
                                                  │
                                                  ▼
                                      Reviewer views in Admin
                                                  │
                      ┌───────────────────────────┴───────────────────────────┐
                      │                                                       │
                      ▼                                                       ▼
                PUBLISH                                                  REQUEST CHANGES / REJECT
                      │                                                       │
Draft moved from ES → DB                                        Update ES entry only
Deleted from ES                                                 status = changes_requested
DB record created with:                                          status = rejected
- elastic_id stored                                              version++
- version stored
- multilingual content
                      │
                      ▼
            ┌──────────────────────────────────────┐
            │       PostgreSQL (Published)          │
            │  - Live content for Frontend          │
            │  - Stores ES elastic_id               │
            └───────────────────┬───────────────────┘
                                │
                                ▼
                    Frontend Page Request Triggered
                                │
                                ▼
             ┌─────────────────────────────────────────────────────────┐
             │ getPageWithSections(slug, lang)                         │
             │ ------------------------------------------------------- │
             │ 1. Fetch ES draft page (if exists)                      │
             │ 2. Fetch DB published page                              │
             │ 3. Merge metadata                                       │
             │ 4. Fetch ES draft sections                              │
             │ 5. Fetch DB published sections                          │
             │ 6. Merge + Remove duplicates                            │
             │ 7. Sort by order_idx                                    │
             └─────────────────────────────────────────────────────────┘
                                │
                                ▼
                     Combined Response Returned to Frontend
```
