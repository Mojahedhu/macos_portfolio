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
import { MobileHome, MobileNavBar } from "./components/mobile";

gsap.registerPlugin(Draggable);
// trigger vercel deployment
function App() {
  return (
    <>
      <main id="center">
        <Navbar />
        <MobileNavBar />
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
        <MobileHome />
      </main>
    </>
  );
}

export default App;
