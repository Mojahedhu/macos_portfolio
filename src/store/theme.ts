import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Theme = "dark" | "light" | "system";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: () => "light" | "dark";
}

/** Reads the OS preference */
const getSystemTheme = (): "dark" | "light" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

/** Applies/removes the '.dark' class on <html> */
export const applyTheme = (theme: Theme) => {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  const root = document.documentElement;

  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

const useThemeStore = create<ThemeStore>()(
  immer((set, get) => ({
    theme: (localStorage.getItem("theme") as Theme) ?? "system",
    setTheme: (theme) => {
      set((state) => {
        state.theme = theme;
      });
      localStorage.setItem("theme", theme);
      applyTheme(theme);
    },
    resolvedTheme: () => {
      const { theme } = get();
      return theme === "system" ? getSystemTheme() : theme;
    },
  })),
);

export default useThemeStore;
