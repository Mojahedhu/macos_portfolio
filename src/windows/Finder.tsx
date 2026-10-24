import { MobileWindowControls } from "@/components/mobile";
import MobileBreadcrumb from "@/components/mobile/MobileBreadcrumb";
import { WindowControls, WindowFrame } from "@/components/window";
import { locations } from "@/constant";
import { useFinderDesktop } from "@/hooks/useFinderDesktop";
import { useFinderMobile } from "@/hooks/useFinderMobile";

import type {
  FinderFile,
  FinderLocation,
  ImgFile,
  LocationType,
  PdfFile,
  ProjectFolder,
  TxtFile,
} from "@/store/location-types";

import clsx from "clsx";
import { Search } from "lucide-react";

import { useMediaQuery } from "react-responsive";

type ContentItem = ProjectFolder | ImgFile | TxtFile | PdfFile | FinderFile;
export type MobileNavEntry =
  | { kind: "root" } // Screen 1: Portfolio (top-level folders)
  | { kind: "location"; key: LocationType } // Screen 2: e.g. Work (ProjectFolders list)
  | { kind: "project"; id: number }; // Screen 3: e.g. Nike (Files list)

const Finder = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const { popView, popToIndex, navStack, title, content, onTap } =
    useFinderMobile();
  const { activeLocation, onItemClick, onSidebarClick, isSidebarItemActive } =
    useFinderDesktop();

  const renderList = (
    name: string,
    items: ProjectFolder[] | FinderLocation[],
  ) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item: ProjectFolder | FinderLocation) => {
          return (
            <li
              key={`${item.id.toFixed()}-${item.kind}`}
              className={clsx(
                isSidebarItemActive(item) ? "active" : "not-active",
              )}
            >
              <button
                type="button"
                onClick={() => {
                  onSidebarClick(item);
                }}
              >
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
      {isMobile ? (
        <>
          <MobileWindowControls
            windowId="finder"
            title={title}
            onBack={navStack.length > 1 ? popView : undefined}
          />

          {/* Breadcrumb bar */}
          {navStack.length > 1 && (
            <MobileBreadcrumb
              navStack={[...navStack]}
              onCrumbTap={popToIndex}
            />
          )}

          {/* Icon grid */}
          <div className="finder-gallery">
            <ul className="grid grid-cols-3 gap-6 overflow-y-auto p-4">
              {content.map(
                (item: ProjectFolder | FinderFile | FinderLocation) => (
                  <li
                    key={`${item.id.toFixed()}-${item.kind}`}
                    className="flex flex-col items-center gap-1"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onTap(item);
                      }}
                    >
                      <img
                        src={item.icon}
                        className="mx-auto h-16 w-16 object-contain"
                        alt={item.name}
                      />
                      <p className="mt-1 line-clamp-2 text-center text-xs font-semibold">
                        {item.name}
                      </p>
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>
        </>
      ) : (
        <>
          <div id="window-header">
            <WindowControls windowId="finder" />
            <Search className="icon" />
          </div>
          <div className="bg-card flex h-full">
            <div className="sidebar hidden sm:block">
              {renderList(
                "Favorite",
                Object.values(locations) as FinderLocation[],
              )}
              {renderList("Work", locations.work.children)}
            </div>

            <ul className="content">
              {activeLocation?.children.map((item: ContentItem) => (
                <li
                  key={`${item.id.toFixed()}-${item.name}`}
                  className={item.position}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onItemClick(item);
                    }}
                  >
                    <img src={item.icon} alt={item.name} />
                    <p>{item.name}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </WindowFrame>
  );
};

export default Finder;
