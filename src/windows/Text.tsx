import { WindowControls, WindowFrame } from "@/components/window";
import type { TxtFile } from "@/store/location-types";
import useWindowStore from "@/store/window";

const Text = () => {
  const windows = useWindowStore((s) => s.windows);
  const data = windows.txtfile?.data as TxtFile;
  if (!data) return null;
  const { name, image, subtitle, description } = data;

  return (
    <WindowFrame windowKey="txtfile">
      <div id="window-header">
        <WindowControls windowId="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="space-y-6 bg-white p-5">
        {image ? (
          <img src={image} alt={name} className=" w-20 rounded-full" />
        ) : null}

        {subtitle ? (
          <h3 className="text-lg font-semibold">{subtitle}</h3>
        ) : null}

        {Array.isArray(description) && description.length > 0 ? (
          <div className="space-y-3 text-base leading-relaxed text-gray-800">
            {description.map((para, idx) => (
              <p key={`para-${idx}`}>{para}</p>
            ))}
          </div>
        ) : null}
      </div>
    </WindowFrame>
  );
};

export default Text;
