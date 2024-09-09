import { CancelOptions, LocalNotifications } from "@capacitor/local-notifications";
import { t } from "i18next";
import { notifications } from "ionicons/icons";

// ( doc : https://ionicframework.com/docs/native/local-notifications )
export async function createNotification(body: string, dueTime: string | null, existingId?: number): Promise<number> {
	let notificationId = -1;
	if ((await LocalNotifications.requestPermissions()).display === 'granted') {
		notificationId = existingId || Math.floor(Math.random() * 600000000);
		await LocalNotifications.schedule({
			notifications: [
				{
					title: "Aujourd'hui",
					body,
					largeIcon: "ic_launcher",
					smallIcon: "ic_launcher",
					id: notificationId,
					schedule: {
						allowWhileIdle: true,
						on: {
							hour: dueTime? parseInt(dueTime.split(":")[0]) : 8,
							minute: dueTime? parseInt(dueTime.split(":")[1]) : 30,
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