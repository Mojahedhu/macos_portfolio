import type { WindowKey } from "@/store/window";
import useWindowStore from "@/store/window";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { clsx } from "cn";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useLayoutEffect, useRef } from "react";
import { MOBILE_QUERY } from "@/constant";

interface WindowFrameProps {
  windowKey: WindowKey;
  children: React.ReactNode;
  className?: string;
}

const WindowFrame = ({
  windowKey,
  children,
  className = "",
}: WindowFrameProps) => {
  const window = useWindowStore((s) => s.windows[windowKey]);
  const focusWindow = useWindowStore((s) => s.focusWindow);

  const { zIndex, isOpen } = window;

  const sectionRef = useRef<HTMLDivElement>(null);

  /** Returns true when the viewport is narrower than Tailwind's `sm` breakpoint. */
  const isMobile = useMediaQuery({ query: MOBILE_QUERY });

  /** Returns true when user requested reduced motion in their OS settings. */
  const prefersReducedMotion = useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
  });

  /* ── Open / close animation ─────────────────────────────────────────────── */
  useGSAP(
    () => {
      const element = sectionRef.current;

      if (!isOpen || !element) return;

      // Skip all scale and slide tweens if reduced motion is preferred
      if (prefersReducedMotion) {
        if (!isMobile) {
          element.style.display = "block";
        }
        return;
      }

      if (isMobile) {
        /* iOS-style slide up */
        gsap.fromTo(
          element,
          { y: "100%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 0.35,
            clearProps: "transform",
            onComplete: () => {
              // Clears the transform style completely so fixed children anchor to viewport again
              gsap.set(element, { clearProps: "transform" });
            },
          },
        );
      } else {
        element.style.display = "block";
        /* macOS-style scale in */
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
      }
    },
    {
      dependencies: [isOpen, isMobile, prefersReducedMotion],
      revertOnUpdate: true,
      scope: sectionRef,
    },
  );

  /* ── Draggable (desktop only) ───────────────────────────────────────────── */
  useGSAP(
    () => {
      const element = sectionRef.current;
      if (!element || isMobile || !isOpen) return; // nothing to drag while closed

      const header = element.querySelector<HTMLElement>("#window-header");
      const main = document.querySelector<HTMLElement>("main");

      if (!main) return;

      const [draggable] = Draggable.create(element, {
        trigger: header ?? element,
        bounds: main,
        edgeResistance: 0.5,
        onPress: () => {
          focusWindow(windowKey);
        },
      });

      // Runs when the window closes, the breakpoint changes, or on unmount
      return () => {
        draggable.kill();

        // Remove what the drag left on the element so the CSS position applies again
        gsap.set(element, { clearProps: "transform,touchAction,cursor" });
        if (header) gsap.set(header, { clearProps: "touchAction,cursor" });
      };
    },
    {
      scope: sectionRef,
      dependencies: [isOpen, isMobile],
      revertOnUpdate: true,
    },
  );

  /* ── Visibility sync ────────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    element.style.display = isOpen ? "block" : "none";
  }, [isOpen, isMobile]);

  return isMobile ? (
    <>
      {isOpen && (
        <section
          id={`mobile-${windowKey}`}
          ref={sectionRef}
          style={{ zIndex }}
          className={clsx("absolute", className)}
        >
          {children}
        </section>
      )}
    </>
  ) : (
    <section
      id={windowKey}
      ref={sectionRef}
      style={{ zIndex }}
      className={clsx("absolute", className)}
    >
      {children}
    </section>
  );
};

export default WindowFrame;
