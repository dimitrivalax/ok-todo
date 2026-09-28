describe('Navigation', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('redirects / to /home', () => {
    cy.visit('/')
    cy.location('pathname').should('eq', '/home')
    cy.contains('ion-tab-button', 'Accueil').should('exist')
  })

  it('switches between home and settings tabs', () => {
    cy.visit('/home')

    cy.contains('ion-tab-button', 'Réglages').click()
    cy.location('pathname').should('eq', '/settings')
    cy.contains('ion-title', 'Réglages').should('be.visible')

    cy.contains('ion-tab-button', 'Accueil').click()
    cy.location('pathname').should('eq', '/home')
    cy.contains('ion-list-header', "Aujourd'hui").should('exist')
  })

  it('opens the settings route directly', () => {
    cy.visit('/settings')
    cy.location('pathname').should('eq', '/settings')
    cy.contains('ion-title', 'Réglages').should('be.visible')
  })
})
