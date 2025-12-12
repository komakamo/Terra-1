# Mini Terraria Clone

This repository hosts a browser-based Terraria-inspired sandbox. Assets are **not** stored in Git to keep the project lightweight and avoid bundling licensed media.

## Getting assets
The game expects the following files alongside `index.html`:

- `assets/bgm_day.mp3`
- `assets/tiles.png`
- `assets/images/blocks1.jpg`
- `assets/images/blocks2.jpg`

Download the official asset bundle shared by the project maintainers (for example from a release download or shared drive) and place the files in the paths above. If you do not have access to the bundle, you can provide your own files with the same names or generate quick placeholders (e.g., a simple 32x32 PNG for `tiles.png` and small JPGs for the block textures) to unblock development.

## Running locally
1. Download or create the asset files listed above and copy them into the `assets/` directory structure.
2. Serve the folder with a static file server (e.g., `python -m http.server 8000`).
3. Open `http://localhost:8000/index.html` in your browser.

## Installing dependencies
The project’s automated browser tests rely on Playwright. Install the Python package and browser binaries before running the tests:

```bash
pip install -r requirements.txt
playwright install chromium
```

If you are not using the requirements file, you can install the dependency directly with `pip install playwright` before running `playwright install`.

## Running browser tests
1. Ensure the assets listed above are available in the `assets/` directory structure.
2. Install Playwright and the Chromium browser as described in the **Installing dependencies** section.
3. Start the automated tests: `python run_browser_tests.py`.
4. The script launches a local HTTP server and runs the Playwright suite in headless Chromium. It will exit with a non-zero status if any test fails.

## Deploying to GitHub Pages
1. Ensure the `assets/` and `assets/images/` folders contain the downloaded media before pushing.
2. Commit only the placeholder README files (not the binary assets) if you need to create the directories in your repository.
3. Build/serve directly from the repository root and enable GitHub Pages on the branch that includes `index.html` **and** the asset files. If you cannot publish the binaries in Git, host them externally (e.g., a release download or CDN) and upload them to your Pages deployment separately so the browser can fetch them at runtime.

## Notes
- The tileset uses a 32x32 grid; see comments in `index.html` for layout expectations if you create a custom sheet.
- Audio (`bgm_day.mp3`) will not play until the asset is present and the start screen is dismissed (to satisfy browser audio policies).
