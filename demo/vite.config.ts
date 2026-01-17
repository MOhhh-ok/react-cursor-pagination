import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-cursor-pagination": path.resolve(__dirname, "../src/index.ts"),
    },
  },
});
