# Oxford Hongkongers CIC Website — Handoff Guide

**Last Updated:** 2026-08-05  
**Status:** Active deployment on Vercel + GitHub  
**Previous Context:** See git history and this document for design decisions

---

## Project Overview

**Site:** https://oxford-hk.com  
**Purpose:** Community hub for Hongkongers in Oxfordshire, UK  
**Services:** Study tours (delegations), private walking tours, events, community support  
**Tech Stack:** Static HTML/CSS/JS, Vercel hosting, GitHub pages (private), Formspree for forms  
**Bilingual:** Traditional Chinese (主) + English (secondary)  

---

## Outstanding To-Do Items

### High Priority
- [ ] **Verify walking tour enquiry form routing** — check that Formspree is receiving submissions to `oxford.hker@gmail.com`
- [ ] **Test delegation enquiry form** — same Formspree endpoint; confirm emails are reaching the team
- [ ] **Mobile responsiveness audit** — walking-tours.html and delegations.html on iPhone/iPad (especially photo grids at 375px)

### Medium Priority
- [ ] **Events page** — currently stub with CTA; populate with upcoming events or event calendar system
- [ ] **Resources page** — currently minimal; consider adding community links, local services, newcomer guides
- [ ] **About Oxfordshire page** — currently stub; build out content for "認識牛津郡"
- [ ] **Collect user feedback** — set up simple metrics (Google Analytics integration?) to understand which pages drive enquiries
- [ ] **Membership benefits page (benefits.html)** — currently exists but is orphaned; link from membership.html or clarify scope

### Low Priority (Nice-to-Have)
- [ ] Add FAQ schema to delegations.html (already in walking-tours.html)
- [ ] SEO: target long-tail keywords like "Oxford tour for Hong Kong families", "牛津中文導賞"
- [ ] Social proof: testimonials/reviews section on tours pages
- [ ] Calendar integration: show available tour dates directly on site

---

## Design Decisions & Logic NOT in Code

### 1. **Route Secrecy (Walking Tours)**
The walking tours page **intentionally does NOT publish the full 11-stop itinerary**. Originally it had timed stops (0:00, 0:12, 0:25, etc.), which would give away the route for free copying.  
**Current approach:** Show landmark chips (Radcliffe Square, Bodleian, Bridge of Sighs, etc.) without order or timing. Actual route explained only after booking.  
**Why:** Intellectual property protection. The route is Diana's asset.

### 2. **College Admission Fees (Delegations & Tours)**
Previous versions claimed "no admission fees" throughout. This is now **corrected**: tours can include college entry **for an additional fee**. The fees belong to the college, not Oxford Hongkongers.  
**Checked in:** delegations.html (line ~370), walking-tours.html (meta description, FAQs, schema), membership.html  
**Why:** Accuracy & trust. Customers shouldn't discover hidden costs after booking.

### 3. **Bilingual Text Order**
All menu items, buttons, and page titles now follow **Chinese first, English second**:
- Menu: 主頁 Home, 活動 Events, 資源 Resources
- Buttons: 立即加入 Join Now, 提交查詢 Send Enquiry
- Titles: 會員優惠 Benefits, 牛津私人導賞團 Private Oxford Walking Tour

**Why:** Reflects the org's identity as a Hong Kong community group. Chinese is the primary audience.  
**Exception:** Privacy & Terms kept English-first (policy convention).

### 4. **Hidden Pages (SEO-Indexed but Not in Menu)**
Three pages are intentionally hidden from the main nav:
- `/walking-tours.html` ← linked from footer only
- `/delegations.html` ← linked from footer only  
- `/guide.html` ← totally hidden, `noindex` tag, `/guide` redirect only

**Why:** These are service offerings, not blog/info content. Menu stays clean. Footer discovers them for internal SEO + organic discovery.

