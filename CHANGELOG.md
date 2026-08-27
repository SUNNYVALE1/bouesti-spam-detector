# Changelog

All notable changes to the BOUESTI Spam Email Detection System will be documented in this file.

## [Unreleased]

### Added
- **SEO & SSR Fixes:** Migrated the `/classify` page from a pure `'use client'` component to a Server Component wrapper with a separate Client Component widget (`ClassifierWidget.tsx`). This allows Google crawlers to index the static SEO metadata and content of the page instead of seeing an empty shell.
- **Per-Page Metadata:** Added specific `metadata` exports to `/about`, `/results`, `/how-it-works`, and `/contact` to ensure unique titles and descriptions in Google Search results.
- **Google Search Console Verification:** Implemented Google Site Verification via the HTML file method (`google56852ae9e6d67aec.html`) and inserted the verification code into the root `layout.tsx`.
- **Sitemap & Robots Update:** Updated `sitemap.ts` and `robots.ts` to explicitly point to the live custom domain `bouestispamdetector.com.ng` to ensure correct crawler indexing.
- **Documentation:** Created this `CHANGELOG.md`, updated `README.md` with full project details, and generated `TREE_VIEW.md`.

## [1.0.0] - 2026-08-21
### Added
- Initial release of the Next.js web application.
- Batch CSV processor and real-time single email classification.
- Integration of the pure TypeScript Logistic Regression inference engine (`classifier.ts`) and exported `model_weights.json`.
- UI/UX implementation including Hero banner, How it Works diagrams, and Results comparison dashboard.
