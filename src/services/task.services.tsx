import { v4 as uuidv4 } from 'uuid'

export const getTasks = () : Task[] => {
	const tasksString = localStorage.getItem('tasks');
	const tasks = tasksString ? JSON.parse(tasksString) as Array<Task> : []
	return tasks
}


export const saveNewtTask = (task: Task) => {
	if (!task.id) {
		task.id = uuidv4();
	}
	const tasksString = localStorage.getItem('tasks');
	const tasks = tasksString ? JSON.parse(tasksString) as Array<Task> : []
	tasks.push(task)
	localStorage.setItem('tasks', JSON.stringify(tasks))
}


export const removeTask = (id: string) => {
	const tasksString = localStorage.getItem('tasks');
	const tasks = tasksString ? JSON.parse(tasksString) as Array<Task> : []
	const newTasks = tasks.filter(task => task.id !== id)
	localStorage.setItem('tasks', JSON.stringify(newTasks))
}

export const updateTask= (task: Task) => {
	const tasksString = localStorage.getItem('tasks');
	const tasks = tasksString ? JSON.parse(tasksString) as Array<Task> : []
	const newTasks = tasks.filter(t => t.id !== task.id)
	newTasks.push(task)
	localStorage.setItem('tasks', JSON.stringify(newTasks))
}