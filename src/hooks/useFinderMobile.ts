// src/hooks/useFinderMobile.ts
import { useState } from "react";
import { locations } from "@/constant";
import useWindowStore from "@/store/window";
import type {
  FinderFile,
  FinderLocation,
  LocationType,
  ProjectFolder,
} from "@/store/location-types";

export type MobileNavEntry =
  | { kind: "root" }
  | { kind: "location"; key: LocationType }
  | { kind: "project"; id: number };

export const useFinderMobile = () => {
  const openWindow = useWindowStore((s) => s.openWindow);

  const [navStack, setNavStack] = useState<MobileNavEntry[]>([
    { kind: "root" },
  ]);
  const currentView = navStack[navStack.length - 1];

  const pushView = (entry: MobileNavEntry) => { setNavStack((prev) => [...prev, entry]); };

  const popView = () => { setNavStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev)); };

  const title = (() => {
    if (currentView.kind === "root") return "Portfolio";
    if (currentView.kind === "location") return locations[currentView.key].name;
    return (
      locations.work.children.find((c) => c.id === currentView.id)?.name ?? ""
    );
  })();

  const content = (() => {
    if (currentView.kind === "root")
      return Object.values(locations) as FinderLocation[];
    if (currentView.kind === "location")
      return locations[currentView.key].children;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (currentView.kind === "project")
      return (
        locations.work.children.find((c) => c.id === currentView.id)
          ?.children ?? []
      );
    return [];
  })();

  const onTap = (item: FinderLocation | ProjectFolder | FinderFile) => {
    if ("type" in item) {
      pushView({ kind: "location", key: item.type });
      return;
    }
    if (item.kind === "folder") {
      pushView({ kind: "project", id: item.id });
      return;
    }
    // file — same openItem logic
    if ("fileType" in item) {
      if (item.fileType === "pdf") {
        openWindow("resume");
        return;
      }
      if (item.fileType === "txt") {
        openWindow("txtfile", item);
        return;
      }
      if (item.fileType === "img") {
        openWindow("imgfile", item);
        return;
      }
      if (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        ("fig" === item.fileType || "url" === item.fileType) &&
        "href" in item
      )
        window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  return {
    navStack, // needed by MobileBreadcrumb + onBack condition
    title,
    content,
    onTap,
    popView,
  };
};