### 5. **Photo Layout Decisions**
- **Delegations page:** Workshop photo moved to photo-strip; reordered as [workshop, hall, quad]. Cathedral photo removed (no longer serves purpose).
- **Tour photos:** 4:3 aspect ratio with `object-fit: cover` + centre crop (strategic—avoids cutting speakers/screens in workshop photo).
- **Responsive:** 3-column grid on desktop, 1-column on mobile (768px breakpoint).

**Why:** Tighter layout saves vertical space while keeping images readable. Centre crop is safer than top-aligned crop.

### 6. **Theme-Based Tours (vs. Itinerary-Based)**
Five preset themes + bespoke option, each with **its own route**:
1. Classic First Visit (landmarks + context)
2. Literary Oxford (Tolkien, Lewis, Carroll, Pullman)
3. Film & Fantasy (Harry Potter, Narnia, etc.)
4. Applying to Oxford (collegiate system, admissions, student life)
5. Settling in Oxford (markets, transport, costs, local tips)

**Why:** Allows targeting different customer segments without publishing the full itinerary. A customer says "I want Literary Oxford" → guide knows which stops to hit, which pub, which doorway. Route remains proprietary.

### 7. **Enquiry Form Strategy**
Both delegations.html and walking-tours.html use **Formspree** (form submission routing service).  
- Same endpoint for both: `https://formspree.io/f/mgognvrp`
- Arrives at: oxford.hker@gmail.com
- Separate hidden input `enquiryType` to distinguish tour vs. delegation in the email subject

**Why:** No backend needed. Formspree handles SPAM filtering, retry logic, and forwarding.

---

## Hidden Pages & Access Links

| Page | URL | Visibility | Purpose | Notes |
|------|-----|-----------|---------|-------|
| Walking Tours | `/walking-tours.html` (or `/tours`) | Footer link only | Private guided walks, 1–2 hrs | 5 themes + bespoke; college entry available |
| Delegations/Study Tours | `/delegations.html` (or `/delegations`) | Footer link only | Group visits, workshops, college access | 2-16 ppl; sample programme; multi-day packages |
| Field Companion Guide | `/guide.html` (or `/guide`) | **Completely hidden** | Reference guide for self-guided walks | `noindex` tag; not in sitemap; internal distribution only |
| Membership | `/membership.html` | Top menu | Join the community | £10/yr regular, £8/yr student |
| About Oxfordshire | `/about-oxfordshire.html` | Top menu | Local info for newcomers | Info on towns, jobs, healthcare, housing |
| Lunar New Year Market 2027 | `/lunar-new-year-market.html` | Redirect `/lny27-gg` | Past/upcoming event | Via vercel.json redirect |
| Lunar New Year Westgate 2027 | `/lunar-new-year-westgate.html` | Redirect `/lny27-wg` | Past/upcoming event | Via vercel.json redirect |
| Privacy Policy | `/privacy.html` | Footer link | Legal | Standard data protection statement |
| Terms & Conditions | `/terms.html` | Footer link | Legal | Standard terms for services |
| Events | `/events.html` | Top menu | **Stub** — expand with calendar | CTA to WhatsApp group currently |
| Resources | `/resources.html` | Top menu | **Stub** — expand with community links | Links to local services, newcomer guides |
| Benefits | `/benefits.html` | Linked from Membership | **Orphaned** — consider consolidating | Currently tab on membership page |

### Direct Links for Quick Access

**Public-facing:**
```
https://oxford-hk.com/
https://oxford-hk.com/walking-tours.html
https://oxford-hk.com/delegations.html
https://oxford-hk.com/membership.html
https://oxford-hk.com/events.html
https://oxford-hk.com/resources.html
https://oxford-hk.com/about-oxfordshire.html
```

**Hidden (reference only):**
```
https://oxford-hk.com/guide
https://oxford-hk.com/guide.html
```

**Redirects (via vercel.json):**
```
https://oxford-hk.com/tours → /walking-tours.html
https://oxford-hk.com/delegations → /delegations.html
https://oxford-hk.com/guide → /guide.html
https://oxford-hk.com/lny27-gg → /lunar-new-year-market.html
https://oxford-hk.com/lny27-wg → /lunar-new-year-westgate.html
```

