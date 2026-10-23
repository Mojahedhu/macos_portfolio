import { ChevronLeft } from "lucide-react";
import useWindowStore from "@/store/window";
import type { WindowKey } from "@/store/window";

interface MobileWindowControlsProps {
  windowId: WindowKey;
}

const MobileWindowControls = ({ windowId }: MobileWindowControlsProps) => {
  const closeWindow = useWindowStore((s) => s.closeWindow);
  return (
    <>
      {/* ── Mobile: iOS-style back button ── */}
      <button
        type="button"
        aria-label="Back"
        className="icon flex flex-1 cursor-pointer items-center gap-2"
        onClick={() => closeWindow(windowId)}
      >
        <ChevronLeft size={18} />
        <span className="text-sm text-blue-500">Go Back</span>
      </button>
    </>
  );
};

export default MobileWindowControls;
