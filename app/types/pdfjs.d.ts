declare module 'pdfjs-dist/build/pdf.mjs' {
  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
  }

  export interface PDFPageProxy {
    getViewport(params: { scale: number }): PDFPageViewport;
    render(params: { canvasContext: CanvasRenderingContext2D; viewport: PDFPageViewport }): {
      promise: Promise<void>;
    };
  }

  export interface PDFPageViewport {
    width: number;
    height: number;
  }

  export const GlobalWorkerOptions: {
    workerSrc: string;
  };

  export const version: string;

  export function getDocument(params: { data: ArrayBuffer }): {
    promise: Promise<PDFDocumentProxy>;
  };
}
