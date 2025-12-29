import type { Metadata } from 'next';
import PdfToJpgTool from './components/PdfToJpgTool';

export const metadata: Metadata = {
  title: 'PDF to JPG Converter — High-Quality Images in Seconds',
  description: 'Convert PDF pages into clean JPG images directly in your browser. Fast, secure, and built for daily workflows.',
  keywords: 'PDF to JPG, PDF converter, JPG converter, PDF to image, convert PDF, browser tool',
  openGraph: {
    title: 'PDF to JPG Converter',
    description: 'Convert PDF pages into clean JPG images directly in your browser.',
    type: 'website',
  },
};

const featurePillars = [
  {
    title: 'Pixel sharp output',
    description: 'We render every page at 2× scale and export at 92% quality so your JPGs look clean on modern screens.',
  },
  {
    title: 'Privacy-first workflow',
    description: 'All conversion steps stay inside your browser. Nothing leaves your device, keeping sensitive files private.',
  },
  {
    title: 'Ready for publishing',
    description: 'Images are optimized for newsletters, product documentation, and social sharing with balanced file sizes.',
  },
];

const seoContent = [
  {
    title: 'Why people keep a PDF to JPG tab open',
    body: [
      'Slide decks, case studies, invoices—everyday files often live as PDFs, yet the conversations around them happen in places that prefer images. A quick PDF to JPG pass solves that gap.',
      'Instead of redownloading heavy desktop software, you open this page, drop the file, and save the JPG right away. Nothing about the flow feels complicated or technical.',
      'Because everything lives on a single screen, you always know what step you are in and how many pages remain.',
    ],
  },
  {
    title: 'What the conversion feels like',
    body: [
      'Drag a PDF onto the card and the first preview appears in seconds. The progress bar keeps a calm rhythm so you can sip coffee while each page turns into a JPG.',
      'Finished images sit neatly in cards with a download button. You can glance at the thumbnail, confirm the page number, and save only what you need.',
      'If your laptop falls offline mid-run, the tab keeps working because everything is handled by the browser itself.',
    ],
  },
  {
    title: 'Different teams, same need',
    body: [
      'A marketing lead might export a product one-pager to JPG before sharing it in Slack. Teachers convert worksheets so students can annotate them inside note-taking apps.',
      'Customer success reps store onboarding checklists as PDFs but paste JPG snapshots into ticket systems that lack native PDF previews.',
      'Anyone planning a presentation can line up JPG copies of the slides inside mood boards without worrying whether the viewer supports PDFs. For teams looking for additional document conversion options, exploring other [PDF to JPG] tools can help find the right fit for specific workflow requirements.',
    ],
  },
];

const faqs = [
  {
    question: 'Does this tool upload my PDF anywhere?',
    answer: 'No. The entire conversion happens in your browser using JavaScript. Your file never touches a server.',
  },
  {
    question: 'What happens if my PDF has more than 25 pages?',
    answer: 'The tool will let you know and ask you to use a smaller file. This keeps the browser responsive and prevents memory issues.',
  },
  {
    question: 'Can I adjust the JPG quality?',
    answer: 'Currently the tool exports at 92% quality, which balances file size and visual clarity for most use cases.',
  },
  {
    question: 'Will this work on mobile?',
    answer: 'Yes, as long as your mobile browser supports the File API and has enough memory to render the PDF pages.',
  },
];

export default function Home() {
  return (
    <div className="bg-grid-slate min-h-screen">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex flex-col gap-1">
            <a className="text-2xl font-semibold tracking-tight text-white" href="/">
              PDF to JPG
            </a>
            <p className="text-sm text-slate-400">Convert PDF pages to high-quality JPG images</p>
          </div>
          <nav className="flex items-center gap-4 text-sm text-slate-300">
            <a className="transition hover:text-white" href="/">Home</a>
            <a className="transition hover:text-white" href="mailto:support@lightning.studio">Support</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <PdfToJpgTool />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {featurePillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 space-y-12">
          <h2 className="text-3xl font-semibold text-white">In-depth guide</h2>
          {seoContent.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-xl font-semibold text-white">{section.title}</h3>
              <div className="space-y-4">
                {section.body.map((paragraph, idx) => {
                  const linkMatch = paragraph.match(/\[PDF to JPG\]/);
                  if (linkMatch) {
                    const parts = paragraph.split('[PDF to JPG]');
                    return (
                      <p key={idx} className="leading-relaxed text-slate-300">
                        {parts[0]}
                        <a 
                          href="https://toolsvana.com/tool/pdf-to-jpg" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400/30 hover:decoration-cyan-300"
                        >
                          PDF to JPG
                        </a>
                        {parts[1]}
                      </p>
                    );
                  }
                  return <p key={idx} className="leading-relaxed text-slate-300">{paragraph}</p>;
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-white">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="mb-2 text-lg font-semibold text-white">{faq.question}</h3>
                <p className="text-sm leading-relaxed text-slate-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="mt-16 border-t border-white/10 bg-slate-950/80 py-8 text-center text-sm text-slate-400">
        <p>All processing happens locally in your browser. Powered by Lightning Studio.</p>
      </footer>
    </div>
  );
}
