import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
// import { dirname, resolve } from "path";
// import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    tsconfigPaths(),
  ],

  // resolve: {
  //   alias: {
  //     "@components": resolve(
  //       dirname(fileURLToPath(import.meta.url)),
  //       "components",
  //     ),
  //     "@constants": resolve(
  //       dirname(fileURLToPath(import.meta.url)),
  //       "constants",
  //     ),
  //     "@store": resolve(dirname(fileURLToPath(import.meta.url)), "store"),
  //     "@hooks": resolve(dirname(fileURLToPath(import.meta.url)), "hooks"),
  //     "@windows": resolve(dirname(fileURLToPath(import.meta.url)), "windows"),
  //   },
  // },
});
