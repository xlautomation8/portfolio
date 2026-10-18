# aiquality.in — Enhancement TODO

Top 10 enhancements, ranked by impact (review of 2026-10-18).
Quick wins: items 1–5 and 9 (~1 day, no redesign). Differentiators: items 6–8.

## 1. Make the site findable by search engines
An exact search for `"aiquality.in"` returns no pages from the site. `robots.txt`, `sitemap.xml` and unknown paths all return GitHub's default 404.
"aiquality" also competes with Indian "air quality" searches and an unrelated product, AIQualityHQ. Target "Utkarsh Sinha" plus specific phrases.

- [x] Add `robots.txt`
- [x] Add `sitemap.xml`
- [x] Add `<link rel="canonical">` to every page
- [x] Add a custom `404.html`
- [ ] Register in Google Search Console and Bing Webmaster Tools; submit the sitemap

## 2. Add social preview tags (for LinkedIn and WhatsApp shares)
There are no Open Graph or Twitter card tags, so shared links show a plain, unbranded preview.

- [ ] Add `og:title`, `og:description`, `og:url`, `og:type`
- [ ] Create a 1200×627 `og:image`; set `og:image:width` / `og:image:height` (LinkedIn may reject the image without them)
- [ ] Add `twitter:card` tags
- [ ] Check the preview in LinkedIn Post Inspector

## 3. Add structured data
- [ ] Add a JSON-LD `ProfilePage` + `Person` block: `name`, `jobTitle`, `image`, `alumniOf` (UT Austin), `knowsAbout` (AI test automation, RAG, LLM evaluation), `sameAs` (LinkedIn, GitHub)
- [ ] Validate with Google's Rich Results Test

## 4. Fix the empty `<h1>`
`index.html:46` ships an empty `<h1>` that `script.js` types the name into, so crawlers and no-JS visitors see no heading. Screen readers may announce partial text like "U▌", "Ut▌".

- [ ] Put "Utkarsh Sinha" directly in the HTML
- [ ] Run the typing effect on a separate decorative `aria-hidden` span
- [ ] Add `prefers-reduced-motion` handling for the typing effect and blinking cursor (none exists in `style.css`)

## 5. Make the numbers agree
- [ ] Regression-cycle reduction: 60% (`index.html:115`) vs 40% (`index.html:100`, `index.html:160`). Pick one.
- [ ] Engineers mentored: 20+ (hero/About) vs 15+ (`index.html:162`). Pick one.
- [ ] "70%" is used for both automation coverage and the cut in manual test-design effort. Make sure each is accurate and clearly labelled.
- [ ] `etl_framework.groovy` is described as a Spring Boot + JUnit (Java) framework. Fix the filename or the description.
- [ ] `qa_agent.js`: confirm the language matches the real implementation (LangGraph is commonly Python)
- [ ] Remove the 10+2 entry; add years to the B.E.

## 6. Build the "AI Quality" brand the domain promises
The title, logo (`~/utkarsh`) and headline never say "AI Quality".

- [ ] Work "AI Quality" into the headline, logo and `<title>`
- [ ] Start a content hub: 4–6 articles on testing LLM apps, RAG evaluation, guardrails, testing AI agents
- [ ] Optional: a `/playbook` page laying out your AI-QA approach

## 7. Turn "Selected Work" into evidence
None of the six project cards link anywhere.

- [ ] Give each project a case study page: problem → architecture diagram → decisions → measured outcome
- [ ] Add sanitized code or a GitHub repo where possible
- [ ] Record a 2-minute demo video of the LangGraph QA agent
- [ ] Add a GitHub link to the contact section
- [ ] Add a "book a 20-minute call" link (Calendly or similar) as the main CTA

## 8. Show your QA practice on the site itself
`tests/portfolio.spec.ts` has only 4 tests. From the repo layout, Pages appears to deploy straight from `main`, so failing tests don't stop a release.

- [ ] Add axe-core accessibility tests
- [ ] Add Lighthouse CI with performance and SEO budgets
- [ ] Add a broken-link checker
- [ ] Add visual-regression screenshots
- [ ] Add HTML validation
- [ ] Deploy through GitHub Actions only after tests pass
- [ ] Publish a public `/quality` page with badges and the latest report

## 9. Speed up loading
- [ ] Profile photo (`index.html:85`): remove `loading="lazy"`; add `fetchpriority="high"`, `width`, `height`
- [ ] Convert certificates (~1.6 MB PNG/JPG, one 716 KB JPG) to WebP; show thumbnails, load full size only in the lightbox
- [ ] Cut Google Fonts down to the weights actually used (8 loaded now), or self-host
- [ ] Rename files with spaces (`UTKARSH SINHA_….pdf`, `BA RPA.png`, etc.)
- [ ] Fix the folder typo `assets/certfificates/` → `assets/certificates/` (update all links and tests)

## 10. Accessibility, privacy and finishing touches
- [ ] Add a `<main>` landmark to `index.html`
- [ ] Give certificates real alt text (currently "Certificate 1–4")
- [ ] Lightbox: `role="dialog"`, Escape to close, focus trap, return focus to the thumbnail on close
- [ ] Add `aria-expanded` to the mobile menu button
- [ ] Add `:focus-visible` styles
- [ ] Mark decorative icons (▲ ◆ ✓ ★) and terminal prompts `aria-hidden`
- [ ] Decide whether to keep the phone number public (scraper/spam risk); consider a contact form or booking link
- [ ] Decide whether to keep `"status": "open_to_opportunities"` visible next to your current employer's name

## References
- [Google — ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [LinkedIn — Image specifications (1.91:1, 1200×627)](https://www.linkedin.com/help/linkedin/answer/70781)
- [Unlighthouse — Don't lazy-load your LCP image](https://unlighthouse.dev/learn-lighthouse/lcp/lcp-lazy-loaded)
- [Front-End Checklist — fetchpriority](https://frontendchecklist.io/rules/performance/fetchpriority-attribute)
