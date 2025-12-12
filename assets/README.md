# Asset placeholders

Binary assets are not stored in this repository. To run the game locally or host it on GitHub Pages, download the asset pack and place the files in this folder structure:

- `assets/bgm_day.mp3` – background music
- `assets/tiles.png` – main tileset (32x32 grid, see inline comments in `index.html` for expected layout)
- `assets/images/blocks1.jpg` – supplemental blocks texture
- `assets/images/blocks2.jpg` – supplemental blocks texture

## Where to get assets
- Use the asset bundle shared by the project maintainers (e.g., from the latest release or shared drive), or
- Provide your own replacements that match the expected file names and dimensions.

## Placement
1. Create the `assets/` directory (and `assets/images/`) if they do not exist.
2. Copy the downloaded files into the paths listed above.
3. When running from a local web server or GitHub Pages, ensure these files are present alongside `index.html` so the browser can load them.

## Working without the official pack
If you do not have the originals, you can create temporary placeholders:
- Generate a silent or short-loop MP3 and save it as `bgm_day.mp3`.
- Export a simple 32x32 PNG as `tiles.png`.
- Save any small JPGs as `blocks1.jpg` and `blocks2.jpg`.
These dummy assets will allow the page to load while you source higher-quality art and audio.
