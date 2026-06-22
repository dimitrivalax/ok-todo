import { v4 as uuidv4 } from 'uuid';
import * as notificationService from './notifcation.services'

export const getTasks = () : Task[] => {
	const tasksString = localStorage.getItem('tasks');
	const tasks = tasksString ? JSON.parse(tasksString) as Array<Task> : []
	return tasks
}


export const saveNewtTask = async (task: Task) => {
	if (!task.id) {
		task.id = uuidv4();
	}
	const tasksString = localStorage.getItem('tasks');
	const tasks = tasksString ? JSON.parse(tasksString) as Array<Task> : []
	
	if (task.dueTime){
		task.notificationId = await notificationService.createNotification(task.label, task.dueTime);
	}
	
	tasks.push(task)
	localStorage.setItem('tasks', JSON.stringify(tasks))
}


export const removeTask = (task: Task) => {
	const tasksString = localStorage.getItem('tasks');
	const tasks = tasksString ? JSON.parse(tasksString) as Array<Task> : []
	const newTasks = tasks.filter(t => t.id !== task.id)
	localStorage.setItem('tasks', JSON.stringify(newTasks))
	notificationService.cancelNotification(task.notificationId!)
}

export const updateTask= async (task: Task) => {
	const tasksString = localStorage.getItem('tasks');
	const tasks = tasksString ? JSON.parse(tasksString) as Array<Task> : []
	const newTasks = tasks.filter(t => t.id !== task.id)
	newTasks.push(task)
	localStorage.setItem('tasks', JSON.stringify(newTasks))
	if (task.complete){
		notificationService.cancelNotification(task.notificationId!)
	} else {
		if (task.dueTime){
			await notificationService.createNotification(task.label, task.dueTime, task.notificationId)
		} else {
			notificationService.cancelNotification(task.notificationId!)
		}
		
	}
}

export const sortTaskByDueTime = (tasks: Task[]) : Task[] => {
	const orderedTasks = tasks;
	return orderedTasks.sort((a:Task, b:Task) => compareTaskByDueDate(a, b))
}


function compareTaskByDueDate( a:Task, b:Task ) {
	if(a.dueTime === null && b.dueTime === null){
		return 0
	}
	if(a.dueTime !== null && b.dueTime === null){
		return -1
	}
	if(a.dueTime === null && b.dueTime !== null){
		return 1
	}
	if ( a.dueTime! < b.dueTime! ){
	  return -1;
	}
	if ( a.dueTime! > b.dueTime! ){
	  return 1;
	}
	return 0;
  }