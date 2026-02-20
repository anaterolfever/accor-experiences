# Accor Auctions – Plan-Auction View

Mobile **Plan-Auction View | Full** implementation based on the Accor Experiences Revamp Figma design (node 1252-59579 / 1252-59580).

## Run the UI

Open `index.html` in a browser, or serve the folder locally:

```bash
npx serve .
# or: python -m http.server 8080
```

## Figma connection

Figma’s API requires an **access token** (no public “connect once” link). To pull design data and assets from Figma:

1. **Get a token:** [Figma → Settings → Personal access tokens](https://www.figma.com/developers/api#access-tokens) (needs `file_content:read`).
2. **Copy env file and add the token:**
   ```bash
   copy .env.example .env
   ```
   Edit `.env` and set `FIGMA_ACCESS_TOKEN=your_token`.
3. **Fetch the design (nodes + image URLs):**
   ```bash
   node scripts/figma-fetch.js
   ```
   Output is in `figma-export/`: `nodes.json` (layout/structure) and `images.json` (node → image URL).

Optional: set `FIGMA_NODE_IDS` in `.env` to other node IDs (e.g. `1252:59580`) to fetch different frames.

## Structure

- **index.html** – Plan-Auction View layout: status bar, header (auction icon), gallery, content (title, venue, date, points), CTA button, footer.
- **styles.css** – Mobile-first styles; Accor-style dark theme and gold accent.
- **script.js** – Gallery dots and scroll sync.
- **scripts/figma-fetch.js** – Fetches file/node data and image URLs from Figma when `FIGMA_ACCESS_TOKEN` is set.

Gallery images use Unsplash placeholders; replace with your assets or URLs from `figma-export/images.json` after running the Figma script.

## GitHub & GitHub Pages

To connect this project to GitHub and publish it on GitHub Pages:

1. **Create a new repository on GitHub**  
   Go to [github.com/new](https://github.com/new), choose a name (e.g. `accor-auctions`), leave it empty (no README, no .gitignore).

2. **Connect and push** (run in this folder):
   ```bash
   git init
   git add .
   git commit -m "Initial commit – Plan Auction view"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name.

3. **Enable GitHub Pages**  
   In the repo: **Settings → Pages**. Under **Build and deployment**:
   - **Source**: GitHub Actions  
   (The workflow in `.github/workflows/deploy-pages.yml` will run on every push to `main` and deploy the site.)

After the first push, the site will be available at  
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.
