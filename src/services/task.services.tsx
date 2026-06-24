import { v4 as uuidv4 } from 'uuid';
import * as notificationService from './notification.services'
import { readJson, writeJson } from './storage.services'
import type { Task } from '../global/types'

const TASKS_KEY = 'tasks';

export const getTasks = (): Task[] => {
	return readJson<Task[]>(TASKS_KEY, [])
}


export const saveNewTask = async (task: Task) => {
	if (!task.id) {
		task.id = uuidv4();
	}
	const tasks = getTasks()

	if (task.dueTime) {
		task.notificationId = await notificationService.createNotification(task.label, task.dueTime);
	}

	tasks.push(task)
	writeJson(TASKS_KEY, tasks)
}


export const removeTask = (task: Task) => {
	const tasks = getTasks()
	const newTasks = tasks.filter(t => t.id !== task.id)
	writeJson(TASKS_KEY, newTasks)
	if (task.notificationId != null) {
		notificationService.cancelNotification(task.notificationId)
	}
}

export const updateTask = async (task: Task) => {
	const tasks = getTasks()
	const newTasks = tasks.filter(t => t.id !== task.id)
	if (task.complete) {
		if (task.notificationId != null) {
			notificationService.cancelNotification(task.notificationId)
		}
	} else {
		if (task.dueTime) {
			task.notificationId = await notificationService.createNotification(task.label, task.dueTime, task.notificationId)
		} else if (task.notificationId != null) {
			notificationService.cancelNotification(task.notificationId)
		}
	}
	newTasks.push(task)
	writeJson(TASKS_KEY, newTasks)
}

export const sortTaskByDueTime = (tasks: Task[]): Task[] => {
	return [...tasks].sort((a: Task, b: Task) => compareTaskByDueDate(a, b))
}


function compareTaskByDueDate(a: Task, b: Task) {
	if (a.dueTime === null && b.dueTime === null) {
		return 0
	}
	if (a.dueTime !== null && b.dueTime === null) {
		return -1
	}
	if (a.dueTime === null && b.dueTime !== null) {
		return 1
	}
	if (a.dueTime! < b.dueTime!) {
		return -1;
	}
	if (a.dueTime! > b.dueTime!) {
		return 1;
	}
	return 0;
}
