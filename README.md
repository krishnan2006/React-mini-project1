# Internship Finder

**Project 21 – Frontend Falcons**
Student: Krishnan SU

A responsive React.js app that helps a student track internship postings
end-to-end: discover them, compare details, apply, and follow the
pipeline through to an offer (or rejection) — all in one board.

## Problem it solves

Students juggle internship leads across WhatsApp groups, email, and
notice boards, and lose track of deadlines and where they stand with
each company. This app is a single personal board: save postings,
search/filter them, and track status (Saved → Applied → Interview →
Offer/Rejected) without a backend.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. Data is seeded with 6 sample
internships on first load and persisted to `localStorage` after that
(add/edit/delete/status changes all survive a refresh).

## Screens

| Screen | Route | Purpose |
|---|---|---|
| Dashboard | `/` | Pipeline stats + recently posted internships |
| List / Search | `/internships` | Full board with live search + mode filter |
| Details | `/internships/:id` | Full posting, status dropdown, edit/delete |
| Add / Edit | `/add`, `/edit/:id` | Controlled form with validation |
| Summary | `/summary` | Kanban-style board grouped by status |

## Structure

```
src/
  components/   Navbar, InternshipCard, StatusPill, FilterBar,
                StatCard, ConfirmModal, EmptyState, Toast
  pages/        Dashboard, ListSearch, Details, AddEditForm, Summary
  data/         internships.js — seed/mock data
  utils/        storage.js — localStorage read/write helpers
  App.jsx       routes + lifted state (single source of truth)
  main.jsx      BrowserRouter + root render
  index.css     design tokens + all styling
```

## React concepts demonstrated

- **Functional components** throughout, split by responsibility.
- **Props** for all parent to child communication (e.g. `internships`,
  `onSave`, `onDelete`, `onStatusChange` passed down from `App.jsx`).
- **`useState`** for the lifted internship list, search/filter inputs,
  form fields, and modal/toast visibility.
- **`useEffect`** to load from `localStorage` on mount and to persist
  on every change.
- **React Router** (`Routes`, `Route`, `Link`, `NavLink`, `useParams`,
  `useNavigate`) for all navigation, including a shared `AddEditForm`
  that behaves differently for `/add` vs `/edit/:id`.
- **`map()`** to render cards/tags/options, **`filter()`** for search
  and status grouping, **`find()`** to look up a single internship by
  id, **`reduce()`** to compute dashboard stats and the kanban groups.
- **Controlled forms** with inline validation (required fields,
  numeric stipend check, minimum description length).
