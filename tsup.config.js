import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  clean: true,
  treeshake: true,
  sourcemap: false,
  // minify: true,
})
