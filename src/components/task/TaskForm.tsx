import { useTranslation } from 'react-i18next';
import type { Task } from '../../global/types';
import { IonInput, IonItem, IonList } from '@ionic/react';

type Props = {
  task: Task;
  onChange: (task: Task) => void;
};

export function TaskForm({ task, onChange }: Props) {
  const { t } = useTranslation();

  function update(changes: Partial<Task>) {
    onChange({ ...task, ...changes });
  }

  return (
    <IonList>
      <IonItem>
        <IonInput
          className="ion-text-capitalize"
          label={t('Home.what')}
          labelPlacement="floating"
          onIonInput={(ev) => update({ label: ev.target.value as string })}
          type="text"
          value={task.label}
        />
      </IonItem>
      <IonItem>
        <IonInput
          label={t('Home.when_hour')}
          labelPlacement="floating"
          onIonChange={(ev) => update({ dueTime: ev.target.value as string })}
          type="time"
          value={task.dueTime}
        />
      </IonItem>
    </IonList>
  );
}

export default TaskForm;
