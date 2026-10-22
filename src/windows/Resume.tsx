import { useState } from "react";
import { WindowControls, WindowFrame } from "@/components/window";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import resumePdf from "/files/resume.pdf?inline";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const Resume = () => {
  const [page, setPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <WindowFrame windowKey="resume">
      <div id="window-header">
        <WindowControls windowId="resume" />
        <h2 className="text-foreground">Resume.pdf</h2>

        <a
          href={resumePdf}
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="cursor-pointer disabled:opacity-50"
        >
          <ChevronLeft className="icon" />
        </button>
        <p className="text-xs">{page}</p>
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= numPages}
          onClick={() => setPage((prev) => Math.min(numPages, prev + 1))}
          className="cursor-pointer disabled:opacity-50"
        >
          <ChevronRight className="icon" />
        </button>
      </div>

      <Document
        file={{ url: resumePdf }}
        options={{
          disableRange: true,
          disableStream: true,
        }}
        onLoadSuccess={({ numPages: nextNumPages }) => {
          setNumPages(nextNumPages);
        }}
      >
        <Page pageNumber={page} renderTextLayer renderAnnotationLayer />
      </Document>
    </WindowFrame>
  );
};

export default Resume;
