import { MobileWindowControls } from "@/components/mobile";
import { WindowControls, WindowFrame } from "@/components/window";
import { MOBILE_QUERY, socials } from "@/constant";
import { clsx } from "cn";
import { useMediaQuery } from "react-responsive";

const Contact = () => {
  const isMobile = useMediaQuery({ query: MOBILE_QUERY });
  return (
    <WindowFrame windowKey="contact">
      {isMobile ? (
        <>
          {/* Mobile header */}
          <div id="mobile-window-header">
            <MobileWindowControls windowId="contact" title="Contact Me" />
          </div>
        </>
      ) : (
        <></>
      )}
      <div id="window-header">
        <WindowControls windowId="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className={clsx(isMobile ? "content" : "space-y-5 p-5")}>
        <img
          src="/images/mojahed.png"
          alt="mojahed"
          className="w-20 rounded-full"
        />
        <h3>Let's Connect!</h3>
        <p>
          I'm always open to new opportunities and collaborations. If you have a
          project in mind or just want to say hi, feel free to reach out!
        </p>
        <p>
          <a href="mailto:mojahedmohammed@gmail.com">
            mojahedmohammed@gmail.com
          </a>
        </p>

        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={`icon-${id.toFixed()}`} style={{ backgroundColor: bg }}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </WindowFrame>
  );
};

export default Contact;
