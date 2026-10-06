/// <reference types="cypress" />
/// <reference types="cypress-axe" />

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] as const

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Run an axe-core scan scoped to WCAG 2.1 A/AA and fail on violations.
       */
      checkPageA11y(context?: Parameters<typeof cy.checkA11y>[0]): Chainable<void>
    }
  }
}

Cypress.Commands.add('checkPageA11y', (context = null) => {
  cy.checkA11y(
    context,
    {
      runOnly: {
        type: 'tag',
        values: [...WCAG_TAGS],
      },
    },
    (violations) => {
      cy.task(
        'log',
        violations
          .map((v) => `[${v.impact ?? 'unknown'}] ${v.id}: ${v.help} (${v.nodes.length})`)
          .join('\n'),
      )
    },
  )
})

export {}
