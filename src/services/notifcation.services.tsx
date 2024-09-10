import { CancelOptions, LocalNotifications } from "@capacitor/local-notifications";
import * as settingsServices from './settings.services'

// ( doc : https://ionicframework.com/docs/native/local-notifications )
export async function createNotification(body: string, dueTime: string | null, existingId?: number): Promise<number> {
	let notificationId = -1;
	console.log('createNotification :::: ', body)
	if ((await LocalNotifications.requestPermissions()).display === 'granted') {
		const notificationTime = settingsServices.getNotificationTimeHourAndMinute()
		notificationId = existingId || Math.floor(Math.random() * 600000000);
		await LocalNotifications.schedule({
			notifications: [
				{
					title: "Allez !",
					body,
					largeIcon: "ic_launcher",
					smallIcon: "ic_launcher",
					id: notificationId,
					schedule: {
						allowWhileIdle: true,
						on: {
							hour: dueTime? parseInt(dueTime.split(":")[0]) : notificationTime[0],
							minute: dueTime? parseInt(dueTime.split(":")[1]) : notificationTime[1],
						},
					},
				},
			]
		});
		const notificationIdsString = localStorage.getItem('notificationIds');
		const notificationIds = notificationIdsString ? JSON.parse(notificationIdsString) as Array<number> : []
		notificationIds.push(notificationId)
		localStorage.setItem('notificationIds', JSON.stringify(notificationIds))
	}
	return notificationId;
}


export const cancelNotification = (notificationId: number) => {
	const cancelOption : CancelOptions = {
		notifications: [{id: notificationId}]
	}
	LocalNotifications.cancel(cancelOption)
	removeIdFromNotificationIds(notificationId)
}

const removeIdFromNotificationIds = (notificationId : number)=> {
	const notificationIdsString = localStorage.getItem('notificationIds');
	const notificationIds = notificationIdsString ? JSON.parse(notificationIdsString) as Array<number> : []
	const newNotificationIds = notificationIds.filter(id => id !== notificationId)
	localStorage.setItem('notificationIds', JSON.stringify(newNotificationIds))
}