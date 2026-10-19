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
  return (
    <WindowFrame windowKey="resume">
      <div id="window-header">
        <WindowControls windowId="resume" />
        <h2>Resume.pdf</h2>

        <a
          href={resumePdf}
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="cursor-pointer"
        >
          <ChevronLeft className="icon" />
        </button>
        <p className="text-xs">{page}</p>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="cursor-pointer"
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
      >
        <Page pageNumber={page} renderTextLayer renderAnnotationLayer />
      </Document>
    </WindowFrame>
  );
};

export default Resume;
