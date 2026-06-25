// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// The app auto-detects its UI language from `navigator.language` at startup
// (see src/translations/i18n.ts). Under headless Electron this resolves to
// English, but the e2e specs assert the French UI. Force French on every page
// load (covers cy.visit and cy.reload) before the app bundle initializes.
Cypress.on('window:before:load', (win) => {
  Object.defineProperty(win.navigator, 'language', { value: 'fr-FR', configurable: true })
  Object.defineProperty(win.navigator, 'languages', { value: ['fr-FR', 'fr'], configurable: true })
})

// The Capacitor LocalNotifications plugin is unavailable when the app runs in a
// desktop browser (as it does under Cypress). Those runtime errors are expected
// and unrelated to the UI behavior we test here, so we swallow them.
Cypress.on('uncaught:exception', (err) => {
  const message = err?.message ?? ''
  const code = (err as { code?: string })?.code ?? ''
  if (
    code === 'UNAVAILABLE' ||
    /not supported|not implemented|notifications/i.test(message)
  ) {
    return false
  }
  return undefined
})