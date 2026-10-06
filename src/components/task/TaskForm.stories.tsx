import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { Task } from '../../global/types';
import { TaskForm } from './TaskForm';
import { emptyTask, sampleTask } from './task.fixtures';

function StatefulTaskForm({
  task: initialTask,
  onChange,
}: {
  task: Task;
  onChange: (task: Task) => void;
}) {
  const [task, setTask] = useState(initialTask);

  return (
    <TaskForm
      task={task}
      onChange={(next) => {
        setTask(next);
        onChange(next);
      }}
    />
  );
}

const meta = {
  title: 'Task/TaskForm',
  component: TaskForm,
  args: {
    onChange: fn(),
  },
  render: (args) => <StatefulTaskForm {...args} />,
} satisfies Meta<typeof TaskForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    task: emptyTask,
  },
};

export const Filled: Story = {
  args: {
    task: sampleTask,
  },
};
