import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";


// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['./src/data/**.json'],
  plugins: [reactRefresh()],
//   rollupOptions: {
//     external: [
//       //'react', 
//       //'react-dom',
      
//     ],
//     globals: {
//       //'react': 'React',
//       //'react-dom': 'ReactDOM'
//     },
//   },
  build: {
    outDir: "build"
  },
  server: {
    strictPort: true,
    hmr: {
      port: 443 // Run the websocket server on the SSL port
    }
  }
});
