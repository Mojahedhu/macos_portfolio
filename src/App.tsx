import { Draggable } from "gsap/all";
import "./index.css";
import { Navbar, Welcome, Dock } from "@/components";
import {
  Terminal,
  Safari,
  Resume,
  Finder,
  Text,
  ImageWindowViewer,
  Contact,
} from "@/windows";
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
        <Finder />
        <Text />
        <ImageWindowViewer />
        <Contact />
      </main>
    </>
  );
}

export default App;
