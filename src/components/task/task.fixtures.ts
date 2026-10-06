import type { Task } from '../../global/types';
import { createEmptyTask } from './task.defaults';

export const emptyTask: Task = createEmptyTask();

export const sampleTask: Task = {
  id: '1',
  label: 'Acheter du lait',
  dueTime: '09:30',
  complete: false,
};

export const completedTask: Task = {
  ...sampleTask,
  complete: true,
  dueTime: null,
};
