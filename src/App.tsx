import "./index.css";
import { Navbar, Welcome, Dock } from "@/components";
function App() {
  return (
    <>
      <main id="center">
        <Navbar />
        <Welcome />
        <Dock />
      </main>
    </>
  );
}

export default App;
