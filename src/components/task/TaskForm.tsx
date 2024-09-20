import { IonDatetime, IonInput, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  task: Task
  onChange: (task: Task) => void;
}

const TaskForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const [taskForm, setTaskForm] = useState(props.task)

  	// EFFECTS
	useEffect(() => {
		setTaskForm(props.task)
	}, [props.task]);

  return (
    <>
      <IonList>
        <IonItem>
          <IonInput className='ion-text-capitalize' label={t('Home.what')} labelPlacement="floating" onIonChange={ev => props.onChange({...props.task, label: ev.target.value as string})} type='text' value={taskForm.label}></IonInput>
        </IonItem>
        <IonItem>
          <IonInput label={t('Home.when_hour')} labelPlacement="floating" onIonChange={ev => props.onChange({...props.task, dueTime: ev.target.value as string})} type='time' value={taskForm.dueTime}></IonInput>
        </IonItem>
      </IonList>
    </>
  );
};

export default TaskForm;
