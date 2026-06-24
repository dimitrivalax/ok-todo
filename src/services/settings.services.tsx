import { readJson, writeJson } from './storage.services'
import type { Settings } from '../global/types'

const SETTINGS_KEY = 'settings';

export const getSettings = (): Settings | null => {
	return readJson<Settings | null>(SETTINGS_KEY, null);
}

export const saveSettings = (settings: Settings) => {
	writeJson(SETTINGS_KEY, settings);
}

// return an array of number [defaultHour, defaultMinute]
export const getNotificationTimeHourAndMinute = (): number[] => {
	const settings = getSettings();
	const defaultHour: number = settings?.notificationTime ? parseInt(settings.notificationTime.split(':')[0]) : 8
	const defaultMinute = settings?.notificationTime ? parseInt(settings.notificationTime.split(':')[1]) : 30
	return [defaultHour, defaultMinute]
}
