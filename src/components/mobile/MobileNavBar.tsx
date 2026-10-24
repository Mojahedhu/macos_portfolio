import { Battery, Wifi } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import MobileClock from "./MobileClock";
import ThemeToggle from "../ThemeToggle";

const MobileNavBar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  return isMobile ? (
    <section
      id="mobile-navbar"
      className="relative z-10000 flex items-center justify-between gap-5 px-5 py-3 sm:hidden"
    >
      <MobileClock />
      <div className="bg-muted flex-1 rounded-full px-2 py-5 dark:bg-black"></div>
      <ul className="flex items-center gap-2">
        <li>
          <Wifi className="icon" />
        </li>
        <li>
          <Battery className="icon" />
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </section>
  ) : null;
};

export default MobileNavBar;
