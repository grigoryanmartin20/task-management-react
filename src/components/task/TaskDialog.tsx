import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// Plugins
import { v4 as uuidv4 } from 'uuid';
// MUI
import { Dialog, DialogTitle, DialogContent, TextField, RadioGroup, Radio, FormControlLabel, Button, DialogActions } from '@mui/material';
// Redux
import { useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from "../../store/api/tasksApi";
// Interfaces
import type { TaskDialogProps, TaskListItem } from '../../interfaces/task.interface';
// Types
import type { TaskPriority } from '../../types/task.type';
// Components
import ConfirmDialog from '../dialog/ConfirmDialog';

const TaskDialog = ({ isOpen, projectId, sectionId, task, newOrder = 0, onClose, onTaskDelete }: TaskDialogProps) => {
	const [taskName, setTaskName] = useState(task?.name || '');
	const [taskNameTouched, setTaskNameTouched] = useState(false);
	const [taskDescription, setTaskDescription] = useState(task?.description || '');
	const [taskPriority, setTaskPriority] = useState<TaskPriority>(task?.priority || 'low');
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
	const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
	const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

	useEffect(() => {
		if (task) {
			setTaskName(task.name || '');
			setTaskDescription(task.description || '');
			setTaskPriority(task.priority || 'low');
		} else {
			reset();
		}
	}, [task]);

	const handleSave = async () => {
		if (!taskName?.trim()?.length) return;

		let taskData: TaskListItem = {
			id: task?.id || uuidv4(),
			projectId: projectId as string,
			projectSectionId: sectionId as string,
			name: taskName.trim(),
			description: taskDescription.trim(),
			priority: taskPriority,
			createdAt: task?.createdAt || new Date(),
			order: task?.id ? task.order : newOrder
		};

		try {
			if (task?.id) {
				await updateTask(taskData);
				toast.success('Task updated successfully.');
			} else {
				await createTask(taskData);
				toast.success('Task created successfully.');
			}

			onClose(taskData);
			reset();
		} catch (error) {
			toast.error(`Error ${task?.id ? 'updating' : 'creating'} task. Please try again.`);
		}
	}

	const handleDelete = () => {
		if (!task?.id) return;
		
		setShowConfirmDialog(true);
	};

	const handleConfirmDelete = async () => {
		if (!task?.id) return;

		try {
			await deleteTask(task.id);
			toast.success('Task deleted successfully.');
			onTaskDelete?.(task.id);
			setShowConfirmDialog(false);
			onClose(null);
			reset();
		} catch (error) {
			toast.error('Error deleting task. Please try again.');
		}
	};

	const handleCancelDelete = () => {
		setShowConfirmDialog(false);
	};

	const reset = () => {
		setTaskName('');
		setTaskNameTouched(false);
		setTaskDescription('');
		setTaskPriority('low');
	}

	return (
		<>
		<Dialog open={isOpen} onClose={() => onClose(null)} maxWidth="sm" fullWidth>
			<DialogTitle>{task?.id ? 'Edit Task' : 'Add Task'}</DialogTitle>

			<DialogContent>
					<div className="mb-4">
						<label className="block mb-2 text-sm">Name <span className="text-red-500">*</span></label>
						<div>
							<TextField 
								size="small"
								fullWidth
								required
								value={taskName}
								onChange={(e) => setTaskName(e.target.value)}
								onBlur={() => setTaskNameTouched(true)}
								error={taskNameTouched && !taskName?.trim()?.length}
								helperText={taskNameTouched && !taskName?.trim()?.length ? "Name is required" : ""}
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="block text-sm mb-2">
							Description
						</label>
						<div>
							<TextField 
								size="small"
								fullWidth
								multiline
								minRows={3}
								maxRows={6}
								value={taskDescription}
								onChange={(e) => setTaskDescription(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm">Priority</label>
						<div>
							<RadioGroup
								row
								value={taskPriority}
								onChange={(e) => setTaskPriority(e.target.value as TaskPriority)}
							>
								<FormControlLabel value="low" control={<Radio />} label="Low" className="text-green-400" />
								<FormControlLabel value="medium" control={<Radio />} label="Medium" className="text-yellow-400" />
								<FormControlLabel value="high" control={<Radio />} label="High" className="text-red-400" />
							</RadioGroup>
						</div>
					</div>
				</DialogContent>

				<DialogActions sx={{ p: 3, pt: 0, gap: 1 }}>
					{task?.id && (
						<Button 
							color="error" 
							disabled={isCreating || isUpdating || isDeleting}
							sx={{ mr: 'auto' }}
							onClick={handleDelete} 
						>{isDeleting ? 'Deleting...' : 'Delete'}</Button>
					)}
					<Button 
						color="inherit" 
						disabled={isCreating || isUpdating || isDeleting}
						onClick={() => onClose(null)}
					>Cancel</Button>
					<Button 
						variant="contained" 
						color="primary" 
						disabled={!taskName?.trim()?.length}
						loading={isCreating || isUpdating}
						onClick={handleSave}
					>{task?.id ? 'Update' : 'Create'}</Button>
				</DialogActions>
			</Dialog>
			
			<ConfirmDialog
				isOpen={showConfirmDialog}
				title="Delete Task"
				message="Are you sure you want to delete this task? This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
				variant="danger"
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
			/>
		</>
	)
}

export default TaskDialog;