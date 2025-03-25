import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@atoms": path.resolve(__dirname, "src/custom_components/atoms"),
      "@molecules": path.resolve(__dirname, "src/custom_components/molecules"),
      "@organisms": path.resolve(__dirname, "src/custom_components/organisms"),
      "@templates": path.resolve(__dirname, "src/custom_components/templates"),
      "@pages": path.resolve(__dirname, "src/custom_components/pages"),
    },
  },
});
