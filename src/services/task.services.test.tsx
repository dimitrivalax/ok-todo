import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Task } from '../global/types'

vi.mock('./notification.services', () => ({
	createNotification: vi.fn(),
	cancelNotification: vi.fn(),
}))

import * as notificationService from './notification.services'
import { getTasks, removeTask, saveNewTask, sortTaskByDueTime, updateTask } from './task.services'

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

describe('saveNewTask', () => {
	it('stores the notificationId for a task created with a due time', async () => {
		createNotificationMock.mockResolvedValue(42)

		await saveNewTask({ id: '', label: 'faire les courses', dueTime: '18:00', complete: false })

		const stored = getTasks()
		expect(stored).toHaveLength(1)
		expect(stored[0].notificationId).toBe(42)
		expect(stored[0].id).not.toBe('')
	})

	it('does not schedule a notification for a task without a due time', async () => {
		await saveNewTask({ id: '', label: 'ranger le garage', dueTime: null, complete: false })

		expect(createNotificationMock).not.toHaveBeenCalled()
		expect(getTasks()[0].notificationId).toBeUndefined()
	})
})

describe('removeTask', () => {
	it('removes the task and cancels its notification', () => {
		const task: Task = { id: 't1', label: 'payer le loyer', dueTime: '10:00', complete: false, notificationId: 321 }
		localStorage.setItem('tasks', JSON.stringify([task]))

		removeTask(task)

		expect(getTasks()).toHaveLength(0)
		expect(cancelNotificationMock).toHaveBeenCalledWith(321)
	})

	it('does not call cancel when the task has no notificationId', () => {
		const task: Task = { id: 't1', label: 'lire un livre', dueTime: null, complete: false }
		localStorage.setItem('tasks', JSON.stringify([task]))

		removeTask(task)

		expect(cancelNotificationMock).not.toHaveBeenCalled()
	})
})

describe('sortTaskByDueTime', () => {
	it('orders tasks by due time and pushes tasks without a due time to the end', () => {
		const tasks: Task[] = [
			{ id: 'a', label: 'a', dueTime: null, complete: false },
			{ id: 'b', label: 'b', dueTime: '09:00', complete: false },
			{ id: 'c', label: 'c', dueTime: '07:30', complete: false },
		]

		const sorted = sortTaskByDueTime(tasks)

		expect(sorted.map(t => t.id)).toEqual(['c', 'b', 'a'])
	})

	it('does not mutate the input array', () => {
		const tasks: Task[] = [
			{ id: 'b', label: 'b', dueTime: '09:00', complete: false },
			{ id: 'c', label: 'c', dueTime: '07:30', complete: false },
		]
		const original = [...tasks]

		sortTaskByDueTime(tasks)

		expect(tasks).toEqual(original)
	})
})
