import useWindowStore, { type WindowKey } from "@/store/window";

interface WindowControlsProps {
  windowId: WindowKey;
}

const WindowControls = ({ windowId }: WindowControlsProps) => {
  const closeWindow = useWindowStore((s) => s.closeWindow);
  return (
    <>
      {/* ── Desktop: macOS traffic-light dots ── */}
      <div id="window-controls" className="hidden sm:flex">
        <button
          type="button"
          aria-label="Close"
          className="close"
          onClick={() => closeWindow(windowId)}
        />
        <div className="minimize" />
        <div className="maximize" />
      </div>
    </>
  );
};

export default WindowControls;
