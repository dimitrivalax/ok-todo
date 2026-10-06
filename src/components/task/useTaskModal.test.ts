import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { createEmptyTask } from './task.defaults';
import { useTaskModal } from './useTaskModal';
import { sampleTask } from './task.fixtures';

describe('useTaskModal', () => {
  it('starts clean and disables save until the draft changes with a label', () => {
    const onSave = vi.fn();
    const { result } = renderHook(() => useTaskModal(createEmptyTask(), { onSave }));

    expect(result.current.isEditing).toBe(false);
    expect(result.current.canSave).toBe(false);

    act(() => {
      result.current.handleFormChange({ ...createEmptyTask(), label: '  ' });
    });
    expect(result.current.canSave).toBe(false);

    act(() => {
      result.current.handleFormChange({ ...createEmptyTask(), label: 'Acheter du lait' });
    });
    expect(result.current.canSave).toBe(true);
  });

  it('marks editing mode from initial task id', () => {
    const { result } = renderHook(() =>
      useTaskModal(sampleTask, { onSave: vi.fn(), onDelete: vi.fn() }),
    );

    expect(result.current.isEditing).toBe(true);
    expect(result.current.task).toEqual(sampleTask);
  });

  it('calls onSave with the current draft', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useTaskModal(sampleTask, { onSave }));

    act(() => {
      result.current.handleFormChange({ ...sampleTask, label: 'Mis à jour' });
    });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(onSave).toHaveBeenCalledWith({ ...sampleTask, label: 'Mis à jour' });
  });

  it('calls onDelete with the current draft when confirming remove', () => {
    const onDelete = vi.fn();
    const { result } = renderHook(() =>
      useTaskModal(sampleTask, { onSave: vi.fn(), onDelete }),
    );

    act(() => {
      result.current.openDeleteAlert();
    });
    expect(result.current.isDeleteAlertOpen).toBe(true);

    act(() => {
      result.current.handleRemove();
      result.current.closeDeleteAlert();
    });

    expect(onDelete).toHaveBeenCalledWith(sampleTask);
    expect(result.current.isDeleteAlertOpen).toBe(false);
  });
});
