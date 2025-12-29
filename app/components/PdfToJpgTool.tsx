'use client';

import { useState, useRef } from 'react';

const MAX_PAGES = 25;
const MAX_SIZE_MB = 35;

export default function PdfToJpgTool() {
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [feedback, setFeedback] = useState('');
  const [results, setResults] = useState<Array<{ dataUrl: string; pageNumber: number }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (file: File | undefined) => {
    if (!file) return;

    setResults([]);
    setProgress(null);
    setFeedback('');

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setFeedback(`Please choose a PDF under ${MAX_SIZE_MB}MB for smoother in-browser conversion.`);
      return;
    }

    try {
      setProgress({ current: 0, total: 0 });
      setFeedback('Analyzing PDF…');

      const pdfjsLib = await import('pdfjs-dist/build/pdf.mjs');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      if (pdf.numPages > MAX_PAGES) {
        setFeedback(`This tool supports up to ${MAX_PAGES} pages. Your file has ${pdf.numPages}.`);
        setProgress(null);
        return;
      }

      const newResults: Array<{ dataUrl: string; pageNumber: number }> = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        setProgress({ current: pageNumber, total: pdf.numPages });
        setFeedback('Rendering page');

        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          throw new Error('Unable to initialize canvas context');
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        newResults.push({ dataUrl, pageNumber });
      }

      setResults(newResults);
      setProgress(null);
      setFeedback('All pages converted. Download each JPG below.');
    } catch (error) {
      console.error(error);
      setFeedback('Something went wrong while reading your PDF. Please try another file.');
      setProgress(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    handleFiles(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFiles(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="glass-panel p-6 sm:p-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            Browser based
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            PDF to JPG Converter
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
            Turn each page of your PDF into a high-quality JPG image. Everything happens in your browser—no uploads, no waiting.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-600 bg-slate-900/40 px-6 py-12 text-center transition hover:border-cyan-400/60 hover:bg-slate-900/60"
          >
            <div className="rounded-full border border-white/10 bg-white/[0.03] p-3">
              <svg
                className="h-10 w-10 text-cyan-300"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0L9.25 12.5M12 9.75l2.75 2.75M6.75 19.5a4.5 4.5 0 01-.75-8.944V9a6 6 0 1112 0v1.556a4.5 4.5 0 01-.75 8.944"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-white">Drop your PDF here</p>
              <p className="text-sm text-slate-400">or click to browse</p>
            </div>
            <p className="text-xs text-slate-500">
              Up to {MAX_PAGES} pages · Processed locally · JPG quality 92%
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload PDF to convert"
            />
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-5">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Why users choose this</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>• Private, offline conversion</li>
                <li>• Automatic page ordering</li>
                <li>• Clean JPG output optimized for sharing</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/5 bg-black/40 px-4 py-3 text-xs text-slate-400">
              <strong className="text-slate-300">Privacy first:</strong> Your PDF never leaves your device. All processing happens locally in your browser.
            </div>
          </div>
        </div>

        {progress && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>{feedback}</span>
              <span>{progress.current} / {progress.total}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/5">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map(({ dataUrl, pageNumber }) => (
              <article
                key={pageNumber}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/40"
              >
                <img
                  src={dataUrl}
                  alt={`Page ${pageNumber} preview`}
                  loading="lazy"
                  className="mb-3 h-48 w-full rounded-xl object-contain bg-slate-900/60"
                />
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Page {pageNumber}</span>
                  <a
                    href={dataUrl}
                    download={`page-${pageNumber}.jpg`}
                    className="rounded-full border border-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-cyan-400/70"
                  >
                    Download
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {feedback && !progress && (
          <p className="text-sm text-slate-400">{feedback}</p>
        )}
      </div>
    </section>
  );
}
