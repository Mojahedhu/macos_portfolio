import useWindowStore, { type WindowKey } from "@/store/window";

interface WindowControlsProps {
  windowId: WindowKey;
}

const WindowControls = ({ windowId }: WindowControlsProps) => {
  const closeWindow = useWindowStore((s) => s.closeWindow);
  return (
    <div id="window-controls">
      <div
        aria-label="Close"
        role="button"
        tabIndex={0}
        className="close"
        onClick={() => closeWindow(windowId)}
      />
      <div className="minimize" />
      <div className="maximize" />
    </div>
  );
};

export default WindowControls;
