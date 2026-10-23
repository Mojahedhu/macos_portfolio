import dayjs from "dayjs";
import { Battery, Wifi } from "lucide-react";
import { useMediaQuery } from "react-responsive";

const MobileNavBar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 639px)" });

  return isMobile ? (
    <section
      id="mobile-navbar"
      className="relative z-10000 flex items-center justify-between gap-5 px-5 py-3 sm:hidden"
    >
      <time>{dayjs().format("h:mm A")}</time>
      <div className="flex-1 rounded-full bg-black px-2 py-5"></div>
      <ul className="flex items-center gap-2">
        <li>
          <Wifi className="icon" />
        </li>
        <li>
          <Battery className="icon" />
        </li>
      </ul>
    </section>
  ) : null;
};

export default MobileNavBar;
