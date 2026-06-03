# CLAUDE.md — Reservas Frontend (Bookea.me)

## Project Overview

**Bookea.me** is a SaaS booking/reservation platform. This repository is the frontend — a Next.js 15 app that lets business owners manage their services, schedules, and reservations, and lets customers book appointments through a public-facing flow.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.5.2 |
| Runtime | React | 19.1.0 |
| Language | TypeScript (strict) | 5 |
| State | Zustand | 5.0.12 |
| Data fetching | TanStack React Query | 5.95.2 |
| Styling | Tailwind CSS | 4 |
| UI primitives | shadcn/ui + Radix UI | — |
| Forms | react-hook-form + Zod | 7.x / 4.x |
| Icons | lucide-react | 0.543.0 |
| Tables | TanStack Table | 8.x |
| Dates | date-fns + date-fns-tz | 4.x / 3.x |
| Toasts | Sonner | 2.x |
| Theme | next-themes | 0.4.6 |
| Build | Turbopack | — |
| Package manager | npm | — |

---

## Key Commands

```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Production build with Turbopack
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## Project Structure

```
src/
├── app/                   # Next.js App Router pages and layouts
│   ├── layout.tsx         # Root layout (wraps all providers)
│   ├── page.tsx           # Landing page
│   └── (core)/            # Route group — no URL prefix
│       ├── login/         # Auth pages (login, sign-up, reset-password)
│       ├── dashboard/     # Authenticated dashboard area
│       └── business/[id]/ # Public booking flow for a specific business
├── components/
│   ├── ui/                # shadcn/ui components (49 components — do not edit manually)
│   └── auth/              # ProtectedRoute / PublicOnlyRoute wrappers
├── hooks/                 # Custom hooks (all use React Query)
├── lib/
│   ├── api/               # API client + per-resource modules
│   │   ├── client.ts      # Core typed fetch client
│   │   ├── types.ts       # All shared interfaces and types
│   │   └── *.api.ts       # Resource-specific API calls
│   ├── schemas/           # Zod validation schemas (all errors in Spanish)
│   └── utils.ts           # cn(), getDropDownValues(), column helpers
├── providers/             # React context providers (Auth, Query)
├── store/                 # Zustand stores
├── types/                 # Shared TypeScript types
└── utils/
    └── utils.ts           # Formatting helpers, constants (states, social platforms)
```

---

## Environment Variables

```bash
# .env.local (required)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

The `NEXT_PUBLIC_` prefix exposes the variable to the browser bundle. For production, set this to the real API base URL. There is no `.env.example` yet — create one if adding new variables.

---

## Architecture Decisions

### Routing
- Uses Next.js **App Router** exclusively (no Pages Router).
- `(core)` is a route group — it organizes auth and dashboard routes without appearing in the URL.
- Dynamic route: `/business/[id]` powers the public booking flow.

### Authentication
- JWT tokens held **in Zustand memory only** — never in `localStorage`.
- Refresh tokens live in **httpOnly cookies** (set by the backend).
- `AuthProvider` calls `/auth/refresh` on every app load to restore the session.
- `ProtectedRoute` wraps authenticated pages; `PublicOnlyRoute` wraps login/signup.

### State Management
Three Zustand stores in `src/store/`:
- `auth.store.ts` — user profile and session (token in memory only, user data persisted)
- `cart.store.ts` — booking flow state (products, date, time, customer info — fully persisted)
- `business.store.ts` — active business data (persisted)

### Data Fetching
- All server state goes through **TanStack React Query**.
- Config: stale time 5 min, 1 retry on queries, 0 retries on mutations.
- Window-focus refetch is **disabled**.
- Use the query key factory pattern (`productKeys`, etc.) for cache invalidation.

### API Client
`src/lib/api/client.ts` exports a typed `apiClient` with `.get`, `.post`, `.put`, `.patch`, `.delete`, `.upload`. It automatically:
- Injects the Bearer token from Zustand
- Sends credentials (cookies) with every request
- Throws a typed `ApiError` with a `.status` code

Resource modules (`auth.api.ts`, `products.api.ts`, etc.) import from `client.ts` — never call `fetch` directly.

### Styling
- Tailwind CSS 4 with CSS custom properties for theming.
- Primary brand color: Purple (`#a855f7`).
- Colors use **OKLch** color space.
- Status colors (reservations): yellow=pending, blue=confirmed, red=cancelled, green=completed, orange=rescheduled.
- Dark mode supported via `.dark` class (managed by `next-themes`).
- Utility: always use `cn()` from `src/lib/utils.ts` when merging Tailwind classes.

### Forms and Validation
- All forms use `react-hook-form` + Zod schemas resolved via `@hookform/resolvers/zod`.
- Schemas live in `src/lib/schemas/` — one file per domain.
- All validation error messages are written in **Spanish**.

---

## Conventions

### Naming
- Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities and hooks.
- Custom hooks prefix: `use` (e.g., `useProducts`, `useAuth`).
- Zod schemas suffix: `Schema` (e.g., `loginFormSchema`).
- API modules suffix: `.api.ts`.
- Zustand stores suffix: `.store.ts`.

### Path Alias
`@/*` resolves to `src/*`. Always use the alias, never relative `../../` imports.

### Comments
Write comments only when the **why** is non-obvious. Do not describe what the code does.

### Components
- Prefer editing co-located route components before extracting to `src/components/`.
- Do **not** manually edit files inside `src/components/ui/` — use the shadcn CLI.

### Formatting Utilities
- Currency: use `formatPrice()` (Mexican Peso format).
- Duration: use `formatDuration()` (minutes → "X hrs Y min").
- Address: use `formatAdress()`.
- Password strength: use `getPasswordStrength()` (returns 0–4).

---

## What Is Not Configured (Known Gaps)

| Gap | Notes |
|-----|-------|
| Testing | No Jest, Vitest, or Playwright. Add before shipping critical flows. |
| Prettier | No formatter configured. Formatting is ESLint-only. |
| CI/CD | No GitHub Actions or pipelines. |
| Git hooks | No pre-commit or pre-push hooks. |
| `.env.example` | Does not exist yet — add when adding new env vars. |
| Image domains | `next.config.ts` allows `**` (all) for dev. Restrict to real domain in production. |

---

## Public Booking Flow

Customer path through `/business/[id]`:

```
/business/[id]            → Business landing (info + CTA)
/business/[id]/products   → Select services/products
/business/[id]/schedule   → Pick date and time slot
/business/[id]/form-confirm → Customer info form
/business/[id]/confirmation → Booking confirmed
```

State for this flow lives in `cart.store.ts`.

---

## Dashboard Flow

Owner path under `/dashboard` (requires authentication):

```
/dashboard            → Overview
/dashboard/business   → Create or update business profile
/dashboard/products   → Manage products/services (CRUD + image upload)
/dashboard/reservations → View incoming reservations
/dashboard/schedules  → Configure available time slots
/dashboard/profile    → User profile
/dashboard/settings   → Account settings
```

---

## Commit Style

Based on git history, this project uses imperative prefixes:

```
ADD:     new feature or file
FIX:     bug fix or correction
FEATURE: larger feature addition
DELETE:  removal of code or routes
Merge:   merge commits (auto-generated)
```

Match this style when creating commits.
