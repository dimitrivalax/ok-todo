import type { Task } from '../../global/types';

export const emptyTask: Task = {
  id: '',
  label: '',
  dueTime: null,
  complete: false,
};

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
