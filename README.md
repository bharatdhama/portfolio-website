# BD / FLIGHT MODE

A playable, static portfolio for **Bharat Dhama — Palantir Foundry Developer & AI Application Engineer**. No backend, framework, runtime packages, analytics, cookies, or build dependency installation is required.

## Start locally

Requires Node.js 22 or newer. From the exported `flight-mode` directory:

- `node scripts/build.mjs` — validates source and creates `dist/`.
- `node --test tests/engine.test.cjs` — runs deterministic physics tests.
- `node scripts/serve.mjs` — serves the production build at http://localhost:4173.

Equivalent npm shortcuts are `npm run build`, `npm test`, and `npm run dev`; there are no npm packages to install. Open the HTTP URL, not a `file://` URL. Browser storage behavior is more predictable over HTTP.

## Design and architecture

Midnight Ink, Warm Paper, Flight Lime, and Signal Blue. Space Grotesk for editorial/UI typography and IBM Plex Mono for instrumentation. Fonts use Google Fonts with system fallbacks; the entire core experience works when fonts are unavailable.

- `src/index.html`: semantic hero, navigation, project summaries, About, skills, contact, and native case-study dialog.
- `src/styles.css`: design tokens, responsive layouts, focus states, and reduced-motion overrides.
- `src/game/engine.js`: DOM-independent physics/state machine. 520 × 390 logical scene; 120 Hz fixed simulation; gravity and impulses in pixels/seconds; collision checks include pipe caps. No per-frame DOM rendering.
- `src/app.js`: structured case-study data, dialog and navigation controllers, Canvas renderer, HUD, input, lifecycle and resize handling.
- `public/assets/images/favicon.svg`: original pixel-bird icon.
- `public/assets/data/Bharat-Dhama-Resume.pdf`: original supplied résumé, unchanged.
- `public/assets/data/resume.json`: lossless PDF byte resource for the portable preview's runtime view/download links; the static export also includes the original PDF fallback.
- `scripts/build.mjs`: dependency-free static production build and local-reference validation.
- `scripts/serve.mjs`: dependency-free local HTTP preview.
- `tests/engine.test.cjs`: actual state/physics/collision/scoring tests.
- `tests/browser.mjs`: real Chromium interaction and responsive checks over Chrome DevTools Protocol pipes. Launches Chromium itself and fulfills HTTP requests from `dist/` so the suite needs no local network sockets.
- `.github/workflows/pages.yml`: test, build, upload, and deploy using GitHub Pages Actions.

The export separates the self-contained preview into maintainable HTML, CSS, and JavaScript files. The engine is isolated from UI and can be tested without a browser. Accessible interface controls stay in HTML. requestAnimationFrame uses a fixed-step accumulator; device pixel ratio is capped at 2. ResizeObserver, IntersectionObserver, visibility handling, and page lifecycle cleanup prevent unnecessary background work.

## Controls

- Start using the main button, the game panel's button, or Enter/Space while the canvas is focused.
- Space, Arrow Up, W, click or tap flap. Held keys do not repeat flaps.
- Escape or the pause button pauses/resumes. Enter starts/restarts only from a menu state.
- Leaving the game by tabbing, navigating, hiding the page, or scrolling it offscreen pauses play. Return and explicitly resume.
- The best score is stored under `bd-flight-best-v1` in localStorage. If storage is blocked, the game remains playable and the best score is visit-only. No external storage is used.
- No sound is implemented, so there is no audio autoplay or sound setting to maintain.
- Skip-game links and conventional navigation always expose the portfolio. Nothing is unlocked by scoring.

## Content integrity

Facts come from the supplied two-page résumé and explicit project details in the build brief. No client names, testimonials, model-accuracy claims, business uplift, or live production datasets are invented. All project previews are labelled original schematics. Customer Churn describes visualization of an **existing** model, not training it. KPI Navigator is an editorial presentation of the supplied KPI application scope; it is not evidence of a separate client engagement.

The contact email `randomshortsytube@gmail.com` was supplied in the conversation. No verified LinkedIn or GitHub profile URL was supplied; those links are intentionally absent. Add only verified profile URLs if desired. Data Quality Scorecard and Adoption Logs were omitted because details were not established. Case-study engineering considerations are explanatory rationale, not claimed measured outcomes.

## Accessibility

Semantic landmarks, heading hierarchy, visible focus, skip link, conventional anchor navigation, labelled Canvas controls, and polite state announcements. The native dialog supports Escape and an explicit close button and restores focus to its opener. Reduced motion stops idle bird bobbing, parallax, particles, score animation, and smooth scrolling; game motion continues only when the visitor opts into play. Portfolio summaries remain readable with JavaScript disabled; full case-study dialogs and gameplay require JavaScript. The game is an optional visual interaction, not an equivalent screen-reader game.

## Deploy to GitHub Pages

No repository or remote was supplied during creation. No remote was modified and no live deployment is claimed. This package is ready for either a project repository or a user-site repository.

1. Create a repository in your GitHub account (or choose an existing repository and review its files before merging). For a project site, any repository name works. For a user site, use your actual `<username>.github.io` repository.
2. Extract the package and place the **contents** of the `flight-mode` directory at the repository root. Preserve `.github/workflows/pages.yml` and `.gitignore`; some file browsers hide dot-folders.
3. Confirm `node --test tests/engine.test.cjs` and `node scripts/build.mjs` succeed locally.
4. Commit the files and push them to the repository's `main` branch yourself. The generated workflow runs on `main`; change the branch in its `on.push.branches` if needed.
5. In the repository on GitHub, open **Settings → Pages** and choose **GitHub Actions** as the build/deployment source.
6. Run or allow the **Deploy FLIGHT MODE to Pages** workflow to complete. The deploy job exposes the actual site URL as its `github-pages` environment URL. Use that URL rather than guessing your account/repository address.
7. Check the live game, résumé download, section links, and phone layout at that actual URL.

### Why no Vite base setting?

The source is deliberately vanilla and requires no Vite installation. Every local asset and script is a **relative path**, with no root-leading slash, no router, and no absolute deployment origin. Therefore the same output works at a domain root or any project path without knowing the repository name. Hash links keep navigation on the current page. The workflow deploys `dist/`, and `dist/.nojekyll` avoids Jekyll processing. There is no server-rewrite dependency and no 404 routing workaround.

For a manual deployment, upload only the generated `dist/` contents to your configured static host. Do not upload `src/` alone. No secrets or API keys are required. Action versions are pinned to stable major versions; review and pin immutable SHAs according to your repository's supply-chain policy.

## Browser QA

After building, run `node tests/browser.mjs` with Chromium installed (`CHROMIUM` can specify its executable). No Playwright, Selenium, debugging server, or local network is needed: CDP pipes connect directly to headless Chromium, and the suite serves exact `dist/` bytes through request interception. The tests exercise the production HTML, CSS, JavaScript and Canvas. Run `BASE_PATH=/test-repo/ node tests/browser.mjs` for the nested project-site fixture. Set `REPORT_PATH` and `SCREENSHOT_DIR` to save JSON reports and responsive screenshots. Both root and nested test runs are included under `qa/` in the source archive; scope and environment limits are in `QA-REPORT.md`.

## Maintenance

Edit project entries in `src/app.js` and visible project summaries in `src/index.html` together. Edit visual tokens at the top of `src/styles.css`; all critical content remains HTML. Update the résumé by replacing the existing PDF. Confirm current career dates and email before a public launch. Update metadata if your professional positioning changes. Add a canonical URL and absolute Open Graph image only after the real deployment URL/share image is established. There are no trackers or contact-form submissions.
