# Lumi6 Platform Showcase

Lumi6 transforms goals into personalized learning journeys. From understanding each learner's context to generating realistic practice, delivering feedback, and adapting every step, the platform helps people build workplace capability through continuous practice.

This repository houses the premium, highly interactive static showcase website for the Lumi6 platform.

---

## 🎨 Premium Visual Architecture

The website is designed with a modern, glassmorphic aesthetic that feels premium, tactile, and alive:
* **Tactile Grain Overlay**: An ambient vector noise filter overlays the entire page viewport, giving a textured canvas paper quality.
* **Fluid Background Gradients**: Ambient, compression-optimized colorful meshes blend sections seamlessly.
* **Interactive Media Players**: Responsive loop players with custom playback rates (slowed to `0.8x`) showing platform workflows.
* **Drifting Atmospheric Clouds**: An inline vector SVG cloud backdrop drifts slowly behind the hero text stack using horizontal, vertical, and rotational CSS transforms.

---

## ✍️ Typographic Hierarchy & Visual Rhythm

Following a strict typographic system, the copy uses three Google fonts configured with specific weights and sizes to ensure high contrast, readability, and modern aesthetics:

### 1. Outfit (Brand Identity)
* **Usage**: Reserved exclusively for brand-defining elements (logo text, hero main header, section statements).
* **Weights**: `700` (Bold) only.
* **Sizes**: Hero statement at `4.5rem` (~72px), CTA statement at `3.2rem` (~51px).

### 2. Plus Jakarta Sans (Structure & Interaction)
* **Usage**: Page structure headings, navigation links, expanded accordion questions, and action buttons.
* **Weights**: `500` (Medium) / `600` (SemiBold).
* **Sizes**: Section headers at `2.8rem` (~45px), interactive items at `15px` - `18px`.

### 3. Inter (Reading Context)
* **Usage**: Reading paragraphs, descriptions, tags, badges, and FAQ answers.
* **Weights**: `400` (Regular) / `500` (Medium). Never uses `700` for body paragraphs.
* **Sizes**: Paragraph bodies at `1.15rem` (~18px), labels at `0.75rem` (~12px), answers at `1rem` (~16px).

---

## 📱 Mobile Responsiveness & Breakpoints

The site is fully responsive across mobile, tablet, and desktop screens:
* **Adaptive Navbar**: Scroll-to-capsule transition. On screens `< 768px`, the middle navigation links hide automatically to preserve a clean look.
* **Stacking Grids**: Hero grid, Platform columns, and FAQ columns stack vertically on mobile to maximize readability.
* **Proportional Scaling**: Headings, descriptions, margins, and video frames scale proportionally to fit smaller screen sizes.

---

## 🛠️ Vercel Deployment Configuration

Because this project is linked to a Vercel project preset as **Vite**, but contains static HTML/CSS code, we utilize a file-based configuration override inside `vercel.json` to copy the files to the `/dist` directory for static serving:

```json
{
  "buildCommand": "mkdir -p dist && cp -r index.html styles images js vercel.json dist",
  "outputDirectory": "dist"
}
```

This dummy build script makes sure the deployment completes successfully without requiring Vite compilation.
