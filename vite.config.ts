import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/zebra-game/", // <--- hier deinen Repo-Namen einsetzen
});
