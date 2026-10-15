# LumiX Website Audit & Research

**Date:** September 28–30, 2026  
**Auditor:** Antigravity AI (Pair Programming Assistant)  
**Target:** LumiX Platform Marketing Website ([getlumix.co](https://getlumix.co))

---

## Executive Summary

LumiX (formerly Lumi6) is building an **AI-native human capability platform** that bridges the "knowing-doing gap" in corporate training through realistic, multi-persona AI roleplays and continuous coaching. 

This audit provides a comprehensive baseline analysis of the existing web property across six UX/UI dimensions, documents verified product and business realities, evaluates design benchmarks (**Apple**, **Linear**, **Intercom**, **Synthesia**), and highlights the immediate architectural decisions required before proceeding to wireframing and design.

---

## 1. Current Website Structure & Inventory

The repository contains static HTML templates, modular stylesheets, and minimal vanilla JavaScript interactions. 

### Page Inventory & Status

| Page / Route | File Path | Current Status | Primary Role & Observations |
| :--- | :--- | :--- | :--- |
| **Homepage** | [`index.html`](index.html) | **Active** | Core brand positioning, platform preview video, 2x2 capabilities grid, typewriter transition statement, FAQ accordion, and startup recognition banner. |
| **Platform Deep-Dive** | [`product.html`](product.html) | **Orphan** | Sticky 4-stage product breakdown (*Compass*, *Practice*, *Coach*, *Intelligence*). Currently unlinked from the main navigation menu. |
| **Operating Principles** | [`principles.html`](principles.html) | **Orphan** | Comprehensive internal & public ethos documenting 11 cultural principles with audience filter chips and speech contrast boxes. Unlinked from nav/footer. |
| **Why We Exist** | [`why-we-exist.html`](why-we-exist.html) | **Active** | Brand narrative and manifesto accompanied by a cinematic video header. Linked in footer under Resources. |
| **Privacy Policy** | [`privacy.html`](privacy.html) | **Active** | Standard compliance document formatted via `legal.css`. |
| **Terms of Service** | [`terms.html`](terms.html) | **Active** | Platform terms of use formatted via `legal.css`. |
| **Use-Case Pages** | *None* | **Missing** | No pages targeting specific scenarios (e.g., Sales Objection Handling, Manager 1-on-1s, Customer Escalations). |
| **Solutions Pages** | *None* | **Missing** | No pages targeting specific organizational buyers (e.g., Enterprise L&D, Sales Enablement, People Ops). |
| **Industry Pages** | *None* | **Missing** | No vertical-specific relevance (e.g., Tech, Financial Services, Healthcare, BPO). |
| **Customer Stories** | *None* | **Missing** | Zero named case studies, testimonials, or ROI metrics. |

---

## 2. Screenshots & Visual Artifacts of Important Existing Pages

* **Current Homepage Hero (`index.html`):** Features the warm paper cream canvas (`#fffbf2`), tactile grain overlay, floating capsule navigation bar, and right-aligned video player card.
* **Capabilities Section (`index.html`):** 2x2 Capabilities grid illustrating the 4 capability pillars (*Compass Agent*, *AI Roleplay & Coach*, *Skill & Capabilities*, *Intelligence & Analytics*) divided by a central dotted rule.
* **Operating Principles Page (`principles.html`):** Editorial culture page featuring audience filter chips, numbered principle stamps, and 'You Don't Say vs. You Say' speech contrast boxes.

---

## 3. UX/UI Observations Across Six Dimensions

### A. Information Architecture
* **Orphan Pages:** `product.html` (the strongest visual walkthrough of the platform) and `principles.html` are completely disconnected from the homepage navigation and footer.
* **Anchor Hash Jump Dependency:** Homepage menu links (`#platform`, `#product`, `#faq`) jump to local page anchors rather than supporting scalable multi-page journeys.
* **Dead Links:** Footer links for *"About"* and *"Blog"* point to empty `#` anchors.

### B. Content Hierarchy
* **Overuse of Generic "Capability" Vocabulary:** Headlines across all sections repetitively rely on abstract phrases (*"Human Capability in Action"*, *"The AI Native Platform for Human Capability"*, *"Everything you need to build workplace capability"*), failing to immediately specify tangible business outcomes.
* **High-Density Transition Barrier:** An unbroken 43-word paragraph styled at `2.3rem` requires scroll-triggered word reveals, creating friction for readers skimming the page.
* **Buried Enterprise Context:** How LumiX ingests custom company playbooks and products is buried in bottom FAQ accordions.

### C. Visual Design
* **Pseudo-Interactive Capability Cards:** Capabilities cards display navigational arrow icons in their headers (`card-arrow-icon`), yet they are non-interactive `<div>` containers with no click behavior or keyboard focus states.
* **Visual Media Inconsistency:** Cards 1 and 2 feature dynamic looping `.mp4` video clips, while Cards 3 and 4 rely on static, lower-resolution raster JPEGs.
* **Typographic Sprawl:** The stylesheet loads 4 distinct typeface families (*Outfit*, *Plus Jakarta Sans*, *Inter*, and *Fira Sans*), increasing bundle size and visual dissonance.

### D. Product Storytelling
* **Lack of Connected Learning Loop:** The 4 platform pillars are presented as isolated boxes rather than a continuous, cyclical workflow (*Ingest Knowledge → Compass Journey → Real-World Simulation → Coaching Feedback → Skill Radar*).
* **Passive, Silent Video Demos:** Media loops silently without scrub bars, play/pause controls, zoom, or annotated callouts explaining the UI state.
* **No Interactive Sandbox:** An interactive product is marketed through a 100% passive reading experience.

### E. Conversion
* **Offsite Redirect Friction:** All primary CTAs (*"Book a Demo"*, *"Contact Us"*, *"See it in action"*) redirect to a third-party hosted form (`https://tally.so/r/wM0JlY`), removing enterprise prospects from the website domain.
* **Single-Track Funnel:** No mid-funnel, low-commitment conversion actions (e.g., self-guided interactive tour, scenario preview, capability framework download).
* **Premature Hero CTA:** Visitors are asked to book a demo before seeing the product interface or understanding how it integrates.

### F. Responsiveness & Accessibility
* **Complete Loss of Mobile Navigation:** The CSS media query explicitly sets `.nav-menu { display: none; }` on viewports `< 768px` with no mobile drawer or hamburger menu replacement.
* **Incomplete ARIA Bindings:** Only FAQ item 1 possesses `aria-controls="faq-answer-1"`; items 2–6 lack accessible relationship attributes.
* **Unpausable Looping Media:** Violates WCAG 2.2.2 (Pause, Stop, Hide) for users with vestibular or attention sensitivities.

---

## 4. Strengths Worth Preserving

1. **Distinctive "Warm Paper Canvas" Identity:**
   * The `#fffbf2` cream canvas, organic warm pastel gradients (peach, terracotta, blush rose), and subtle SVG noise overlay give LumiX a tactile, thoughtful personality that stands out from generic dark-mode AI tools or sterile corporate blues.
2. **Compass Brand Metaphor:**
   * The compass needle iconography and positioning as a *"guiding partner"* effectively frames the AI as an empowering mentor rather than an intimidating surveillance tool.
3. **Scroll-to-Capsule Navbar Transition:**
   * The floating capsule morph on scroll (`styles/navbar.css`) provides a slick, modern micro-interaction with excellent backdrop blur.
4. **Editorial Voice of the Principles & Manifesto:**
   * The copy in `principles.html` and `why-we-exist.html` is exceptionally well written, articulating a compelling philosophy on why active rehearsal beats passive content consumption.

---

## 5. Strategic Problems & Opportunities

* **Opportunity 1 (Unified Multi-Page Architecture):** Connect `product.html` and `principles.html` into a clean multi-page hierarchy with an active mobile navigation drawer.
* **Opportunity 2 (Native On-Domain Booking):** Replace the third-party Tally form redirect with an embedded modal or interactive calendar to prevent conversion leakage.
* **Opportunity 3 (Role-Segmented Solution Tabs):** Introduce dedicated buyer views (*For Sales*, *For Leadership*, *For Support*) demonstrating specific workplace scenarios.
* **Opportunity 4 (Connected 4-Step Learning Loop):** Transform the 2x2 grid into a connected circular workflow (*Ingest Knowledge → Journey → Roleplay → Coach & Analytics*).

---

## 6. Reference Websites & Relevant Design Patterns

1. **Apple (Product Presentation & Whitespace):**
   * *Pattern for LumiX:* Increase vertical whitespace; isolate the primary simulation view; add 2–3 high-contrast proof metrics right beneath the hero headline.
2. **Linear (Interface Previews & Bento Consistency):**
   * *Pattern for LumiX:* Replace static JPEG capability cards with high-density, interactive bento cards bordered with warm charcoal rules (`rgba(26, 26, 26, 0.12)`).
3. **Intercom (B2B Storytelling & Solution Flywheels):**
   * *Pattern for LumiX:* Introduce persona tabs (*For Sales Teams*, *For People Managers*, *For Customer Support*) and a connected 4-step learning flywheel.
4. **Synthesia (AI Product Demonstration & Use-Case Matrix):**
   * *Pattern for LumiX:* Add an interactive scenario sandbox allowing visitors to test an objection handling or coaching prompt directly on the page.

---

## 7. Clarifications for Leadership

1. **Target Customer Wedge:** Which persona is our #1 immediate focus (Sales Enablement, Enterprise L&D, or First-Time People Managers)?
2. **Customer Proof & Case Studies:** Can we feature 1–3 beta/pilot customer quotes or quantified metrics?
3. **Conversion Infrastructure:** Are we ready to replace the external Tally link with a native on-site scheduling modal?
4. **Interactive Sandbox:** Should we build a self-serve 30-second simulation preview directly on the homepage?
5. **Supported Integrations:** Which enterprise LMS/HRIS systems (Workday, Slack, Teams, Salesforce) can we highlight as confirmed integrations?

---
