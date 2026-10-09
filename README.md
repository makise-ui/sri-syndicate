# Sri Syndicate — Wholesale B2B Saree Platform

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/makise-ui/sri-syndicate)

B2B wholesale e-commerce prototype for **Sri Syndicate**, Erode, Tamil Nadu (Manufacturers of Hi-Fancy & Hand Loom Cotton Sarees). Built with an **Apple-inspired design language**, direct factory ordering flows, spreadsheet matrix bulk buying, and WhatsApp dispatch integration.

---

## 🚀 1-Click Deploy on Render

Click the button above or visit:
**[Deploy on Render](https://render.com/deploy?repo=https://github.com/makise-ui/sri-syndicate)**

Render will automatically read [`render.yaml`](./render.yaml) and deploy the site as a free Static Site with zero extra configuration.

### Manual Render Setup:
1. Go to [Render Dashboard](https://dashboard.render.com/) → **New +** → **Static Site**.
2. Connect repository: `makise-ui/sri-syndicate`.
3. Set the following build settings:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Click **Create Static Site**.

---

## 🛠️ Tech Stack & Features

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS with custom Apple design tokens & brand palette (Deep Emerald `#0d5940`, Royal Blue `#1d4ed8`, Lime `#84cc16`)
- **Icons:** Lucide React
- **Spreadsheet Engine:** SheetJS (`xlsx`) for instant `.xlsx` wholesale order sheet downloads
- **Key Features:**
  - Strictly B2B bundle (10 pcs) & master bale (100 pcs) logic
  - Dexigmatic spreadsheet bulk matrix
  - Real Kottai, Erode warehouse spotlight
  - Proforma invoice generator & printable PDF layout
  - Direct factory WhatsApp order formatter
  - Retailer margin & bale savings calculator
