# Tlotlego's Electric Solutions — Website (Part 3 ready)

This folder contains the website files with Part 3 features implemented (JavaScript, SEO files, forms, and validation).

## What I added
- `js/script.js` — client-side form validation & interactions, enquiry estimate calculator, simple lightbox and modal helpers.
- `enquiry.html` — new page with enquiry form and instant estimate output (required by Part 3).
- `robots.txt` and `sitemap.xml` for SEO and crawling guidance.
- Minor SEO meta tag enhancements added to HTML files.

## How forms behave
- **Contact form** (contact.html): validated client-side. When submitted, it compiles the message into a `mailto:` link so users can send via their email client (works without a server).
- **Enquiry form** (enquiry.html): validates input, provides an estimated starting price based on service and units, and shows a friendly summary. It does not send data to a server (no backend configured).

## Notes for instructor / marker
- Images folder is intentionally left empty — user will add images in `images/` (they provided images separately).
- Update `sitemap.xml` and canonical links to the real domain before deployment.

## Changelog (Part 3)
- 2025-11-16: Added JS validation, enquiry.html, robots.txt, sitemap.xml, README and packaged files for submission (Part 3).

---
