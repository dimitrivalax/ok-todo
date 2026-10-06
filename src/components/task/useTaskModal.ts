import { useState } from 'react';
import type { Task } from '../../global/types';

type Options = {
  onSave: (task: Task) => void | Promise<void>;
  onDelete?: (task: Task) => void;
};

export function useTaskModal(initialTask: Task, { onSave, onDelete }: Options) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isDirty, setIsDirty] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const isEditing = Boolean(initialTask.id);
  const canSave = isDirty && Boolean(task.label.trim());

  function handleFormChange(next: Task) {
    setTask(next);
    setIsDirty(true);
  }

  async function handleSave() {
    await onSave(task);
  }

  function handleRemove() {
    onDelete?.(task);
  }

  function openDeleteAlert() {
    setIsDeleteAlertOpen(true);
  }

  function closeDeleteAlert() {
    setIsDeleteAlertOpen(false);
  }

  return {
    task,
    isEditing,
    canSave,
    isDeleteAlertOpen,
    handleFormChange,
    handleSave,
    handleRemove,
    openDeleteAlert,
    closeDeleteAlert,
  };
}
