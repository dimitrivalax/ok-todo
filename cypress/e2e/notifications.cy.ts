type SeedTask = {
  id: string
  label: string
  dueTime: string | null
  complete: boolean
  notificationId?: number
}

type CapCall = {
  plugin: string
  method: string
  options: { notifications?: Array<{ id: number }> }
}

// Installs a fake @capacitor/local-notifications implementation.
//
// We can't override the plugin proxy methods directly (the proxy only has a
// `get` trap), so instead we declare a native PluginHeader for it. Capacitor
// then routes every plugin method call through `Capacitor.nativePromise`, which
// we stub here to record the calls and return canned responses.
function installNotificationStub(win: Cypress.AUTWindow, tasks: SeedTask[]) {
  win.localStorage.setItem('tasks', JSON.stringify(tasks))

  const calls: CapCall[] = []
  ;(win as unknown as { __capCalls: CapCall[] }).__capCalls = calls

  const methods = ['requestPermissions', 'checkPermissions', 'schedule', 'cancel'].map((name) => ({
    name,
    rtype: 'promise',
  }))

  ;(win as unknown as { Capacitor: Record<string, unknown> }).Capacitor = {
    PluginHeaders: [{ name: 'LocalNotifications', methods }],
    nativePromise: (plugin: string, method: string, options: CapCall['options']) => {
      calls.push({ plugin, method, options: options || {} })
      switch (method) {
        case 'requestPermissions':
        case 'checkPermissions':
          return Promise.resolve({ display: 'granted' })
        case 'schedule':
          return Promise.resolve({ notifications: options?.notifications ?? [] })
        default:
          return Promise.resolve({})
      }
    },
  }
}

function getCalls(win: Cypress.AUTWindow): CapCall[] {
  return (win as unknown as { __capCalls: CapCall[] }).__capCalls ?? []
}

function readTasks(win: Cypress.AUTWindow): SeedTask[] {
  return JSON.parse(win.localStorage.getItem('tasks') || '[]')
}

describe('Task notifications', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('cancels the scheduled notification when a task is completed via the toggle', () => {
    const label = 'promener le chien'
    const notificationId = 777
    cy.visit('/', {
      onBeforeLoad: (win) =>
        installNotificationStub(win, [
          { id: 'seed-1', label, dueTime: '09:00', complete: false, notificationId },
        ]),
    })

    cy.contains('ion-item', label).find('ion-toggle').click()

    cy.window().should((win) => {
      expect(readTasks(win)[0].complete).to.eq(true)

      const cancelled = getCalls(win).filter((c) => c.plugin === 'LocalNotifications' && c.method === 'cancel')
      const cancelledIds = cancelled.flatMap((c) => (c.options.notifications ?? []).map((n) => n.id))
      expect(cancelledIds).to.include(notificationId)
    })
  })

  it('reschedules the notification when a completed task is toggled back on', () => {
    const label = 'arroser les plantes'
    const notificationId = 555
    cy.visit('/', {
      onBeforeLoad: (win) =>
        installNotificationStub(win, [
          { id: 'seed-1', label, dueTime: '09:00', complete: true, notificationId },
        ]),
    })

    cy.contains('ion-item', label).find('ion-toggle').click()

    cy.window().should((win) => {
      expect(readTasks(win)[0].complete).to.eq(false)
      expect(readTasks(win)[0].notificationId).to.eq(notificationId)

      // The main notification uses id 42, so make sure the task notification (555)
      // was the one rescheduled.
      const scheduled = getCalls(win).filter((c) => c.plugin === 'LocalNotifications' && c.method === 'schedule')
      const scheduledIds = scheduled.flatMap((c) => (c.options.notifications ?? []).map((n) => n.id))
      expect(scheduledIds).to.include(notificationId)
    })
  })
})
