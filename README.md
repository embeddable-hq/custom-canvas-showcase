# Custom Canvas Showcase

A Next.js demo application that helps you learn how to embed and work with the **Custom Canvas** feature. It renders a tokenized `<em-beddable>` component, lets you switch themes, manage per-user permissions (write/read-only/no access), and simulate multiple dashboards whose state lives in session storage.

## How it works

- The sidebar lists sample dashboards (stored in session storage). You can add, rename, delete, and filter them by user access.
- Selecting a dashboard calls `app/api/token/route.ts`, which exchanges `customCanvasState`, user email, and permission flags for a short-lived security token using your platform API.
- The embeddable web component is injected via `NEXT_PUBLIC_EMBEDDABLE_SCRIPT_URL` and mounted with the token plus optional client context (theme).
- Permissions drive whether the selected dashboard is writable, read-only, or hidden for the current user.
- Theme selections are saved in session storage and passed as `client-context` to the `<embeddable>` tag.

## Prerequisites

- Node.js 20+ (Next.js 16)
- npm (or pnpm/yarn/bun)

## Environment variables

Create `.env.local` with your platform values:

```
EMBEDDABLE_API_KEY=                # server-side key used by /api/token
EMBEDDABLE_ID=                     # embeddable identifier
NEXT_PUBLIC_EMBEDDABLE_API_URL=    # base API URL hit by /api/token
NEXT_PUBLIC_EMBEDDABLE_BASE_URL=   # base URL passed to <em-beddable>
NEXT_PUBLIC_EMBEDDABLE_SCRIPT_URL= # script that defines <em-beddable>

# Optional niceties
NEXT_PUBLIC_USER_EMAIL=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_GITHUB_REPOSITORY_URL=
NEXT_PUBLIC_DOCUMENTATION_URL=
```

## Run locally

```bash
npm ci
npm run dev
# open http://localhost:3000
```

## Key files

- `app/page.tsx` – layout and wiring between header, sidebar, and embeddable.
- `app/components/Embeddable.tsx` – mounts `<em-beddable>` with token + client context and handles loading states.
- `app/api/token/route.ts` – server route that exchanges dashboard state + user + permissions for a security token.
- `app/components/PermissionsModal.tsx` – per-user access controls (write/read-only/no access).
- `app/lib/dashboardUtils.ts` – dashboard creation, storage, filtering, and theme persistence helpers.
- `utils/constants.ts` – env config, sample users, navigation items, and help links.

## Demo flow to showcase

1) Pick a user in the header; dashboards filter to what they can access.  
2) Select a dashboard; a token is requested and the embeddable renders.  
3) Use the theme dropdown to switch themes; the embeddable receives the updated theme via `client-context`.  
4) Open the menu on a dashboard to edit permissions, rename, or delete.  
5) Add a dashboard to see how new `customCanvasState` values are handled end-to-end.

## Customization tips

- Update sample users/navigation in `utils/constants.ts`.
- Tweak initial dashboards or permission defaults in `app/lib/dashboardUtils.ts`.
- Style tokens and component classes in `app/lib/tokens.ts` and `app/globals.css`.
- Replace help links (Docs/GitHub/Contact) via the env vars in `utils/constants.ts`.

## Production notes

- The `/api/token` route keeps `EMBEDDABLE_API_KEY` server-side; never expose it to the client.
- Tokens expire after `TOKEN_EXPIRY_SECONDS` (7 days by default); adjust in `utils/constants.ts`.
- Serve the embeddable script over HTTPS in production.
