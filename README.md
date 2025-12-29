# PDF to JPG Converter

A fast, privacy-first PDF to JPG converter that runs entirely in your browser. Built with Next.js and optimized for SEO.

## Features

- ✅ **100% Client-Side** - No uploads, all processing happens in your browser
- ✅ **High Quality** - 2× scale rendering, 92% JPG quality
- ✅ **Fast & Responsive** - Supports up to 25 pages with real-time progress
- ✅ **SEO Optimized** - Static export with full content in HTML
- ✅ **Privacy First** - Your files never leave your device

## Tech Stack

- **Next.js 16** - Static site generation
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **pdfjs-dist** - PDF rendering

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the tool.

## Build for Production

```bash
npm run build
```

This creates a static export in the `/out` folder, ready for deployment to Cloudflare Pages or any static hosting.

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. Connect to Cloudflare Pages
3. Build command: `npm run build`
4. Output directory: `out`

## License

MIT
