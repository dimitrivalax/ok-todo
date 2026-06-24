import { beforeEach, describe, expect, it } from 'vitest'
import { getNotificationTimeHourAndMinute, getSettings, saveSettings } from './settings.services'

beforeEach(() => {
	localStorage.clear()
})

describe('getSettings', () => {
	it('returns null when nothing is stored', () => {
		expect(getSettings()).toBeNull()
	})

	it('returns null when the stored value is corrupted', () => {
		localStorage.setItem('settings', '{ not valid json')
		expect(getSettings()).toBeNull()
	})

	it('round-trips saved settings', () => {
		saveSettings({ notificationTime: '07:15' })
		expect(getSettings()).toEqual({ notificationTime: '07:15' })
	})
})

describe('getNotificationTimeHourAndMinute', () => {
	it('falls back to 08:30 when no settings are stored', () => {
		expect(getNotificationTimeHourAndMinute()).toEqual([8, 30])
	})

	it('parses the stored notification time', () => {
		saveSettings({ notificationTime: '21:05' })
		expect(getNotificationTimeHourAndMinute()).toEqual([21, 5])
	})
})