---

## File Structure & Key Files

```
/
├── index.html                           (home page)
├── walking-tours.html                   (service page; protected route)
├── delegations.html                     (service page; protected itinerary)
├── guide.html                           (hidden reference; noindex)
├── membership.html                      (join page)
├── benefits.html                        (membership benefits tab)
├── events.html                          (stub; needs content)
├── resources.html                       (stub; needs content)
├── about-oxfordshire.html               (local info; in progress)
├── privacy.html                         (legal)
├── terms.html                           (legal)
├── lunar-new-year-market.html           (event page)
├── lunar-new-year-westgate.html         (event page)
├── styles.css                           (shared styles; bilingual)
├── scripts.js                           (hamburger menu, form handlers)
├── sitemap.xml                          (excludes /guide, includes public pages)
├── robots.txt                           (standard allow all)
├── vercel.json                          (redirects /tours, /delegations, /guide, LNY)
├── favicon.png                          (logo)
├── LOGO/
│   └── Oxford Hongkongers Logo (W).png
└── Event Highlights/
    ├── delegation-workshop.jpg/avif      (4:3 crop, 300px sticky left)
    ├── delegation-hall.jpg/avif          (Great Hall at Christ Church)
    ├── delegation-quad.jpg/avif          (Tom Quad outdoor briefing)
    ├── tour-briefing.jpg/avif            (guide stop; regenerated from Tour.jpg)
    └── [Tour.jpg]                        (source file; 1536×2048 never used directly)
```

### CSS Architecture
- **Single stylesheet** (`styles.css`) with BEM-like naming
- **CSS variables** for colours, spacing, shadows (e.g., `--navy`, `--gold`, `--paper`)
- **Responsive:** breakpoints at 768px (mobile), 900px (tablet-to-desktop)
- **Dark mode:** `@media (prefers-color-scheme: dark)` supported
- **No framework:** vanilla HTML/CSS for performance & control

### JavaScript
- **Minimal:** hamburger menu toggle, form submission alerts via Formspree
- **Accessibility:** semantic HTML, ARIA labels where needed
- **No external libs:** jQuery, Bootstrap, etc. avoided intentionally

---

## Important Configuration

### Vercel Deployment
- **Auto-deploys** on push to `main` branch via GitHub integration
- **Build command:** None (static site; no build step)
- **Environment:** Production = https://oxford-hk.com
- **Redirects:** Configured in `vercel.json`

### Formspree Integration
- **Endpoint:** https://formspree.io/f/mgognvrp
- **Email destination:** oxford.hker@gmail.com
- **Used on:** walking-tours.html (enquiry form), delegations.html (initial enquiry)
- **Hidden fields:** `enquiryType` (to distinguish tour vs. delegation in subject)

### DNS Configuration (Namecheap)
- **A records:** Point to Vercel IP
- **CNAME:** TBD (if needed for www subdomain)
- **Current:** oxford-hk.com resolves to Vercel

### Sitemap & Search
- **sitemap.xml:** Includes all public pages (home, walking-tours, delegations, membership, events, resources, about-oxfordshire)
- **Excludes:** /guide.html, /privacy.html, /terms.html (marked as informational, not service pages)
- **robots.txt:** Standard (allow all)
- **Schema.org:** JSON-LD structured data on walking-tours.html (TouristTrip + FAQPage)

---

## Known Quirks & Gotchas

1. **Image Optimization**
   - All service photos converted to AVIF + JPEG fallback via `<picture>` tag
   - Aspect ratios are enforced via CSS (`aspect-ratio: 4/3` or `16/9`)
   - ImageMagick sometimes crops from centre; verify `-gravity center` when regenerating

2. **Form Submissions**
   - Formspree forwards to oxford.hker@gmail.com; check spam folder
   - Each form submission triggers an alert popup (onsubmit handler) then redirects to home
   - Hidden `_subject` field customizes email subject

