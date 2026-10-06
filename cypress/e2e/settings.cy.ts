describe('Settings', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    // Visit /home directly so the tab click is not racing the / → /home redirect.
    cy.visit('/home')
    cy.location('pathname').should('eq', '/home')
  })

  it('navigates to the settings tab', () => {
    cy.get('ion-tab-button[tab="settings"]').click()
    cy.location('pathname').should('eq', '/settings')
    cy.contains('ion-title', 'Réglages').should('be.visible')
    cy.contains('ion-list-header', 'Notifications').should('exist')
  })

  it('saves the notification time', () => {
    cy.get('ion-tab-button[tab="settings"]').click()
    cy.get('input[type="time"]').type('09:30').blur()

    cy.window().should((win) => {
      const settings = JSON.parse(win.localStorage.getItem('settings') || '{}')
      expect(settings.notificationTime).to.eq('09:30')
    })
  })

  it('persists the saved notification time after navigation', () => {
    cy.get('ion-tab-button[tab="settings"]').click()
    cy.get('input[type="time"]').type('07:15').blur()

    cy.get('ion-tab-button[tab="home"]').click()
    cy.get('ion-tab-button[tab="settings"]').click()

    cy.get('input[type="time"]').should('have.value', '07:15')
  })
})
