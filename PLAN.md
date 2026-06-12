# Wave Gallery — Feature Plan

## Scope
1. **Dark/Light mode toggle** — placed to the right of the Samuthra logo. Global theme via CSS variables + `data-theme` attribute on `<html>`, persisted in `localStorage`, respects `prefers-color-scheme` on first load.
2. **Slideshow (page-flip) mode** — new icon alongside the existing grid/masonry layout toggle. Opens a full-screen flipbook viewer built with custom CSS 3D transforms (no external lib). Uses the same photo list as the gallery.
3. **Scroll-to-top floating button** — bottom-right, fades in after scrolling past a threshold, smooth-scrolls to top.
4. **Spacing/margin audit** — normalize paddings/margins across `app.scss`, `photo-list.scss`, `footer.scss`, `video-container.scss` using a consistent spacing scale (CSS variables), remove ad-hoc inline `style="margin..."` from templates.
5. **Time-of-day logo toggle** — clicking the Samuthra logo swaps to a cropped region of a 24-logo sprite sheet matching the current hour; clicking again reverts to `samuthra.ico`.

## Decisions (confirmed with user)
- Slideshow: custom CSS 3D flip component (Angular), no jQuery/Turn.js.
- Dark mode: global, `<html data-theme="dark|light">`, CSS variables.
- Logo toggle: simple 2-state toggle (default ↔ hour logo).
- Sprite sheet: user will place image in repo and provide path — **blocked until provided**.

## Status
| # | Task | Status |
|---|------|--------|
| 1 | Theme service + toggle button | pending |
| 2 | Slideshow component (flip effect) | pending |
| 3 | Scroll-to-top button | pending |
| 4 | Spacing/margin cleanup | pending |
| 5 | Time-of-day logo (needs sprite asset) | **blocked — waiting on image file** |

## Open question
Please save the 24-logo sprite image into the repo, e.g. `public/time-logos.png`, and confirm the grid layout (looks like 6 columns × 4 rows, hours 00:00–23:00 left-to-right, top-to-bottom) and exact filename/path.