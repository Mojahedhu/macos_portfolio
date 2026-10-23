import { Mail, Search } from "lucide-react";
import WindowControls from "../components/window/WindowControls";
import WindowFrame from "../components/window/WindowFrame";
import useWindowStore from "@/store/window";
import { gallery, photosLinks } from "@/constant";
import { useGallery, type GalleryKey } from "@/store/gallery";
import clsx from "clsx";

const Image = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const activeGallery = useGallery((s) => s.gallery);
  const setActiveGallery = useGallery((s) => s.setActiveGallery);
  const galleryList = gallery[activeGallery] || [];
  return (
    <WindowFrame windowKey="photos" className="sm:min-h-73 sm:min-w-xl">
      <div id="window-header">
        <WindowControls windowId="photos" />
        <div className="flex w-full items-center justify-end gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="min-h-xl flex w-full">
        <div className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map(({ id, icon, title, slug }) => (
              <li key={`photo-${id}`}>
                <button
                  type="button"
                  className={clsx(activeGallery === slug ? "active" : "")}
                  onClick={() => setActiveGallery(slug as GalleryKey)}
                >
                  <img src={icon} alt={title} />
                  <p>{title}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery">
          <ul>
            {galleryList.map(({ id, img }) => (
              <li key={`img-${id}`}>
                <button
                  type="button"
                  onClick={() =>
                    openWindow("imgfile", {
                      id,
                      name: `Gallery Image ${id}`,
                      icon: "/images/image.png",
                      kind: "file",
                      fileType: "img",
                      imageUrl: img,
                    })
                  }
                >
                  <img src={img} alt={`Gallery Image ${id}`} />
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
