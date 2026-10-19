import { Draggable } from "gsap/all";
import "./index.css";
import { Navbar, Welcome, Dock } from "@/components";
import { Terminal, Safari, Resume } from "@/windows";
import gsap from "gsap";

gsap.registerPlugin(Draggable);

function App() {
  return (
    <>
      <main id="center">
        <Navbar />
        <Welcome />
        <Dock />
        <Terminal />
        <Safari />
        <Resume />
      </main>
    </>
  );
}

export default App;
