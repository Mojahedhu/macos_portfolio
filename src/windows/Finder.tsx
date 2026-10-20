import { WindowControls, WindowFrame } from "@/components/window";
import { locations } from "@/constant";
import { useLocationStore } from "@/store/location";
import type {
  FinderFile,
  FinderLocation,
  ImgFile,
  LocationType,
  PdfFile,
  ProjectFolder,
  TxtFile,
} from "@/store/location-types";
import useWindowStore from "@/store/window";
import clsx from "clsx";
import { Search } from "lucide-react";

type ContentItem = ProjectFolder | ImgFile | TxtFile | PdfFile | FinderFile;

const Finder = () => {
  const setActiveLocationK = useLocationStore(
    (state) => state.setActiveLocationKey,
  );
  const openWindow = useWindowStore((s) => s.openWindow);
  const activeType = useLocationStore((state) => state.activeLocationKey);
  const activeLocation =
    typeof activeType === "number"
      ? locations["work"].children.find((child) => child.id === activeType)
      : locations[activeType];

  const openItem = (item: ProjectFolder | FinderFile) => {
    if ("fileType" in item && item.fileType === "pdf") {
      return openWindow("resume");
    }
    if ("fileType" in item && item.fileType === "txt") {
      return openWindow("txtfile", item);
    }
    if ("fileType" in item && item.fileType === "img") {
      return openWindow("imgfile", item);
    }

    if (item.kind === "folder") {
      if ("type" in item) {
        return setActiveLocationK(item.type as LocationType);
      }
      return setActiveLocationK(item.id);
    }
    if (
      "fileType" in item &&
      ["fig", "url"].includes(item.fileType) &&
      "href" in item
    ) {
      return window.open(item.href, "_blank", `noopener,noreferrer`);
    }
  };

  const handleSetActiveType = (item: ProjectFolder | FinderLocation) => {
    const id = "position" in item ? item.id : item.type;
    setActiveLocationK(id);
  };

  const renderList = (
    name: string,
    items: ProjectFolder[] | FinderLocation[],
  ) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item: ProjectFolder | FinderLocation) => {
          const isActive =
            "position" in item
              ? item.id === activeType
              : item.type === activeType;
          return (
            <li
              key={`${item.id}-${item.kind}`}
              className={clsx(isActive ? "active" : "non-active")}
            >
              <button type="button" onClick={() => handleSetActiveType(item)}>
                <img src={item.icon} className="w-4" alt={item.name} />
                <p className="truncate text-sm font-medium">{item.name}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <WindowFrame windowKey="finder">
      <div id="window-header">
        <WindowControls windowId="finder" />
        <Search className="icon" />
      </div>
      <div className="flex h-full bg-white">
        <div className="sidebar">
          {renderList("Favorite", Object.values(locations) as FinderLocation[])}
          {renderList("Work", locations.work.children)}
        </div>

        <ul className="content">
          {activeLocation?.children.map((item: ContentItem) => (
            <li key={`${item.id}-${item.name}`} className={item.position}>
              <button type="button" onClick={() => openItem(item)}>
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </WindowFrame>
  );
};

export default Finder;
