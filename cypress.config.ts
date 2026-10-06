import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    // Ionic components rely heavily on the shadow DOM, so let queries pierce it.
    includeShadowDom: true,
    defaultCommandTimeout: 10000,
    // Accessibility suite runs in its own CI job via `pnpm test.a11y`.
    excludeSpecPattern:
      process.env.CYPRESS_EXCLUDE_A11Y === "1"
        ? ["**/accessibility.cy.ts"]
        : [],
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
