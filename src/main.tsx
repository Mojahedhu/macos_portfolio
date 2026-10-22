import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// ── Prevent Flash of Unstyled Content ──────────────────────────────────────
// Runs synchronously before React hydrates — applies .dark before first paint.
(function initTheme() {
  const stored = localStorage.getItem("theme") as
    | "light"
    | "dark"
    | "system"
    | null;
  const preference = stored ?? "system";
  const systemDark = window.matchMedia("(prefers-color-scheme: dark").matches;
  const isDark =
    preference === "dark" || (preference === "system" && systemDark);
  if (isDark) document.documentElement.classList.add("dark");
})();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
