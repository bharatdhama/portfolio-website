# FLIGHT MODE — QA report

**Run:** 18 October 2026. Source build and simulated-page checks in the available Chromium 26 sandbox. No repository was supplied and no remote deployment was run.

## Results

- **Physics and state machine:** `node --test tests/engine.test.cjs` — 15/15 passed. Covers idle/no-autoplay, start/flap/gravity, pause/resume, ceiling/floor/pipe-body/pipe-cap collisions, safe gap, exactly-once score, scrolling/removal, obstacle gap bounds, restart reset, deterministic steps, and negative-delta handling.
- **Production build:** `node scripts/build.mjs` — passed. Validated 21 local HTML resource references, parsed the game and app scripts, and generated a 76,056-byte static `dist/` directory.
- **Real Chromium UI/game:** `node tests/browser.mjs` — 19/19 checks passed at the root path and again under `/test-repo/`. Both runs reported **zero uncaught JavaScript exceptions** and **zero console errors**.
- **Layout:** no horizontal document overflow at widths 360, 390, 768, 1024, or 1440 CSS pixels. The suite also verifies the navigation labels themselves fit the viewport at each width.
- **Portfolio:** all six case-study actions open the right case study, expose its seven detail sections, and return keyboard focus to the opening control. Section navigation works while the game remains idle.
- **Game:** Enter starts/restarts; Space, W, and Arrow Up flap without scrolling; pointer input works; Escape and the HUD button pause/resume; leaving the game pauses it; collision ends the flight; restarting clears its score; an automated pilot passed real obstacle pairs and verified the personal best after a reload; touch input and active-game scroll containment work on the mobile emulation.
- **Other checks:** the supplied résumé PDF responds locally and its bytes match the original upload; reduced-motion CSS behavior and a visible focus indicator were checked.

## Test method and limits

Chromium was launched headlessly using Chrome DevTools Protocol pipes. Because this execution environment blocks local sockets, the browser suite fulfilled requests directly from the production build rather than opening a local HTTP port. This checks rendered HTML, CSS, JS, Canvas interactions, local assets, and both root/nested deployment paths; it is not an actual GitHub Pages deployment. The Google Fonts CSS response was deliberately left empty to exercise the bundled system-font fallback. Live external font loading was not measured.

Browser QA was performed in the available Chromium only. Firefox, Safari, Edge, physical iOS/Android devices, screen-reader output, network-performance profiling, and a real GitHub repository/Pages deployment were not tested. As a result, do not interpret this as cross-browser or live-host certification.
