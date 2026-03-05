# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Run ESLint
npx prisma push # sync schema with database
npx prisma db seed       # Seed the database (via tsx prisma/seed.ts)
npx prisma studio        # Open Prisma Studio GUI
```

No test suite is configured in this project.

## Architecture Overview

**MyDrinks** is a Next.js 15 App Router application for cocktail recipes and events, with JWT-based auth, Prisma/PostgreSQL, and an LLM pipeline for AI-generated recipes.

### Path Aliases

`@/*` maps to the project root. Example: `@/src/components`, `@/lib/auth`, `@/db/db`.

### Data Flow

- **Server components** fetch data directly via Prisma (no separate API layer). Query helpers live in `db/` (e.g., `getDrink.ts`, `getEvent.ts`). Some use `React.cache()` for per-request memoization.
- **Server actions** in `src/actions/` handle mutations (sign in, sign up, sign out). They use Zod schemas from `lib/validation/` for input validation before touching the DB.
- **Middleware** (`src/middleware.ts`) guards `/api/*` routes with an `x-api-key` header check against `API_SECRET_KEY` env var.

### Authentication

JWT stored in an HTTP-only cookie (`auth_token`). The full flow:
1. `src/actions/signIn.ts` validates credentials, creates a JWT via `lib/auth/jwt.ts` (HS256, 7-day expiry), and sets the cookie.
2. `lib/auth/getUserDto.ts` wraps JWT verification in `React.cache()` for per-request access to the current user.
3. `lib/auth/password.ts` uses bcrypt (12 rounds) with a dummy hash pattern to prevent timing attacks.
4. Emails are normalized (trim + lowercase) via `lib/auth/email.ts` before storage and lookup.

### Component Architecture

Follows Atomic Design (`src/components/`):
- **atoms** — smallest UI elements (Cta, Chip, TextField, Spinner, etc.)
- **molecules** — composed atoms (DrinkCard, EventCard, FilterChipBar, etc.)
- **organisms** — full page sections (Header, DrinksGrid, SignInForm, EventDrinksSection, etc.)

Each component lives in its own directory with a `.tsx` file and a `.scss` file.

### Forms & Validation

The `useForm` hook (`src/hooks/useForm.ts`) is a generic Zod-based form handler. It tracks touched fields, validates on blur/change, and calls server actions via `useTransition`. Zod schemas are defined in `lib/validation/`.

### Styling

SCSS with a global design system in `src/styles/`:
- `_variables.scss` — CSS custom properties (colors, spacing). Dark theme; primary accent is amber-gold `#C19552`.
- `_breakpoints.scss` — responsive mixins (`respond-to`, `from-tablet`, etc.). Breakpoints: tablet 480px, tablet-landscape 768px, desktop 1024px.
- `_typography.scss` — shared typographic classes.

SVGs are imported as React components via `@svgr/webpack` (configured in `next.config.ts`). Use `import Icon from './icon.svg?url'` to get a URL instead.

### Key Environment Variables

```
DATABASE_URL       # PostgreSQL connection string
AUTH_SECRET        # JWT signing secret
API_SECRET_KEY     # API route middleware key
```

## UX Constraints & Upcoming Features

> These rules define the intended product behavior and must be followed
> strictly when implementing any ordering or event-related UI.
> They are **not yet implemented** in the codebase.

### Ordering System

Ordering is strictly bound to the currently active Event. There is no
cart or basket — users place immediate "Quick Orders" only.

- **1 Order = 1 Drink Type** with a quantity selector (max 5).
- Multiple different drinks require separate, independent orders.

**Context-dependent Quick Order UI visibility:**

| Location | Behavior |
|---|---|
| PLP – "All Drinks" tab | ❌ Never show Quick Order UI (recipe discovery only) |
| PLP – "Events" tab | ✅ Show Quick Order UI only for drinks in the active event |
| PDP (Single Drink View) | ✅ Always show Quick Order UI (authenticated users only) |
| PDP – drink not in active event | Show a **disabled gray button** ("Unavailable Tonight") with explanatory micro-copy |
| PDP – unauthenticated user | ❌ Do not show Quick Order UI — only authenticated users may place orders |

### /orders Page

**Active Orders (live tracking):**
- Show orders for the current active event only.
- Use a 3-step progress bar: `[Pending] → [Mixing] → [Ready!]`
- The `Ready!` state must be highlighted in Lime Green (`#B9FF66`).
- Users may **cancel only** when the order is in `Pending` state.
- Cancellation requires a confirmation step styled in Cherry Red (`#D20A2E`).

**Past Orders (digital receipt):**
- Grouped by past events; cards are compact and read-only.
- No real-time status bars, no "Re-order" button.
- The entire card is clickable and navigates to the drink's PDP.

### Empty States (No Active Event)

When no event is active, the app functions as a recipe catalog only:
- Show an elegant empty state on the "Events" tab communicating the bar is currently closed.
- Show the same treatment on the `/orders` page.
- Never show Quick Order UI in this state anywhere in the app.
