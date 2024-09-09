
export const getSettings = (): Settings | null => {
	const settingsString = localStorage.getItem('settings');
	return settingsString ? JSON.parse(settingsString) as Settings : null;
}

export const saveSettings = (settings: Settings) => {
	localStorage.setItem('settings', JSON.stringify(settings));
}

// return an array of number [defaultHour, defaultMinute]
export const getNotificationTimeHourAndMinute = (): number[] => {
	const settings = getSettings();
	const defaultHour: number = settings?.notificationTime ? parseInt(settings.notificationTime.split(':')[0]) : 8
	const defaultMinute = settings?.notificationTime ? parseInt(settings.notificationTime.split(':')[1]) : 30
	return [defaultHour, defaultMinute]
}