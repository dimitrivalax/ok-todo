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
import type { Task } from '../../global/types';

type Props = {
  task: Task;
  onClose: () => void;
  onSave: (task: Task) => void | Promise<void>;
  onDelete?: (task: Task) => void;
};

export function TaskModal({ task: initialTask, onClose, onSave, onDelete }: Props) {
  const { t } = useTranslation();
  const [task, setTask] = useState<Task>(initialTask);
  const [isDirty, setIsDirty] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const isEditing = Boolean(initialTask.id);
  const canSave = isDirty && Boolean(task.label.trim());

  function handleFormChange(next: Task) {
    setTask(next);
    setIsDirty(true);
  }

  async function handleSave() {
    await onSave(task);
  }

  function handleRemove() {
    onDelete?.(task);
  }

  return (
    <IonModal isOpen={true} onWillDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>{t('Home.cancel')}</IonButton>
          </IonButtons>
          <IonTitle>{isEditing ? t('Home.update_task') : t('Home.new_task')}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave} disabled={!canSave}>
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
