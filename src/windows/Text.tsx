import { MobileWindowControls } from "@/components/mobile";
import { WindowControls, WindowFrame } from "@/components/window";
import type { TxtFile } from "@/store/location-types";
import useWindowStore from "@/store/window";
import { useMediaQuery } from "react-responsive";

const Text = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const windows = useWindowStore((s) => s.windows);
  const data = windows.txtfile.data as TxtFile;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!data) return null;
  const { name, image, subtitle, description } = data;

  return (
    <WindowFrame windowKey="txtfile">
      {isMobile ? (
        <MobileWindowControls windowId="txtfile" title="Preview" />
      ) : (
        <div id="window-header">
          <WindowControls windowId="txtfile" />
          <h2>{name}</h2>
        </div>
      )}

      <div className="bg-card space-y-6 p-5">
        {image ? (
          <img src={image} alt={name} className="w-20 rounded-full" />
        ) : null}

        {subtitle ? <h3 className="font-bold">{subtitle}</h3> : null}

        {Array.isArray(description) && description.length > 0 ? (
          <div className="text-muted-foreground dark:text-foreground space-y-7 text-base leading-relaxed">
            {description.map((para, idx) => (
              <p key={`para-${idx.toFixed()}`} className="font-serif">
                {para}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </WindowFrame>
  );
};

export default Text;
