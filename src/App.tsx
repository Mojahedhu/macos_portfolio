import { Draggable } from "gsap/all";
import "./index.css";
import { Navbar, Welcome, Dock, Home } from "@/components";
import {
  Terminal,
  Safari,
  Resume,
  Finder,
  Text,
  ImageWindowViewer,
  Contact,
  Image,
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
        <Image />
        <Home />
      </main>
    </>
  );
}

export default App;
