import { IonCard, IonFab, IonFabButton, IonIcon, IonLabel, IonList, IonListHeader } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import TaskModal from '../task/TaskModal';
import TaskItem from '../task/TaskItem';
import { createEmptyTask } from '../task/task.defaults';
import { filterTasksByBucket, type TaskBucket } from '../task/taskFilters';
import { getTasks, removeTask, saveNewTask, sortTaskByDueTime, updateTask } from '../../services/task.services';
import type { Task } from '../../global/types';

type TaskSectionProps = {
  color: 'success' | 'warning' | 'danger';
  title: string;
  tasks: Task[];
  onSelect: (task: Task) => void;
  onDone: (task: Task) => void;
  onUndone: (task: Task) => void;
};

function TaskSection({ color, title, tasks, onSelect, onDone, onUndone }: TaskSectionProps) {
  return (
    <IonCard mode="ios">
      <IonList inset={true} lines="inset">
        <IonListHeader color={color}>
          <IonLabel>{title}</IonLabel>
        </IonListHeader>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onSelect={onSelect}
            onSwipeRight={onDone}
            onSwipeLeft={onUndone}
          />
        ))}
      </IonList>
    </IonCard>
  );
}

function useTasksByBucket(tasks: Task[], bucket: TaskBucket): Task[] {
  return useMemo(() => {
    const nowTime = format(new Date(), 'HH:mm');
    return sortTaskByDueTime(filterTasksByBucket(tasks, bucket, nowTime));
  }, [tasks, bucket]);
}

export function HomeContainer() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalTask, setModalTask] = useState<Task | null>(null);

  const todayTasks = useTasksByBucket(tasks, 'today');
  const tomorrowTasks = useTasksByBucket(tasks, 'tomorrow');
  const oneDayTasks = useTasksByBucket(tasks, 'one_day');

  function refreshTasks() {
    setTasks(getTasks());
  }

  function closeTaskModal() {
    setModalTask(null);
    refreshTasks();
  }

  async function handleSaveTask(task: Task) {
    if (task.id) {
      await updateTask(task);
    } else {
      await saveNewTask(task);
    }
    closeTaskModal();
  }

  function handleDeleteTask(task: Task) {
    removeTask(task);
    closeTaskModal();
  }

  async function handleSetComplete(task: Task, complete: boolean) {
    await updateTask({ ...task, complete });
    refreshTasks();
  }

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <>
      <TaskSection
        color="success"
        title={t('Home.today')}
        tasks={todayTasks}
        onSelect={setModalTask}
        onDone={(task) => handleSetComplete(task, true)}
        onUndone={(task) => handleSetComplete(task, false)}
      />
      <TaskSection
        color="warning"
        title={t('Home.tomorrow')}
        tasks={tomorrowTasks}
        onSelect={setModalTask}
        onDone={(task) => handleSetComplete(task, true)}
        onUndone={(task) => handleSetComplete(task, false)}
      />
      <TaskSection
        color="danger"
        title={t('Home.one_day')}
        tasks={oneDayTasks}
        onSelect={setModalTask}
        onDone={(task) => handleSetComplete(task, true)}
        onUndone={(task) => handleSetComplete(task, false)}
      />
      <IonFab horizontal="end" vertical="bottom" slot="fixed">
        <IonFabButton onClick={() => setModalTask(createEmptyTask())}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
      {modalTask && (
        <TaskModal
          key={modalTask.id || 'new'}
          task={modalTask}
          onClose={closeTaskModal}
          onSave={handleSaveTask}
          onDelete={modalTask.id ? handleDeleteTask : undefined}
        />
      )}
    </>
  );
}

export default HomeContainer;
