import { copyFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** GitHub Pages serves 404.html for unknown paths; copying index.html enables SPA refreshes. */
function githubPagesSpaFallback() {
  return {
    name: "github-pages-spa-fallback",
    closeBundle() {
      const outDir = resolve(__dirname, "dist");
      copyFileSync(resolve(outDir, "index.html"), resolve(outDir, "404.html"));
    },
  };
}

export default defineConfig({
  plugins: [react(), githubPagesSpaFallback()],
  base: "./",
});
