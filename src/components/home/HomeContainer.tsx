import { IonButton, IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { add } from 'ionicons/icons';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TaskModal from "../task/TaskModal";

const HomeContainer: React.FC = () => {
	const { t } = useTranslation("global");
	const [openNewTaskModal, setOpenNewTaskModal] = useState(false)
	return (
		<>
			<IonList inset={true}>
				<IonListHeader>
					<IonLabel>{t('Home.today')}</IonLabel>
					<IonButton>{t('Home.delete_all')}</IonButton>
				</IonListHeader>
				<IonItem>
					<IonLabel>Faire des courses</IonLabel>
				</IonItem>
				<IonItem>
					<IonLabel>Tailler la haie</IonLabel>
				</IonItem>
			</IonList>
			<IonList inset={true}>
				<IonListHeader>
					<IonLabel>{t('Home.tomorrow')}</IonLabel>
					<IonButton>{t('Home.delete_all')}</IonButton>
				</IonListHeader>
				<IonItem>
					<IonLabel>Faire des courses</IonLabel>
				</IonItem>
				<IonItem>
					<IonLabel>Tailler la haie</IonLabel>
				</IonItem>
			</IonList>
			<IonList inset={true}>
				<IonListHeader>
					<IonLabel>{t('Home.one_day')}</IonLabel>
					<IonButton>{t('Home.delete_all')}</IonButton>
				</IonListHeader>
				<IonItem>
					<IonLabel>Faire des courses</IonLabel>
				</IonItem>
				<IonItem>
					<IonLabel>Tailler la haie</IonLabel>
				</IonItem>
			</IonList>
			<IonFab horizontal="end" vertical="bottom" slot="fixed">
				<IonFabButton onClick={()=> setOpenNewTaskModal(true)}>
					<IonIcon icon={add}></IonIcon>
				</IonFabButton>
			</IonFab>
			{openNewTaskModal && <TaskModal onClose={() => setOpenNewTaskModal(false) } ></TaskModal>}
		</>
	);
};

export default HomeContainer;