import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the build works on any host or sub-folder (e.g. GitHub Pages).
  base: "./",
});
