type SeedTask = {
  id: string
  label: string
  dueTime: string | null
  complete: boolean
}

function readTasks(win: Cypress.AUTWindow): SeedTask[] {
  return JSON.parse(win.localStorage.getItem('tasks') || '[]')
}

function seedTask(label: string) {
  cy.window().then((win) => {
    const task: SeedTask = { id: 'seed-1', label, dueTime: null, complete: false }
    win.localStorage.setItem('tasks', JSON.stringify([task]))
  })
  cy.reload()
}

describe('Task management', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('redirects to the home tab and shows the three task sections', () => {
    cy.location('pathname').should('eq', '/home')
    cy.contains('ion-list-header', "Aujourd'hui").should('exist')
    cy.contains('ion-list-header', 'Demain').should('exist')
    cy.contains('ion-list-header', 'Un jour').should('exist')
  })

  it('creates a new task without a due time', () => {
    const label = 'acheter du pain'

    cy.get('ion-fab-button').click()
    cy.contains('ion-title', 'Nouvelle tache').should('be.visible')
    cy.get('input[type="text"]').type(label).should('have.value', label)
    cy.contains('ion-button', 'Sauver').click()

    cy.contains('ion-item', label).should('be.visible')
    cy.window().then((win) => {
      const tasks = readTasks(win)
      expect(tasks).to.have.length(1)
      expect(tasks[0].label).to.eq(label)
      expect(tasks[0].complete).to.eq(false)
      expect(tasks[0].dueTime).to.eq(null)
    })
  })

  it('does not save a task with an empty label', () => {
    cy.get('ion-fab-button').click()
    cy.contains('ion-button', 'Sauver').should('have.class', 'button-disabled')
    cy.contains('ion-button', 'Annuler').click()
    cy.window().then((win) => {
      expect(readTasks(win)).to.have.length(0)
    })
  })

  it('edits an existing task', () => {
    seedTask('tache initiale')

    cy.contains('ion-label', 'tache initiale').click()
    cy.contains('ion-title', 'Modifier').should('be.visible')
    cy.get('input[type="text"]').clear().type('tache modifiee').should('have.value', 'tache modifiee')
    cy.contains('ion-button', 'Sauver').click()

    cy.contains('ion-item', 'tache modifiee').should('be.visible')
    cy.window().then((win) => {
      const labels = readTasks(win).map((t) => t.label)
      expect(labels).to.include('tache modifiee')
      expect(labels).to.not.include('tache initiale')
    })
  })

  it('marks a task as complete with the toggle', () => {
    seedTask('faire le menage')

    cy.contains('ion-item', 'faire le menage').find('ion-toggle').click()

    cy.window().should((win) => {
      const tasks = readTasks(win)
      expect(tasks[0].complete).to.eq(true)
    })
  })

  it('deletes a task after confirmation', () => {
    seedTask('tache a supprimer')

    cy.contains('ion-label', 'tache a supprimer').click()
    cy.contains('ion-button', 'Supprimer').click()
    cy.contains('Tu veux vraiment supprimer').should('be.visible')
    cy.contains('button', 'Oui').click()

    cy.contains('ion-item', 'tache a supprimer').should('not.exist')
    cy.window().should((win) => {
      expect(readTasks(win)).to.have.length(0)
    })
  })
})
