import { CancelOptions, LocalNotifications } from "@capacitor/local-notifications";
import * as settingsServices from './settings.services'
import i18next from "../translations/i18n";

const getTitle = () => ({
	title: i18next.t('Notifications.let_s_go'),
	});

// ( doc : https://ionicframework.com/docs/native/local-notifications )
export async function createNotification(body: string, dueTime: string | null, existingId?: number): Promise<number> {
	let notificationId = -1;
	if ((await LocalNotifications.requestPermissions()).display === 'granted') {
		const notificationTime = settingsServices.getNotificationTimeHourAndMinute()
		notificationId = existingId || Math.floor(Math.random() * 600000000);
		console.log('NOTIF ::: ', getTitle())
		await LocalNotifications.schedule({
			notifications: [
				{
					title: i18next.t('Notifications.let_s_go'),
					body,
					largeIcon: "ic_launcher",
					smallIcon: "ic_launcher",
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
		const notificationIdsString = localStorage.getItem('notificationIds');
		const notificationIds = notificationIdsString ? JSON.parse(notificationIdsString) as Array<number> : []
		if (!notificationIds.includes(notificationId)) {
			notificationIds.push(notificationId)
			localStorage.setItem('notificationIds', JSON.stringify(notificationIds))
		}

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
	const notificationIdsString = localStorage.getItem('notificationIds');
	const notificationIds = notificationIdsString ? JSON.parse(notificationIdsString) as Array<number> : []
	const newNotificationIds = notificationIds.filter(id => id !== notificationId)
	localStorage.setItem('notificationIds', JSON.stringify(newNotificationIds))
}


export const createOrUpdateMainNotification = async () => {
	if ((await LocalNotifications.requestPermissions()).display === 'granted') {
		const notificationTime = settingsServices.getNotificationTimeHourAndMinute()
		const notificationId = 42;
		await LocalNotifications.schedule({
			notifications: [
				{
					title: i18next.t('Notifications.what_are_you_going_to_do_today'),
					body : i18next.t('Notifications.plan_your_day'),
					largeIcon: "ic_launcher",
					smallIcon: "ic_launcher",
					id: notificationId,
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
		const notificationIdsString = localStorage.getItem('notificationIds');
		const notificationIds = notificationIdsString ? JSON.parse(notificationIdsString) as Array<number> : []
		if (!notificationIds.includes(notificationId)) {
			notificationIds.push(notificationId)
			localStorage.setItem('notificationIds', JSON.stringify(notificationIds))
		}
	}
}