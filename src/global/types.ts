export type Task = {
	id: string;
	label: string;
	dueTime: string | null;
	complete: boolean;
	notificationId?: number;
};

export type Settings = {
	notificationTime: string;
};
