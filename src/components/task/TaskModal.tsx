import { IonAvatar, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import TaskForm from './TaskForm';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { removeTask, saveNewtTask, updateTask } from '../../services/task.services';
import { trashOutline } from 'ionicons/icons';

interface Props {
  task: Task;
  onClose: () => void;
}

const TaskModal: React.FC<Props> = (props) => {
  const { t } = useTranslation("global");
  const [task, setTask] = useState<Task>(props.task)
  const [saveDisabled, setSaveDisabled] = useState(true)

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
      await saveNewtTask(task)
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
        <TaskForm onChange={(task: Task) => onFormChange(task)} task={task}></TaskForm>
        {props.task.id &&
          <IonRow class="ion-justify-content-center ion-margin-top">
            <IonButton shape="round" color="danger" onClick={() => remove()}>
              <IonIcon slot="start" icon={trashOutline}></IonIcon>
              {t('delete')}
            </IonButton>
          </IonRow>
        }
      </IonContent>
    </IonModal>
  );
};

export default TaskModal;
