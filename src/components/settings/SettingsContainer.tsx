import { IonCard, IonInput, IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as settingsServices from "../../services/settings.services";

const SettingsContainer: React.FC = () => {
	const { t } = useTranslation("global");
	const [settingsForm, setSettingsForm] = useState<Settings>({ notificationTime: "" })


	function saveSettings(settings: Settings) {
		settingsServices.saveSettings(settings)
		setSettingsForm(settings)
	}

	// EFFECTS
	useEffect(() => {
		const settings: Settings | null = settingsServices.getSettings();
		if (settings) {
			setSettingsForm(settings);
		}

	}, []);


	return (
		<>
			<IonCard>
				<IonList inset={true}>
					<IonListHeader color="danger">
						<IonLabel>{t('Settings.notifications')}</IonLabel>
					</IonListHeader>
					<IonItem>
						<IonInput label={t('Settings.time_notifications_label')} labelPlacement="floating" onIonChange={ev => saveSettings({ ...settingsForm, notificationTime: ev.target.value as string })} type='time' value={settingsForm.notificationTime}></IonInput>
					</IonItem>

				</IonList>
			</IonCard>
		</>
	);
};

export default SettingsContainer;