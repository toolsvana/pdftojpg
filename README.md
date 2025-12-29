# PDF to JPG Converter

A browser-based tool that converts PDF pages into JPG images. Built with Next.js and runs entirely in your browser for complete privacy.

🔗 **Live Demo:** [PDF to JPG](https://toolsvana.com/tool/pdf-to-jpg)

## What it does

This tool takes PDF files and converts each page into a separate JPG image. The conversion happens locally in your browser using JavaScript, so your files never get uploaded to any server.

## Key features

- Converts PDF pages to JPG format
- Works offline after initial load
- No file size limits
- Maintains good image quality
- Shows conversion progress
- Download all images as they're ready

## How to use

1. Drop a PDF file or click to browse
2. Wait for conversion to complete
3. Download individual JPG images

## Technical details

Built with Next.js 16, TypeScript, and Tailwind CSS. Uses pdf.js library for PDF rendering and HTML Canvas API for image generation. Configured as a static site for easy deployment.

## Running locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Building for production

```bash
npm run build
```

Output goes to the `out` directory as a static site.

## Deployment

Works on any static hosting platform. Recommended settings:
- Build command: `npm run build`
- Output directory: `out`

## Project structure

- `app/components/` - React components
- `app/page.tsx` - Main page
- `app/globals.css` - Styling
- `next.config.ts` - Configuration
