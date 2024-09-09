type Task = {
	id: string;
	label: string;
	dueDate: string;
	dueTime: string|null;
	complete: boolean;
	notificationId?: number;
}

type Settings = {
	notificationTime: string;
}