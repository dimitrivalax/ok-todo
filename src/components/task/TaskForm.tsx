import { IonInput, IonItem, IonList } from '@ionic/react';
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

  function update(changes: Partial<Task>) {
    const next = { ...taskForm, ...changes }
    setTaskForm(next)
    props.onChange(next)
  }

  return (
    <>
      <IonList>
        <IonItem>
          <IonInput className='ion-text-capitalize' label={t('Home.what')} labelPlacement="floating" onIonInput={ev => update({ label: ev.target.value as string })} type='text' value={taskForm.label}></IonInput>
        </IonItem>
        <IonItem>
          <IonInput label={t('Home.when_hour')} labelPlacement="floating" onIonChange={ev => update({ dueTime: ev.target.value as string })} type='time' value={taskForm.dueTime}></IonInput>
        </IonItem>
      </IonList>
    </>
  );
};

export default TaskForm;
