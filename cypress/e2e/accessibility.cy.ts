type SeedTask = {
  id: string
  label: string
  dueTime: string | null
  complete: boolean
}

function seedTask(label: string) {
  cy.window().then((win) => {
    const task: SeedTask = { id: 'seed-a11y-1', label, dueTime: null, complete: false }
    win.localStorage.setItem('tasks', JSON.stringify([task]))
  })
  cy.reload()
}

function injectAndCheck() {
  cy.injectAxe()
  cy.checkPageA11y()
}

function isInsideModal(el: Element | null): boolean {
  let current: Element | null = el
  while (current) {
    if (current.tagName === 'ION-MODAL') {
      return true
    }
    const root = current.getRootNode()
    current = root instanceof ShadowRoot ? root.host : current.parentElement
  }
  return false
}

function expectFocusInsideModal() {
  cy.window().should((win) => {
    expect(isInsideModal(win.document.activeElement), 'focus remains in modal').to.eq(true)
  })
}

describe('Accessibility', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
    cy.location('pathname').should('eq', '/home')
  })

  it('has no detectable WCAG 2.1 AA violations on empty home', () => {
    cy.contains('ion-list-header', "Aujourd'hui").should('exist')
    injectAndCheck()
  })

  it('has no detectable WCAG 2.1 AA violations on home with tasks', () => {
    seedTask('tache a11y')
    cy.contains('ion-item', 'tache a11y').should('be.visible')
    injectAndCheck()
  })

  it('has no detectable WCAG 2.1 AA violations in the create-task modal', () => {
    cy.get('ion-fab-button').click()
    cy.contains('ion-title', 'Nouvelle tache').should('be.visible')
    injectAndCheck()
  })

  it('has no detectable WCAG 2.1 AA violations on the delete confirmation alert', () => {
    seedTask('tache a supprimer')
    cy.contains('ion-label', 'tache a supprimer').click()
    cy.contains('ion-button', 'Supprimer').click()
    cy.contains('Tu veux vraiment supprimer').should('be.visible')
    injectAndCheck()
  })

  it('has no detectable WCAG 2.1 AA violations on settings', () => {
    cy.contains('ion-tab-button', 'Réglages').click()
    cy.location('pathname').should('eq', '/settings')
    cy.contains('ion-title', 'Réglages').should('be.visible')
    injectAndCheck()
  })

  it('exposes accessible names for key controls and traps focus in the task modal', () => {
    cy.get('ion-fab-button').should(($el) => {
      const host = $el[0] as HTMLElement
      const native = host.shadowRoot?.querySelector('button, a')
      const label =
        host.getAttribute('aria-label') ||
        native?.getAttribute('aria-label') ||
        ''
      expect(
        label,
        `expected accessible name on FAB (shadowRoot=${Boolean(host.shadowRoot)}, hostAttrs=${host.getAttributeNames().join(',')})`,
      ).to.eq('Nouvelle tache')
    })

    cy.get('ion-fab-button').click()
    cy.contains('ion-title', 'Nouvelle tache').should('be.visible')
    cy.get('ion-modal').should('be.visible')

    expectFocusInsideModal()

    cy.contains('ion-button', 'Annuler').should('be.visible')
    cy.contains('ion-button', 'Sauver').should('be.visible')

    // Floating label from IonInput ("Quoi ?") must be present for the text field.
    cy.get('ion-modal').should('contain.text', 'Quoi')

    // Tab through modal controls; focus must stay inside the overlay.
    for (let i = 0; i < 6; i += 1) {
      cy.press(Cypress.Keyboard.Keys.TAB)
      expectFocusInsideModal()
    }
  })

  it('exposes named actions on the delete confirmation alert', () => {
    seedTask('tache a supprimer')
    cy.contains('ion-label', 'tache a supprimer').click()
    cy.contains('ion-button', 'Supprimer').should('be.visible').and('not.be.disabled')
    cy.contains('ion-button', 'Supprimer').click()
    cy.contains('Tu veux vraiment supprimer').should('be.visible')

    cy.contains('button', 'Oui').should('be.visible').and('not.be.disabled')
    cy.contains('button', 'Non').should('be.visible').and('not.be.disabled')
  })
})
