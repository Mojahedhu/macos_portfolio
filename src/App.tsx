import { Draggable } from "gsap/all";
import "./index.css";
import { Navbar, Welcome, Dock } from "@/components";
import { Terminal } from "@/windows";
import gsap from "gsap";
import Safari from "./components/window/Safari";

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
      </main>
    </>
  );
}

export default App;
