import type { Task } from '../../global/types';

export type TaskBucket = 'today' | 'tomorrow' | 'one_day';

export function filterTasksByBucket(tasks: Task[], bucket: TaskBucket, nowTime: string): Task[] {
  switch (bucket) {
    case 'today':
      return tasks.filter((task) => Boolean(task.dueTime && task.dueTime > nowTime));
    case 'tomorrow':
      return tasks.filter((task) => Boolean(task.dueTime && task.dueTime <= nowTime));
    case 'one_day':
      return tasks.filter((task) => !task.dueTime);
  }
}
