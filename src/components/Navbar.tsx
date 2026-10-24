import { navIcons, navLinks } from "@/constant";
import useWindowStore, { type WindowKey } from "@/store/window";
import dayjs from "dayjs";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  return (
    <nav>
      <div>
        <img src="/icons/logo.svg" alt="logo" />
        <p className="font-bold">macOS</p>

        <ul>
          {navLinks.map(({ name, id, type }) => (
            <li key={`link-${id.toFixed()}`}>
              <button
                type="button"
                onClick={() => {
                  openWindow(type as WindowKey);
                }}
              >
                <p>{name}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li
              key={`icon-${id.toFixed()}`}
              className="flex items-center justify-center"
            >
              <button type="button">
                <img
                  src={img}
                  className="icon dark:invert"
                  alt={`icon-${id.toFixed()}`}
                />
              </button>
            </li>
          ))}
          <li key="theme-toggle">
            <ThemeToggle />
          </li>
        </ul>

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default NavBar;
