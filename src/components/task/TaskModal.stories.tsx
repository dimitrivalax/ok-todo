import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TaskModal } from './TaskModal';
import { emptyTask, sampleTask } from './task.fixtures';

const meta = {
  title: 'Task/TaskModal',
  component: TaskModal,
  args: {
    onClose: fn(),
    onSave: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof TaskModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NewTask: Story = {
  args: {
    task: emptyTask,
    onDelete: undefined,
  },
};

export const EditTask: Story = {
  args: {
    task: sampleTask,
  },
};
