describe('Settings', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('navigates to the settings tab', () => {
    cy.contains('ion-tab-button', 'Réglages').click()
    cy.location('pathname').should('eq', '/settings')
    cy.contains('ion-title', 'Réglages').should('be.visible')
    cy.contains('ion-list-header', 'Notifications').should('exist')
  })

  it('saves the notification time', () => {
    cy.contains('ion-tab-button', 'Réglages').click()
    cy.get('input[type="time"]').type('09:30').blur()

    cy.window().should((win) => {
      const settings = JSON.parse(win.localStorage.getItem('settings') || '{}')
      expect(settings.notificationTime).to.eq('09:30')
    })
  })

  it('persists the saved notification time after navigation', () => {
    cy.contains('ion-tab-button', 'Réglages').click()
    cy.get('input[type="time"]').type('07:15').blur()

    cy.contains('ion-tab-button', 'Accueil').click()
    cy.contains('ion-tab-button', 'Réglages').click()

    cy.get('input[type="time"]').should('have.value', '07:15')
  })
})
