import { IonAvatar, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonImg, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import TaskForm from './TaskForm';
import { useTranslation } from 'react-i18next';

interface Props {
	onClose: () => void;
}

const TaskModal: React.FC<Props> = (props) => {
  const { t } = useTranslation("global");

	function onWillDismiss() {
		props.onClose()
	}

  return (
    <IonModal isOpen={true}  onWillDismiss={() => onWillDismiss()}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{t('Home.new_task')}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => onWillDismiss()}>{t('Home.close')}</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <TaskForm></TaskForm>
          </IonContent>
        </IonModal>
  );
};

export default TaskModal;
