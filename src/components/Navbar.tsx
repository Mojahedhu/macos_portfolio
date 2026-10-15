import { navIcons, navLinks } from "@/constant";
import dayjs from "dayjs";

const NavBar = () => {
  return (
    <nav>
      <div>
        <img src="/icons/logo.svg" alt="logo" />
        <p className="font-bold">Sample Portfolio</p>

        <ul>
          {navLinks.map(({ name, id }) => (
            <li key={`link-${id}`}>{name}</li>
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
