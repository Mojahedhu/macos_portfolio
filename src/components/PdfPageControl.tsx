import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import type { SetStateAction } from "react";

interface PdfPageControlProps {
  resumePdf: string;
  page: number;
  numPages: number;
  setPage: (page: SetStateAction<number>) => void;
}

const PdfPageControl = ({
  resumePdf,
  page,
  numPages,
  setPage,
}: PdfPageControlProps) => {
  return (
    <>
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
        onClick={() => {
          setPage((prev: number) => Math.max(1, prev - 1));
        }}
        className="cursor-pointer disabled:opacity-50"
      >
        <ChevronLeft className="icon cursor-pointer" />
      </button>
      <p className="text-xs">{page}</p>
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= numPages}
        onClick={() => {
          setPage((prev) => Math.min(numPages, prev + 1));
        }}
        className="cursor-pointer disabled:opacity-50"
      >
        <ChevronRight className="icon cursor-pointer" />
      </button>
    </>
  );
};

export default PdfPageControl;
