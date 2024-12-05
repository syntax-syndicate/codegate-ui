import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "./index.html",
      // output: {
      //   manualChunks: (id) => {
      //     if (id.includes("components/Chat.tsx")) {
      //       return "chat";
      //     }
      //     if (id.includes("nivo")) {
      //       return "nivo";
      //     }

      //     if (id.includes("lodash")) {
      //       return "lodash";
      //     }

      //     if (id.includes("recharts")) {
      //       return "recharts";
      //     }
      //   },
      // },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
