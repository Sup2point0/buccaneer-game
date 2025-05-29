import adapter from "@sveltejs/adapter-static";
import { sveltePreprocess } from "svelte-preprocess";

import { mdsvex } from "mdsvex";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex-svelte";

import { correct_hast_tree, render_katex_blocks } from "./latex-config.js";


const config = {
  extensions: [".svelte", ".md", ".svx"],

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: false,
      strict: true,
    }),
    paths: {
      base: process.argv.includes("dev") ? "" : process.env.BASE_PATH
    },
    alias: {
      "#src": "./src/",
      "#parts": "./src/parts",
      "#styles": "./src/styles",
      "#scripts": "./src/scripts",
    },
    prerender: {
      handleHttpError: "warn",
    },
  },

  preprocess: [
    mdsvex({
      extensions: [".md", ".svx"],
      remarkPlugins: [
        remarkMath,
        render_katex_blocks
      ],
      rehypePlugins: [
        correct_hast_tree,
        rehypeKatex,
      ],
    }),
    sveltePreprocess({
      scss: {
        prependData: `
          @use './src/styles/mixins/colours' as *;
          @use './src/styles/mixins/fonts' as *;
        `,
      }
    }),
  ],
};

export default config;
