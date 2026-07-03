# Trupeer.ai Design System Review & Guidelines

This document outlines the visual design system, colors, typography, buttons, boxes, menus, and grainy texture overlays inspired by [Trupeer.ai](https://www.trupeer.ai/). Use these guidelines to build premium, modern web applications that carry the same organic, tactile, and retro-technical aesthetic.

---

## 1. Design Language Overview

The design system of Trupeer.ai can be characterized as **Warm Retro-Brutalism** (or **Tactile Technical**). It is a highly premium, human-centric design style that rejects sterile corporate aesthetics in favor of:
*   **Tactile Textures:** Warm, paper-like off-white background canvases instead of cold pure whites.
*   **Pastel Color Blends:** Muted, organic, and soft colors paired with dark charcoal ink.
*   **Structural Definition:** Clean geometric box layouts, thin dark borders, and smooth multi-layered shadows.
*   **Playful Typography:** A mixture of eccentric headlines (like Bricolage Grotesque), retro editorial serifs (like Kalice), and clean body copy (like Inter).

---

## 2. Color Palette (Tokens)

Trupeer uses a curated, organic color palette. Avoid pure black (`#000000`) and pure white (`#ffffff`) for layouts, opting instead for charcoal and warm off-whites.

### Base Canvas & Backgrounds
*   **Cream Canvas (Default):** `#fffbf2` (A warm, soft off-white resembling high-quality paper)
*   **Sandy Cream (Inputs/Fills):** `#f7eedb`
*   **Cream Yellow:** `#fff1d5`
*   **Dark Charcoal (Dark Sections):** `#1a1a1a` (Used for full dark hero/pricing bands or footer containers)

### Pastel Accents (Gradients & Cards)
*   **Accent Gold:** `#fcce58`
*   **Hover Gold:** `#feebba`
*   **Soft Orchid (Pink):** `#ed9dde` / `#FFD1DC`
*   **Blush Rose:** `#f8ebe7` / `#e9b7aa`
*   **Soft Sky Blue:** `#9fd6ef`
*   **Soft Mint / Ice:** `#cce5e9`
*   **Pale Sage:** `#e3efd2` / `#dae9c4`

### Text & Ink
*   **Primary Charcoal:** `#1a1a1a` (Main text, headings, and high-contrast borders)
*   **Body Gray:** `#525252` or `#737373` (For secondary body copy)
*   **Slate Gray:** `#7e8191` (For caption text, helper notes, and metadata)

### Borders & Overlays
*   **Primary Border Charcoal:** `rgba(26, 26, 26, 0.6)` (`#1a1a1a99`)
*   **Subtle Gray Border:** `rgba(26, 26, 26, 0.15)` (`#1a1a1a26` - used for standard card borders)
*   **Divider Gray:** `rgba(26, 26, 26, 0.2)` (`#1a1a1a33` - used for horizontal dividers)

---

## 3. Typography System

Trupeer blends three font styles to achieve its retro-modern, technical look.

### Fonts
1.  **Eccentric Headings: `Bricolage Grotesque`**
    *   *Usage:* Main page titles (H1), feature headers, and prominent statistics.
    *   *Feel:* High-energy, playful curves, and quirky terminal cuts.
    *   *Google Fonts Link:* `<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet">`
2.  **Editorial Serif: `Kalice` (or `Lora` / `Playfair Display` as alternatives)**
    *   *Usage:* Bold italicized subheadings, quotes, testimonials, and brand narratives.
    *   *Feel:* Vintage, literary, intellectual.
3.  **Clean Body: `Inter` (or `Stack Sans Text` / `Geist`)**
    *   *Usage:* Standard body paragraphs, form labels, buttons, and navigation menus.
    *   *Feel:* Neutral, highly legible, precise.
4.  **Metadata/Tags: `Fragment Mono` (or `Geist Mono` / `IBM Plex Mono`)**
    *   *Usage:* UI tags, small badges, inline code, step indicators, and small numeric callouts.
    *   *Feel:* Retro-technical, typewriter, precise.

### Typographic Scales (CSS)
```css
h1 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 3.5rem; /* 56px */
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--color-charcoal);
}

h2 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 2.25rem; /* 36px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.subheading-serif {
  font-family: 'Kalice', 'Lora', serif;
  font-style: italic;
  font-weight: 500;
  font-size: 1.5rem;
}

body {
  font-family: 'Inter', sans-serif;
  font-size: 1rem; /* 16px */
  line-height: 1.6;
  color: var(--color-body-gray);
}

.metadata-mono {
  font-family: 'Fragment Mono', 'Geist Mono', monospace;
  font-size: 0.75rem; /* 12px */
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

---

## 4. Boxes & Cards

Boxes are structured like tactile cards, sitting on the warm cream background with soft shadows and thin lines.

```css
.card-box {
  background-color: var(--color-white-pure, #ffffff);
  border: 1px solid rgba(26, 26, 26, 0.15);
  border-radius: 12px; /* standard border radius */
  padding: 24px;
  position: relative;
  overflow: hidden;
  
  /* Smooth 3-Layered Depth Shadow */
  box-shadow: 
    0px 0.6px 2.0px -0.5px rgba(0, 0, 0, 0.08), 
    0px 2.3px 7.8px -1.0px rgba(0, 0, 0, 0.10), 
    0px 10.0px 34.0px -1.5px rgba(0, 0, 0, 0.18);
  
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), 
              box-shadow 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* Hover State: card lifts and shadow broadens */
.card-box:hover {
  transform: translateY(-4px);
  box-shadow: 
    0px 1.2px 4.0px -0.5px rgba(0, 0, 0, 0.06), 
    0px 4.6px 15.6px -1.0px rgba(0, 0, 0, 0.08), 
    0px 20.0px 60.0px -1.5px rgba(0, 0, 0, 0.14);
}
```

*   **Corner Radii Scale:**
    *   Small (Tags/Badges): `6px`
    *   Medium (Buttons/Standard Cards): `8px` or `12px`
    *   Large (Containers/Banners): `16px` or `32px`

---

## 5. Buttons

Buttons feel physical, satisfying to click, and use a neat "lift" hover effect.

### Primary Button
Solid charcoal background, white text, sharp rounded corners, and a micro-interaction hover.
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  color: #fffbf2;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem; /* 14px */
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px; /* or 32px for pill-shape */
  border: 1px solid #1a1a1a;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s cubic-bezier(0.44, 0, 0.56, 1),
              box-shadow 0.2s cubic-bezier(0.44, 0, 0.56, 1),
              background-color 0.2s;
}

.btn-primary:hover {
  background-color: #262626;
  transform: translateY(-2px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}
```

### Secondary / Outline Button
Transparent background with a thin charcoal border.
```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid rgba(26, 26, 26, 0.2);
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, transform 0.2s;
}

.btn-secondary:hover {
  background-color: rgba(26, 26, 26, 0.04);
  border-color: rgba(26, 26, 26, 0.6);
  transform: translateY(-1px);
}
```

---

## 6. Box Menus & Menubars (Navbars)

The top navigation bar acts as a floating glass box with sharp boundaries and high-end backdrop-filters.

### Structure & Layout
*   **Height:** `64px` - `72px`
*   **Sticky Position:** Stays at the top of the viewport.
*   **Backdrop Filter:** Blurs the underlying text/images, giving a matte frosted glass appearance.

```css
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 68px;
  background-color: rgba(255, 251, 242, 0.8); /* Cream background with 80% opacity */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(26, 26, 26, 0.08); /* Extremely thin bottom border */
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### Menu Items
Menu navigation links are clean, low contrast, and react smoothly when hovered.
```css
.nav-links {
  display: flex;
  gap: 28px;
  list-style: none;
}

.nav-link-item {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  color: rgba(26, 26, 26, 0.6); /* Muted by default */
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 6px;
  transition: color 0.2s, background-color 0.2s;
}

/* Hover pill background overlay */
.nav-link-item:hover {
  color: #1a1a1a;
  background-color: rgba(26, 26, 26, 0.05); /* Soft gray pill background */
}

.nav-link-item.active {
  color: #1a1a1a;
  font-weight: 600;
  background-color: rgba(26, 26, 26, 0.08); /* Muted active pill */
}
```

---

## 7. Grainy & Noisy Theme Implementation

To achieve the signature "noisy/grainy" texture overlay seen in organic and tactile websites, we can overlay a static SVG fractal noise element. This makes the solid background colors look textured and premium.

### CSS-Only SVG Turbulence Noise Overlay

Add an overlay `div` immediately inside your `<body>` tag:
```html
<body>
  <!-- The Noise Overlay Container -->
  <div class="noise-overlay"></div>
  
  <!-- Rest of your application code -->
  <main>
    ...
  </main>
</body>
```

Use the following CSS to inject the grainy texture:
```css
.noise-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  content: "";
  opacity: 0.06; /* Adjust opacity: 0.04 to 0.08 is the sweet spot for subtle grain */
  z-index: 9999; /* Place above everything */
  pointer-events: none; /* Crucial: allows clicking through the overlay */
  
  /* Inline SVG noise filter as background */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

### Explaining the SVG Filter Parameters
*   `type="fractalNoise"`: Produces a soft, clouds-like organic noise rather than harsh sharp points (`turbulence`).
*   `baseFrequency="0.75"`: Sets the density of the grain. High numbers (`0.75` - `0.95`) create very fine, sand-like grain, while low numbers (`0.2` - `0.45`) create large splotchy textures.
*   `numOctaves="3"`: Adds layers of detail to the noise, creating a richer texture.
*   `opacity: 0.06`: Keeps the noise texture extremely subtle. It should only be noticed upon close inspection to feel premium and organic.
