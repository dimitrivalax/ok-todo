import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    // Ionic components rely heavily on the shadow DOM, so let queries pierce it.
    includeShadowDom: true,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      on("task", {
        log(message: string) {
          console.log(message);
          return null;
        },
      });
      return config;
    },
  },
});