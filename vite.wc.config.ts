import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    lib: {
      entry: "./src/main-wc.ts",
      formats: ["es"],
      fileName: "pe-view",
    },
    outDir: "wc-dist",
    target: "esnext",
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
