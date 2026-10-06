import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, mocked } from 'storybook/test';
import { removeTask, saveNewTask, updateTask } from '../../services/task.services';
import { TaskModal } from './TaskModal';
import { emptyTask, sampleTask } from './task.fixtures';

const meta = {
  title: 'Task/TaskModal',
  component: TaskModal,
  args: {
    onClose: fn(),
  },
  beforeEach: async () => {
    mocked(saveNewTask).mockResolvedValue(undefined);
    mocked(updateTask).mockResolvedValue(undefined);
    mocked(removeTask).mockReturnValue(undefined);
  },
} satisfies Meta<typeof TaskModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NewTask: Story = {
  args: {
    task: emptyTask,
  },
};

export const EditTask: Story = {
  args: {
    task: sampleTask,
  },
};
