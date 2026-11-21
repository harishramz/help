# TrustConnect Foundation – Humanitarian & Community Support Platform

A premium, environmentally conscious React.js (Vite) web application for a non-profit charitable trust, designed with a **Nature & Humanity** palette, scroll-driven 3D storytelling, bundled documentary photography, and full Admin Add/Delete management.

## Getting Started in VS Code

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Visual Assets

- All primary editorial photographs are bundled in `public/assets/images/` (`hero-humanity.jpg`, `elderly-care-support.jpg`, `children-education.jpg`, `community-food-support.jpg`, `volunteers-helping.jpg`, `forest-background.jpg`).
- See `VISUAL_ASSETS_GUIDE.md` for the complete asset map and verified Pexels stock video links for optional MP4 backgrounds in `public/assets/videos/`.

## Demo Access

- **Supporter / Donor Portal**: Click **Login** -> **Demo Donor**
- **Trust Admin Console** (full Add & Delete across all modules): Click **Login** -> **Trust Administrator** (`admin@trustconnect.org` / `trust2026`) or **Demo Admin**

## Backend Integration

See `src/services/api.js` for the REST endpoint map (`VITE_API_BASE_URL`, defaulting to `http://localhost:8080/api/v1`) to connect your Spring Boot backend.