3. **Mobile Menu**
   - Hamburger icon appears below 768px
   - Click toggles `.active` class on `#navLinks`
   - Closing on link click is handled in `scripts.js`

4. **Bilingual Metadata**
   - OG tags and meta descriptions should have both languages for social sharing
   - Some older meta tags may have English-only descriptions; upgrade as needed

5. **Walking Tour Route Secrecy**
   - The 11-stop itinerary is **only in Diana's head and client conversations**
   - DO NOT add it to the public site or schema
   - Landmark chips are intentionally unordered

---

## Next Steps for Continuation

### Immediate (Week 1)
1. ✅ Verify enquiry forms are reaching oxford.hker@gmail.com (test both tours & delegations)
2. ✅ Mobile test on real devices (iPhone 12/14, Android)
3. ✅ Check Vercel deployment logs for any build/runtime errors

### Short Term (Week 2–3)
1. Flesh out **Events page:** add upcoming events or calendar (needs content from Diana)
2. Flesh out **Resources page:** community links, local services, housing guides
3. Expand **About Oxfordshire:** district profiles, job market, schools, healthcare
4. Consider **Analytics:** Google Analytics 4 or Vercel Analytics for traffic tracking

### Medium Term (Month 2)
1. **Testimonials/Reviews** — add social proof to tour/delegation pages
2. **Calendar integration** — show available dates directly on site (Calendly embed or custom)
3. **FAQ expansion** — add more Q&As based on real enquiries
4. **Email templates** — create auto-responders for tour/delegation enquiries

### Polish (Ongoing)
- Monitor and fix any reported broken links
- Update event pages as new events are planned
- Refresh team photos or add new testimonials
- SEO: monitor rankings for target keywords ("Oxford tour Cantonese", "牛津導賞團")

---

## Questions for Diana (Clarifications Needed)

1. **Events & Resources:** What content should go here? Links to specific local services? Community event listings?
2. **Membership:** Is the membership programme active? Are there partner merchant discounts to advertise?
3. **Analytics:** Should we track site traffic? If yes, which platform (GA4, Vercel Analytics, etc.)?
4. **Newsletter/Email:** Should there be a mailing list signup on the home page?
5. **Future Tours:** Are new tour themes planned (e.g., "Oxford for Foodies", "Architecture Tour")?

---

## Debugging Checklist

**If forms aren't submitting:**
- Check network tab in browser dev tools for 200 OK response from Formspree
- Verify email isn't in spam folder
- Test with a simple form on a test page

**If images aren't loading:**
- Verify file paths in `<picture>` tags (case-sensitive on Linux/Vercel)
- Check browser console for 404 errors
- Fallback JPEG should load even if AVIF isn't supported

**If redirects aren't working:**
- Verify `vercel.json` syntax (valid JSON)
- Redeploy: `git push origin main` (Vercel auto-deploys)
- Wait ~30s for DNS propagation

**If mobile layout breaks:**
- Check viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Test with Chrome DevTools device emulation (iPhone 12, Pixel 5)
- Verify CSS media queries at 768px and 900px breakpoints

---

## Handoff Checklist

- [x] All commits pushed to `main` branch
- [x] vercel.json redirects configured
- [x] sitemap.xml up to date
- [x] robots.txt in place
- [x] Bilingual text order unified (Chinese first)
- [x] Hidden pages configured (guide.html with noindex)
- [x] Form endpoints tested and documented
- [x] Image optimization verified (AVIF + JPEG fallbacks)
- [x] This handoff document created

**Status:** Ready for handoff. All files in GitHub; live on Vercel.

---

## Contact & Support

**Email:** oxford.hker@gmail.com  
**Repo:** Private GitHub (check with Diana for access)  
**Hosting:** Vercel (auto-deployed from GitHub main branch)  
**Domain:** oxford-hk.com (Namecheap DNS)

Good luck! 🚀
