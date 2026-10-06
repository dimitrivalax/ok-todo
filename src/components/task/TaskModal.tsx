import { useTranslation } from 'react-i18next';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { TaskForm } from './TaskForm';
import { useTaskModal } from './useTaskModal';
import type { Task } from '../../global/types';

type Props = {
  task: Task;
  onClose: () => void;
  onSave: (task: Task) => void | Promise<void>;
  onDelete?: (task: Task) => void;
};

export function TaskModal({ task: initialTask, onClose, onSave, onDelete }: Props) {
  const { t } = useTranslation();
  const {
    task,
    isEditing,
    canSave,
    isDeleteAlertOpen,
    handleFormChange,
    handleSave,
    handleRemove,
    openDeleteAlert,
    closeDeleteAlert,
  } = useTaskModal(initialTask, { onSave, onDelete });

  return (
    <IonModal isOpen={true} onWillDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>{t('Home.cancel')}</IonButton>
          </IonButtons>
          <IonTitle>{isEditing ? t('Home.update_task') : t('Home.new_task')}</IonTitle>
          <IonButtons slot="end">
            <IonButton strong onClick={handleSave} disabled={!canSave}>
              {t('Home.save')}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TaskForm task={task} onChange={handleFormChange} />
        {isEditing && onDelete && (
          <>
            <IonRow className="ion-justify-content-center ion-margin-top">
              <IonButton shape="round" color="danger" onClick={openDeleteAlert}>
                <IonIcon slot="start" icon={trashOutline} aria-hidden="true" />
                {t('Home.delete')}
              </IonButton>
            </IonRow>
            <IonAlert
              isOpen={isDeleteAlertOpen}
              header={t('Home.confirm_delete_title')}
              buttons={[
                {
                  text: t('Home.no'),
                  role: 'cancel',
                },
                {
                  text: t('Home.yes'),
                  role: 'confirm',
                  handler: handleRemove,
                },
              ]}
              onDidDismiss={closeDeleteAlert}
            />
          </>
        )}
      </IonContent>
    </IonModal>
  );
}

export default TaskModal;
