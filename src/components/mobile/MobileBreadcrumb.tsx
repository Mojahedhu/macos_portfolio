import { locations } from "@/constant";
import type { MobileNavEntry } from "@/windows/Finder";
import { clsx } from "cn";
import { ChevronRight } from "lucide-react";

interface MobileBreadcrumbProps {
  navStack: MobileNavEntry[];
  onCrumbTap?: (index: number) => void;
}

const MobileBreadcrumb = ({ navStack, onCrumbTap }: MobileBreadcrumbProps) => {
  const breadcrumbs = navStack
    .filter((e) => e.kind !== "root")
    .map((e) => {
      if (e.kind === "location") return locations[e.key].name;
      return locations.work.children.find((c) => c.id === e.id)?.name ?? "";
    });

  return navStack.length > 1 ? (
    <div className="breadcrumb bg-muted text-sm text-blue-500">
      {["Portfolio", ...breadcrumbs].map((crumb, i, arr) => {
        const isLast = i === arr.length - 1;

        return (
          <span
            key={`crumb-${i.toFixed()}`}
            className="flex items-center gap-1"
          >
            <button
              className={clsx(!isLast ? "cursor-pointer" : "")}
              onClick={() => {
                if (!isLast && onCrumbTap) onCrumbTap(i);
              }}
            >
              {crumb}
            </button>
            {!isLast && (
              <ChevronRight className="text-muted-foreground" size={12} />
            )}
          </span>
        );
      })}
    </div>
  ) : null;
};

export default MobileBreadcrumb;
