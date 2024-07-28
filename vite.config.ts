import { defineConfig, loadEnv, ConfigEnv } from "vite";
import react from '@vitejs/plugin-react'
import AutoImport from "unplugin-auto-import/vite";
import DynComponents, { unpluginDynReactComponentsResolver } from 'dyn-components'

// https://vitejs.dev/config/
export default defineConfig(async (params: ConfigEnv) => {
  const { command, mode } = params;
  const ENV = loadEnv(mode, process.cwd());
  console.log("node version", process.version);
  console.info(
    `running mode: ${mode}, command: ${command}, ENV: ${JSON.stringify(ENV)}`
  );
  return {
    plugins: [
      react(),
      DynComponents(),
      AutoImport({
        resolvers: [unpluginDynReactComponentsResolver()],
      }),
    ],
    define: {
      '__DEV__': mode === 'development', // 自定义开发模式标识
      '__PROD__': mode === 'production', // 自定义生产模式标识
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    base: "./",
    build: {
      outDir: "dist/example",
      emptyOutDir: true,
      sourcemap: mode === "development",
      minify: mode !== "development",
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          // additionalData: `$injectedColor: orange;`
          additionalData: `@import "dyn-components/theme.scss";@import "@/assets/styles/globalInjectedScss/index.scss";`
        }
        // less: {
        //   modifyVars: {
        //     '@primary-color': '#1990EB',
        //     hack: `true; @import "@import "@/assets/stylesheets/globalInjectedLess/index.less";`
        //   },
        //   javascriptEnabled: true,
        // }
      }
      // postcss: {}
    },
  }
})
