import { Mail, Search } from "lucide-react";
import WindowControls from "../components/window/WindowControls";
import WindowFrame from "../components/window/WindowFrame";
import useWindowStore from "@/store/window";
import { gallery, MOBILE_QUERY, photosLinks } from "@/constant";
import { useGallery, type GalleryKey } from "@/store/gallery";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { MobileWindowControls } from "@/components/mobile";

interface Gallery {
  id: number;
  img: string;
}

const Image = () => {
  const isMobile = useMediaQuery({ query: MOBILE_QUERY });
  const openWindow = useWindowStore((s) => s.openWindow);
  const activeGallery = useGallery((s) => s.gallery);
  const setActiveGallery = useGallery((s) => s.setActiveGallery);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const galleryList: Gallery[] = gallery[activeGallery] || [];
  return (
    <WindowFrame windowKey="photos" className="sm:min-h-73 sm:min-w-xl">
      {isMobile ? (
        <>
          {/* Mobile Header */}
          <div className="mobile-window-header">
            <MobileWindowControls windowId="photos" title="Photos" />
          </div>
        </>
      ) : (
        <>
          {/* Desktop Header */}
          <div id="window-header">
            <WindowControls windowId="photos" />
            <div className="flex w-full items-center justify-end gap-3 text-gray-500">
              <Mail className="icon" />
              <Search className="icon" />
            </div>
          </div>
        </>
      )}

      <div className="min-h-xl flex w-full flex-col sm:flex-row">
        {/* Desktop sidebar */}
        {!isMobile && (
          <div className="sidebar">
            <h2>Photos</h2>
            <ul>
              {photosLinks.map(({ id, icon, title, slug }) => (
                <li key={`photo-${id.toFixed()}`}>
                  <button
                    type="button"
                    className={clsx(activeGallery === slug ? "active" : "")}
                    onClick={() => {
                      setActiveGallery(slug as GalleryKey);
                    }}
                  >
                    <img src={icon} alt={title} />
                    <p>{title}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mobile Category Selector (Pills / Tabs) */}
        {isMobile && (
          <div className="border-border flex w-full items-center gap-2 overflow-x-auto border-b px-5 py-3">
            {photosLinks.map(({ id, title, slug }) => (
              <button
                key={`mobile-photo-${id.toFixed()}`}
                type="button"
                onClick={() => {
                  setActiveGallery(slug as GalleryKey);
                }}
                className={clsx(
                  "cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                  activeGallery === slug
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted text-muted-foreground hover:bg-primary/70 hover:text-primary-foreground",
                )}
              >
                {title}
              </button>
            ))}
          </div>
        )}

        <div className="gallery">
          <ul>
            {galleryList.map(({ id, img }) => (
              <li key={`img-${id.toFixed()}`}>
                <button
                  type="button"
                  onClick={() => {
                    openWindow("imgfile", {
                      id,
                      name: `Gallery Image ${id.toFixed()}`,
                      icon: "/images/image.png",
                      kind: "file",
                      fileType: "img",
                      imageUrl: img,
                    });
                  }}
                >
                  <img src={img} alt={`Gallery Image ${id.toFixed()}`} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WindowFrame>
  );
};

export default Image;
