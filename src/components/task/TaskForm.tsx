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
          <IonInput label={t('Home.what')} labelPlacement="floating" onIonChange={ev => props.onChange({...props.task, label: ev.target.value as string})} type='text' value={taskForm.label}></IonInput>
        </IonItem>
        <IonItem>
          <IonSelect label={t('Home.when')} labelPlacement="floating" interface="popover" value={taskForm.dueDate} onIonChange={ev => props.onChange({...props.task, dueDate: ev.target.value as string})}>
            <IonSelectOption value="today">{t('Home.today')}</IonSelectOption>
            <IonSelectOption value="one_day">{t('Home.one_day')}</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonInput label={t('Home.when_hour')} labelPlacement="floating" onIonChange={ev => props.onChange({...props.task, dueTime: ev.target.value as string})} type='time' value={taskForm.dueTime}></IonInput>
        </IonItem>
      </IonList>
    </>
  );
};

export default TaskForm;
