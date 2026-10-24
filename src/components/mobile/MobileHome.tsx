import useWindowStore, { type WindowKey } from "@/store/window";
import { useMediaQuery } from "react-responsive";
const HomeLinks = [
  {
    id: "resume",
    src: "/images/pages.png",
  },
  {
    id: "terminal",
    src: "/images/terminal.png",
  },
];

const MobileHome = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  return isMobile ? (
    <section id="mobile-home">
      <ul>
        {HomeLinks.map((link) => (
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
