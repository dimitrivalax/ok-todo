import { IonAlert, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import TaskForm from './TaskForm';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { removeTask, saveNewTask, updateTask } from '../../services/task.services';
import { trashOutline } from 'ionicons/icons';
import type { Task } from '../../global/types';

interface Props {
  task: Task;
  onClose: () => void;
}

const TaskModal: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const [task, setTask] = useState<Task>(props.task)
  const [saveDisabled, setSaveDisabled] = useState(true)
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)

  function onWillDismiss() {
    props.onClose()
  }

  function onFormChange(task: Task) {
    setTask(task)
    setSaveDisabled(false)
  }

  async function save() {
    if (task.id) {
      await updateTask(task)
    } else {
      await saveNewTask(task)
    }

    props.onClose()
  }
  function remove() {
    removeTask(props.task)
    props.onClose()
  }

  return (
    <IonModal isOpen={true} onWillDismiss={() => onWillDismiss()}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onWillDismiss()}>{t('Home.cancel')}</IonButton>
          </IonButtons>
          <IonTitle>{props.task.id ? t('Home.update_task') : t('Home.new_task')}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => save()} disabled={!task.label || saveDisabled}>{t('Home.save')}</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TaskForm onChange={(task: Task) => onFormChange(task)} task={props.task}></TaskForm>
        {props.task.id &&
          <>
            <IonRow class="ion-justify-content-center ion-margin-top">
              <IonButton shape="round" color="danger" onClick={() => setIsDeleteAlertOpen(true)}>
                <IonIcon slot="start" icon={trashOutline}></IonIcon>
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
                  handler: () => {
                    remove();
                  },
                },
              ]}
              onDidDismiss={() => setIsDeleteAlertOpen(false)}
            ></IonAlert>
          </>
        }
      </IonContent>
    </IonModal>
  );
};

export default TaskModal;
