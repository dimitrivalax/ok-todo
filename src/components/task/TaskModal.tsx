import { useState } from 'react';
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
import { removeTask, saveNewTask, updateTask } from '../../services/task.services';
import type { Task } from '../../global/types';

type Props = {
  task: Task;
  onClose: () => void;
};

export function TaskModal({ task: initialTask, onClose }: Props) {
  const { t } = useTranslation();
  const [task, setTask] = useState<Task>(initialTask);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const isEditing = Boolean(initialTask.id);

  function handleWillDismiss() {
    onClose();
  }

  function handleFormChange(next: Task) {
    setTask(next);
    setIsSaveDisabled(false);
  }

  async function handleSave() {
    if (task.id) {
      await updateTask(task);
    } else {
      await saveNewTask(task);
    }
    onClose();
  }

  function handleRemove() {
    removeTask(task);
    onClose();
  }

  return (
    <IonModal isOpen={true} onWillDismiss={handleWillDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleWillDismiss}>{t('Home.cancel')}</IonButton>
          </IonButtons>
          <IonTitle>{isEditing ? t('Home.update_task') : t('Home.new_task')}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave} disabled={!task.label || isSaveDisabled}>
              {t('Home.save')}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TaskForm task={task} onChange={handleFormChange} />
        {isEditing && (
          <>
            <IonRow className="ion-justify-content-center ion-margin-top">
              <IonButton shape="round" color="danger" onClick={() => setIsDeleteAlertOpen(true)}>
                <IonIcon slot="start" icon={trashOutline} />
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
              onDidDismiss={() => setIsDeleteAlertOpen(false)}
            />
          </>
        )}
      </IonContent>
    </IonModal>
  );
}

export default TaskModal;
