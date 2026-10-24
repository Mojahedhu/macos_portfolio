import { MobileWindowControls } from "@/components/mobile";
import { WindowControls, WindowFrame } from "@/components/window";

import { MOBILE_QUERY, techStack } from "@/constant";
import { clsx } from "cn";
import { Check, ChevronRight, Flag } from "lucide-react";
import { useMediaQuery } from "react-responsive";

const Terminal = () => {
  const isMobile = useMediaQuery({ query: MOBILE_QUERY });
  return (
    <WindowFrame windowKey={"terminal"}>
      {isMobile ? (
        <>
          {/* Mobile header */}
          <div id="mobile-window-header">
            <MobileWindowControls windowId="terminal" title="Terminal" />
          </div>
        </>
      ) : (
        <>
          {/* Window header */}
          <div id="window-header">
            <WindowControls windowId="terminal" />
            <h2>Tech Stack</h2>
          </div>
        </>
      )}

      <div className="techstack">
        <p>
          <span className="font-bold">@mojahed %</span>
          show tech stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li
              key={category}
              className={clsx(isMobile ? "flex-col" : "items-center", "flex")}
            >
              {isMobile ? (
                <div className="flex flex-row">
                  <ChevronRight className="check" size={20} />
                  <h3>{category}</h3>
                </div>
              ) : (
                <>
                  <Check className="check" size={20} />
                  <h3>{category}</h3>
                </>
              )}

              <ul className="">
                {items.map((item, i) => (
                  <li key={`${item}-${i.toFixed()}`}>
                    {item}
                    {i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <Check size={20} /> 5 of 5 stacks loaded successfully (100%)
          </p>

          <p className="text-foreground">
            <Flag fill="black" size={15} />
            Render time: 6ms
          </p>
        </div>
      </div>
    </WindowFrame>
  );
};

export default Terminal;
