import { locations } from "@/constant";
import { useLocationStore } from "@/store/location";
import type { ProjectFolder } from "@/store/location-types";
import useWindowStore from "@/store/window";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/Draggable";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const projects = locations.work.children ?? [];

const Home = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const setActiveWindowKey = useLocationStore((s) => s.setActiveLocationKey);

  const handleOpenProjectFolder = (project: ProjectFolder) => {
    setActiveWindowKey(project.id);
    openWindow("finder");
  };
  useGSAP(() => {
    Draggable.create(".folder");
  }, []);
  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={`project-${project.id.toFixed()}`}
            className={clsx("group folder", project.windowPosition)}
          >
            <button
              type="button"
              onClick={() => {
                handleOpenProjectFolder(project);
              }}
            >
              <img src="/images/folder.png" alt={project.name} />
              <p>{project.name}</p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
