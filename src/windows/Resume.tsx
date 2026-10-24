import { Suspense, useEffect, useState } from "react";
import { WindowControls, WindowFrame } from "@/components/window";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import resumePdf from "/files/resume.pdf?inline";
import { useMediaQuery } from "react-responsive";
import { MobileWindowControls } from "@/components/mobile";
import PdfPageControl from "@/components/PdfPageControl";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const Resume = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [page, setPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);

  // 1. Track width with resize listener
  const [pageWidth, setPageWidth] = useState<number>(() => {
    if (typeof window !== "undefined") {
      // If mobile, take full screen minus margin/padding (e.g. 32px or 40px)
      return window.innerWidth < 768 ? window.innerWidth - 32 : 600;
    }
    return 600;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPageWidth(window.innerWidth - 32); // Adjust 32 to whatever horizontal padding you need
      } else {
        setPageWidth(600);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WindowFrame windowKey="resume">
      {isMobile ? (
        <>
          {/* Mobile Header */}
          <div id="mobile-window-header" className="relative">
            <MobileWindowControls windowId="resume" title="Resume" />

            <div className="absolute top-0 right-0 z-995 flex items-center gap-1">
              <PdfPageControl
                resumePdf={resumePdf}
                page={page}
                numPages={numPages}
                setPage={setPage}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Desktop Header */}
          <div id="window-header">
            <WindowControls windowId="resume" />
            <h2 className="text-foreground">Resume.pdf</h2>

            <PdfPageControl
              resumePdf={resumePdf}
              page={page}
              numPages={numPages}
              setPage={setPage}
            />
          </div>
        </>
      )}

      <div className="col-center w-full overflow-auto">
        <Suspense
          fallback={
            <div
              style={{ width: pageWidth, height: pageWidth * 1.414 }}
              className="col-center"
            >
              Loading page...
            </div>
          }
        >
          <Document
            className="resume-pdf"
            file={{ url: resumePdf }}
            options={{
              disableRange: true,
              disableStream: true,
            }}
            onLoadSuccess={({ numPages: nextNumPages }) => {
              setNumPages(nextNumPages);
            }}
          >
            <Page
              pageNumber={page}
              renderTextLayer
              renderAnnotationLayer
              width={pageWidth}
            />
          </Document>
        </Suspense>
      </div>
    </WindowFrame>
  );
};

export default Resume;
