import { describe, expect, it } from 'vitest';
import type { Task } from '../../global/types';
import { filterTasksByBucket } from './taskFilters';

const tasks: Task[] = [
  { id: '1', label: 'matin', dueTime: '08:00', complete: false },
  { id: '2', label: 'apres-midi', dueTime: '15:00', complete: false },
  { id: '3', label: 'soir', dueTime: '20:00', complete: false },
  { id: '4', label: 'un jour', dueTime: null, complete: false },
];

describe('filterTasksByBucket', () => {
  it('puts remaining due times of the day in today', () => {
    expect(filterTasksByBucket(tasks, 'today', '12:00').map((t) => t.id)).toEqual(['2', '3']);
  });

  it('puts past due times in tomorrow', () => {
    expect(filterTasksByBucket(tasks, 'tomorrow', '12:00').map((t) => t.id)).toEqual(['1']);
  });

  it('puts tasks without due time in one_day', () => {
    expect(filterTasksByBucket(tasks, 'one_day', '12:00').map((t) => t.id)).toEqual(['4']);
  });

  it('treats equal nowTime as tomorrow', () => {
    expect(filterTasksByBucket(tasks, 'tomorrow', '15:00').map((t) => t.id)).toEqual(['1', '2']);
    expect(filterTasksByBucket(tasks, 'today', '15:00').map((t) => t.id)).toEqual(['3']);
  });
});
