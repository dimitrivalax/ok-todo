import { CancelOptions, LocalNotifications } from "@capacitor/local-notifications";
import * as settingsServices from './settings.services'
import i18next from "../translations/i18n";
import { readJson, writeJson } from "./storage.services";

const MAIN_NOTIFICATION_ID = 42;
const NOTIFICATION_ID_COUNTER_KEY = 'notificationIdCounter';
const NOTIFICATION_IDS_KEY = 'notificationIds';

function nextNotificationId(): number {
	// Start above the reserved main-notification id to avoid collisions.
	const current = readJson<number>(NOTIFICATION_ID_COUNTER_KEY, 100);
	const next = current + 1;
	writeJson(NOTIFICATION_ID_COUNTER_KEY, next);
	return next;
}

function trackNotificationId(notificationId: number): void {
	const notificationIds = readJson<number[]>(NOTIFICATION_IDS_KEY, []);
	if (!notificationIds.includes(notificationId)) {
		notificationIds.push(notificationId);
		writeJson(NOTIFICATION_IDS_KEY, notificationIds);
	}
}

// ( doc : https://ionicframework.com/docs/native/local-notifications )
export async function createNotification(body: string, dueTime: string | null, existingId?: number): Promise<number> {
	let notificationId = -1;
	if ((await LocalNotifications.requestPermissions()).display === 'granted') {
		const notificationTime = settingsServices.getNotificationTimeHourAndMinute()
		notificationId = existingId ?? nextNotificationId();
		await LocalNotifications.schedule({
			notifications: [
				{
					title: i18next.t('Notifications.let_s_go'),
					body,
					largeIcon: "ic_launcher",
					smallIcon: "notif_icon",
					id: notificationId,
					schedule: {
						allowWhileIdle: true,
						on: {
							hour: dueTime ? parseInt(dueTime.split(":")[0]) : notificationTime[0],
							minute: dueTime ? parseInt(dueTime.split(":")[1]) : notificationTime[1],
						},
					},
				},
			]
		});
		trackNotificationId(notificationId);
	}
	return notificationId;
}


export const cancelNotification = (notificationId: number) => {
	const cancelOption: CancelOptions = {
		notifications: [{ id: notificationId }]
	}
	LocalNotifications.cancel(cancelOption)
	removeIdFromNotificationIds(notificationId)
}

const removeIdFromNotificationIds = (notificationId: number) => {
	const notificationIds = readJson<number[]>(NOTIFICATION_IDS_KEY, [])
	const newNotificationIds = notificationIds.filter(id => id !== notificationId)
	writeJson(NOTIFICATION_IDS_KEY, newNotificationIds)
}


export const createOrUpdateMainNotification = async () => {
	try {
		if ((await LocalNotifications.requestPermissions()).display === 'granted') {
			const notificationTime = settingsServices.getNotificationTimeHourAndMinute()
			await LocalNotifications.schedule({
				notifications: [
					{
						title: i18next.t('Notifications.what_are_you_going_to_do_today'),
						body: i18next.t('Notifications.plan_your_day'),
						largeIcon: "ic_launcher",
						smallIcon: "notif_icon",
						id: MAIN_NOTIFICATION_ID,
						schedule: {
							allowWhileIdle: true,
							on: {
								hour: notificationTime[0],
								minute: notificationTime[1],
							},
						},
					},
				]
			});
			trackNotificationId(MAIN_NOTIFICATION_ID);
		}
	} catch (error) {
		console.warn('Local notifications unavailable:', error)
	}
}
