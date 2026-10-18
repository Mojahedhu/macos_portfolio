import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (
  text: string,
  className: string,
  baseWeight: number = 400,
) => {
  return [...text].map((char, i) => (
    <span
      key={`${char}-${i}`}
      className={`${className}`}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const Welcome = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      const attachHoverEffect = (
        element: HTMLElement | null,
        type: "subtitle" | "title",
      ) => {
        if (!element) return;
        const letters = element.querySelectorAll<HTMLSpanElement>("span");
        const { min, max, default: base } = FONT_WEIGHTS[type];
        const onMouseMove = (e: MouseEvent) => {
          const elementRect = element.getBoundingClientRect();
          const mouseX = e.clientX - elementRect.left;
          letters.forEach((letter) => {
            const letterRect = letter.getBoundingClientRect();
            const letterCenter =
              letterRect.left - elementRect.left + letterRect.width / 2;
            const distance = Math.abs(mouseX - letterCenter);
            const intensity = Math.exp(-(distance ** 2) / 2500);
            const targetWeight = Math.round(min + (max - min) * intensity);
            gsap.to(letter, {
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
              fontVariationSettings: `'wght' ${targetWeight}`,
            });
          });
        };
        const onMouseLeave = () => {
          letters.forEach((letter) => {
            gsap.to(letter, {
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
              fontVariationSettings: `'wght' ${base}`,
            });
          });
        };
        element.addEventListener("mousemove", onMouseMove);
        element.addEventListener("mouseleave", onMouseLeave);
        return () => {
          element.removeEventListener("mousemove", onMouseMove);
          element.removeEventListener("mouseleave", onMouseLeave);
        };
      };
      const cleanupTitle = attachHoverEffect(titleRef.current, "title");
      const cleanupSubtitle = attachHoverEffect(
        subtitleRef.current,
        "subtitle",
      );
      return () => {
        cleanupTitle?.();
        cleanupSubtitle?.();
      };
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Mojahed welcome to my",
          "text-3xl font-georama",
          100,
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("portfolio.", "text-9xl italic font-georama", 400)}
      </h1>
      <div className="small-screen">
        <p>This portfolio is design for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
