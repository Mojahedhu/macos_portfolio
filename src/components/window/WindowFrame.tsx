import type { WindowKey } from "@/store/window";
import useWindowStore from "@/store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import React, { useLayoutEffect } from "react";

interface WindowFrameProps {
  windowKey: WindowKey;
  children: React.ReactNode;
}

const WindowFrame = ({ windowKey, children }: WindowFrameProps) => {
  const window = useWindowStore((s) => s.windows[windowKey]);
  const focusWindow = useWindowStore((s) => s.focusWindow);

  const { zIndex, isOpen } = window;

  const sectionRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = sectionRef.current;
      if (!element || !open) return;

      element.style.display = "block";

      gsap.fromTo(
        element,
        {
          scale: 0.8,
          opacity: 0,
          y: 40,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.4,
        },
      );
    },
    { dependencies: [isOpen], revertOnUpdate: true, scope: sectionRef },
  );

  useGSAP(
    () => {
      const element = sectionRef.current;
      if (!element) return;

      const header = element.querySelector<HTMLElement>("#window-header");
      const main = document.querySelector<HTMLElement>("main");

      if (!main) return;

      Draggable.create(element, {
        trigger: header ?? element,
        bounds: main,
        edgeResistance: 0.5,
        onPress: () => focusWindow(windowKey),
      });
    },
    { scope: sectionRef },
  );

  useLayoutEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    element.style.display = isOpen ? "block" : "none";
  }, [isOpen]);

  return (
    <section
      id={windowKey}
      ref={sectionRef}
      style={{ zIndex }}
      className="absolute"
    >
      {children}
    </section>
  );
};

export default WindowFrame;
