# RAMUNI SaaS evidence library

This folder contains the isolated product capture library used by marketing.

- `webp/desktop`, `webp/tablet`, and `webp/mobile` contain all 210 optimized full-page captures (70 routes × 3 viewports).
- `manifest.json` records the route, viewport, authentication, and capture status.
- `asset-index.json` records the optimized asset inventory and byte sizes.
- Runtime pages use the lighter files under `public/website-original/product-screens/saas-e2e/thumbs/` and lazy-load only the evidence relevant to the page. The full captures stay in this handoff folder so the 210-image set does not inflate every visitor's page load.

The captures are from the isolated product workspace described in `docs/evidence/ramuni-saas-screenshot-provenance.md`. Do not present a capture as a visitor's live business data; pair it with the product context and release status supplied by the marketing page.
