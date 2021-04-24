import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import styleImport from "vite-plugin-style-import";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "",
  // publicDir: "",
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
  ],
  // optimizeDeps: {
  //   include: ["element-plus/lib/locale/lang/zh-cn"],
  // },
  resolve: {
    alias: {
      "@": resolve(process.cwd(), "src"),
    },
  },
  define: {
    // HOST: JSON.stringify("http://api.test.com:8000"),
    // EVENTBUS_HOST: JSON.stringify("http://api.test.com:8001"),
  },
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: "css/[name].[hash].css",
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
        manualChunks: {
          vue: ["vue"],
          "vue-router": ["vue-router"],
          vuex: ["vuex"],
          axios: ["axios"],
          mitt: ["mitt"],
          "lodash-es": ["lodash-es"],
          "element-plus": ["element-plus"],
        },
      },
    },
  },
  // server: {
  //   proxy: {
  //     "^/api/.*": {
  //       target: "https://...",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
