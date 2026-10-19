import { navIcons, navLinks } from "@/constant";
import useWindowStore, { type WindowKey } from "@/store/window";
import dayjs from "dayjs";

const NavBar = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  return (
    <nav>
      <div>
        <img src="/icons/logo.svg" alt="logo" />
        <p className="font-bold">Sample Portfolio</p>

        <ul>
          {navLinks.map(({ name, id, type }) => (
            <li key={`link-${id}`}>
              <button
                type="button"
                onClick={() => openWindow(type as WindowKey)}
              >
                <p>{name}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {navIcons.map(({ id, img }) => (
          <button key={`icon-${id}`}>
            <img src={img} className="icon-hover" alt={`icon-${id}`} />
          </button>
        ))}

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default NavBar;
