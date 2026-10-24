import { MOBILE_QUERY, mobileHomeLinks } from "@/constant";
import useWindowStore, { type WindowKey } from "@/store/window";
import { useMediaQuery } from "react-responsive";

const MobileHome = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const isMobile = useMediaQuery({ query: MOBILE_QUERY });
  return isMobile ? (
    <section id="mobile-home">
      <ul>
        {mobileHomeLinks.map((link) => (
          <li key={link.id}>
            <button
              type="button"
              onClick={() => {
                openWindow(link.id as WindowKey);
              }}
              className="cursor-pointer"
            >
              <img alt={link.id} src={link.src} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  ) : null;
};

export default MobileHome;
