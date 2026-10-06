import type { Task } from '../../global/types';

export function createEmptyTask(): Task {
  return {
    id: '',
    label: '',
    dueTime: null,
    complete: false,
  };
}
