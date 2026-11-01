Yalla Shop — Free-quota owner management edition
================================================
Start with ../START-HERE-AR.md in the full delivery package.

index.html       Existing customer storefront, with live catalog overrides.
owner.html       Owner management UI. Password-only form backed by Firebase Auth.
catalog.json     Bundled original products, not a public database of passwords.
firebase-config.js   Public Firebase web config + owner email + owner UID.
firestore.rules      Owner-only writes. Replace OWNER UID before publishing.

Use an HTTPS host or local HTTP server; do not open owner.html via file://.
On Windows, START-LOCAL.bat is provided (requires Python 3).
No credentials are included. Until configured, only local preview is available.

The website includes 961 original product records. Existing images remain in images/.
Only overrides/new products are written to Firestore.
Gallery images are resized to JPEG display thumbnails, at most 96,000 data URL
characters, in separate Firestore documents. This edition does NOT use Firebase Storage.
All Firestore read/write/bandwidth limits still apply, including to thumbnail documents.
Do not store large original images as database documents.

Checkout confirms prices against the server when Firebase is configured and blocks
submission if it cannot confirm them. WhatsApp orders remain the original store flow.

Dynamic sections update (2026-11-01):
- Owner can create a named section with a gallery photo, order it, rename/hide/show it.
- Products can be assigned or moved to it. Customer cards, category picker, search,
  and the shared shopping cart support these sections.
- Publish the UPDATED firestore.rules before using section saves.
- Sections use yallaSections; public config and owner UID/email are already set.
