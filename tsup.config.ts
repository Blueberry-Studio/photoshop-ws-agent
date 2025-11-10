import { defineConfig } from "tsup";
import fs from "fs";

export default defineConfig({
  entry: ["src/main.ts"],
  outDir: "dist",
  format: ["cjs"],
  target: "es2019",
  platform: "browser",
  sourcemap: true,
  clean: true,
  bundle: true,
  external: ["photoshop", "uxp"],
  noExternal: ["socket.io-client"],
  async onSuccess() {
    fs.copyFileSync("manifest.json", "dist/manifest.json");
    console.log("✅ manifest.json copied to dist/");
  },
});
