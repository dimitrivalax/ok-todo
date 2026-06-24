import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('./notifcation.services', () => ({
	createNotification: vi.fn(),
	cancelNotification: vi.fn(),
}))

import * as notificationService from './notifcation.services'
import { getTasks, saveNewtTask, updateTask } from './task.services'

const createNotificationMock = vi.mocked(notificationService.createNotification)
const cancelNotificationMock = vi.mocked(notificationService.cancelNotification)

beforeEach(() => {
	localStorage.clear()
	vi.clearAllMocks()
})

describe('updateTask', () => {
	it('persists the notificationId returned when a due time is (re)scheduled', async () => {
		createNotificationMock.mockResolvedValue(123)

		// A task that has a due time but never got a notificationId persisted.
		const task: Task = { id: 't1', label: 'arroser les plantes', dueTime: '09:00', complete: false }
		localStorage.setItem('tasks', JSON.stringify([task]))

		await updateTask({ ...task })

		const stored = getTasks()
		expect(stored).toHaveLength(1)
		expect(stored[0].notificationId).toBe(123)
		expect(createNotificationMock).toHaveBeenCalledWith('arroser les plantes', '09:00', undefined)
	})

	it('cancels the notification with the right id when a task is completed', async () => {
		const task: Task = { id: 't1', label: 'sortir le chien', dueTime: '09:00', complete: false, notificationId: 555 }
		localStorage.setItem('tasks', JSON.stringify([task]))

		await updateTask({ ...task, complete: true })

		expect(cancelNotificationMock).toHaveBeenCalledWith(555)
		expect(createNotificationMock).not.toHaveBeenCalled()
		expect(getTasks()[0].complete).toBe(true)
	})

	it('cancels the notification of an edited-then-completed task (regression)', async () => {
		// Task created without a due time -> no notificationId yet.
		createNotificationMock.mockResolvedValue(987)
		const newTask: Task = { id: 't1', label: 'appeler le dentiste', dueTime: null, complete: false }
		localStorage.setItem('tasks', JSON.stringify([newTask]))

		// User edits the task to add a due time: notificationId must now be persisted.
		await updateTask({ ...newTask, dueTime: '14:30' })
		const afterEdit = getTasks()[0]
		expect(afterEdit.notificationId).toBe(987)

		// User completes the task: the persisted id must be cancelled.
		await updateTask({ ...afterEdit, complete: true })
		expect(cancelNotificationMock).toHaveBeenCalledWith(987)
	})
})

describe('saveNewtTask', () => {
	it('stores the notificationId for a task created with a due time', async () => {
		createNotificationMock.mockResolvedValue(42)

		await saveNewtTask({ id: '', label: 'faire les courses', dueTime: '18:00', complete: false })

		const stored = getTasks()
		expect(stored).toHaveLength(1)
		expect(stored[0].notificationId).toBe(42)
		expect(stored[0].id).not.toBe('')
	})
})
