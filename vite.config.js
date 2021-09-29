import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['./src/data/**.json'],
  plugins: [],
  rollupOptions: {
    external: [
      'react', 
      'react-dom',
      'plotly.js-basic-dist-min',
    ],
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'plotly.js-basic-dist-min': 'Plotly'
    },
  },
  build: {
    outDir: "build",
    minify: false
  },
  base: "/oath-campaign/",
  server: {
    strictPort: true
    //hmr: {
    //  port: 443 // Run the websocket server on the SSL port
    //}
  }
});
