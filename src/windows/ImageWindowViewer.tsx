import { WindowControls, WindowFrame } from "@/components/window";
import type { ImgFile } from "@/store/location-types";
import useWindowStore from "@/store/window";
import { PlusIcon, ShareIcon, SquarePenIcon } from "lucide-react";

const ImageWindowViewer = () => {
  const windows = useWindowStore((s) => s.windows);
  const data = windows.imgfile?.data as ImgFile;

  if (!data) return null;
  const { name, imageUrl } = data;
  return (
    <WindowFrame windowKey="imgfile">
      <div id="window-header">
        <WindowControls windowId="imgfile" />
        <h2>{name}</h2>
        <div className="flex items-end gap-3">
          <SquarePenIcon />
          <PlusIcon />
          <ShareIcon />
        </div>
      </div>

      <div className="bg-white p-5">
        {imageUrl ? (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={name}
              className="h-auto max-h-[70vh] w-full rounded object-contain"
            />
          </div>
        ) : null}
      </div>
    </WindowFrame>
  );
};

export default ImageWindowViewer;
