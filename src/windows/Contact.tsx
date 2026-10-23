import { WindowControls, WindowFrame } from "@/components/window";
import { socials } from "@/constant";

const Contact = () => {
  return (
    <WindowFrame windowKey="contact">
      <div id="window-header">
        <WindowControls windowId="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="space-y-5 p-5">
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
