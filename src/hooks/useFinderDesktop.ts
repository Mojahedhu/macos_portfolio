// src/hooks/useFinderDesktop.ts
import { locations } from "@/constant";
import { useLocationStore } from "@/store/location";
import useWindowStore from "@/store/window";
import type { FinderFile, FinderLocation, LocationType, ProjectFolder } from "@/store/location-types";

export const useFinderDesktop = () => {
  const setActiveLocationKey = useLocationStore((s) => s.setActiveLocationKey);
  const openWindow = useWindowStore((s) => s.openWindow);
  const activeType = useLocationStore((s) => s.activeLocationKey);

  const activeLocation =
    typeof activeType === "number"
      ? locations.work.children.find((c) => c.id === activeType)
      : locations[activeType];

  const onSidebarClick = (item: ProjectFolder | FinderLocation) => {
    const id = "position" in item ? item.id : item.type;
    setActiveLocationKey(id);
  };

  const onItemClick = (item: ProjectFolder | FinderFile) => {
    if ("fileType" in item) {
      if (item.fileType === "pdf") { openWindow("resume"); return; }
      if (item.fileType === "txt") { openWindow("txtfile", item); return; }
      if (item.fileType === "img") { openWindow("imgfile", item); return; }
      if (["fig", "url"].includes(item.fileType) && "href" in item)
        return window.open(item.href, "_blank", "noopener,noreferrer");
    }
    if (item.kind === "folder") {
      setActiveLocationKey("type" in item ? (item.type as LocationType) : item.id);
    }
  };

  const isSidebarItemActive = (item: ProjectFolder | FinderLocation) =>
    "position" in item ? item.id === activeType : item.type === activeType;

  return {
    activeType,
    activeLocation,
    onSidebarClick,
    onItemClick,
    isSidebarItemActive,
  };
};