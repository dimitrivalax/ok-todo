import type { Meta, StoryObj } from '@storybook/react-vite';
import { IonList } from '@ionic/react';
import { fn } from 'storybook/test';
import TaskItem from './TaskItem';
import { completedTask, sampleTask } from './task.fixtures';

const meta = {
  title: 'Task/TaskItem',
  component: TaskItem,
  args: {
    onSelect: fn(),
    onSwipeRight: fn(),
    onSwipeLeft: fn(),
  },
  decorators: [
    (Story) => (
      <IonList>
        <Story />
      </IonList>
    ),
  ],
} satisfies Meta<typeof TaskItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: { ...sampleTask, dueTime: null },
  },
};

export const WithDueTime: Story = {
  args: {
    task: sampleTask,
  },
};

export const Complete: Story = {
  args: {
    task: completedTask,
  },
};
