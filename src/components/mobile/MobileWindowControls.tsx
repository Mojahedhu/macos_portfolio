import { ChevronLeft } from "lucide-react";
import useWindowStore from "@/store/window";
import type { WindowKey } from "@/store/window";
import { useMediaQuery } from "react-responsive";

interface MobileWindowControlsProps {
  windowId: WindowKey;
  title?: string;
  onBack?: () => void;
}

const MobileWindowControls = ({
  windowId,
  title,
  onBack = () => {
    /* empty */
  },
}: MobileWindowControlsProps) => {
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  return (
    <div
      id="mobile-window-header"
      className="mobile-window-header relative z-10 flex items-center justify-between gap-5 px-3 pb-3"
    >
      {/* ── Mobile: iOS-style back button ── */}
      <button
        type="button"
        className="icon flex flex-1 cursor-pointer items-center gap-2"
        onClick={() => {
          if (isMobile && title !== "Portfolio") {
            onBack();
          } else {
            closeWindow(windowId);
          }
        }}
      >
        <ChevronLeft size={18} />
        <span className="text-sm text-blue-500">Go Back</span>
      </button>
      <p className="font-georama line-clamp-1 flex-[1.5] text-lg text-black dark:text-white">
        {title}
      </p>
    </div>
  );
};

export default MobileWindowControls;
