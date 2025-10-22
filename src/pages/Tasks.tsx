import { NavLink, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
// Redux
import { useGetProjectByIdQuery } from "../store/api/projectsApi";
import { useGetTasksQuery, useUpdateTaskMutation } from "../store/api/tasksApi";
// MUI
import { IconButton, CircularProgress } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
// Interfaces
import type { TaskListItem } from "../interfaces/task.interface";
// Helpers
import { getTasksBySections, moveTaskBetweenSections, moveTaskToPosition } from "../helpers/taskHelper";
// Components
import TaskDialog from "../components/task/TaskDialog";
import SortableTaskList from "../components/task/SortableTaskList";

const Tasks = () => {
	const navigate = useNavigate();
	const { projectId } = useParams();
	const { data: project, isLoading, error } = useGetProjectByIdQuery(projectId as string, { skip: !projectId });
	const { data: tasks, isLoading: tasksLoading } = useGetTasksQuery(projectId as string);
	const [updateTask] = useUpdateTaskMutation();
	const [tasksBySections, setTasksBySections] = useState<Record<string, Array<TaskListItem>>>({});
	const [sectionId, setSectionId] = useState<string | null>(null);
	const [task, setTask] = useState<TaskListItem | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!projectId || (!isLoading && error)) navigate('/projects');
	}, [navigate, projectId, isLoading, error]);

	useEffect(() => {
		if (tasks) setTasksBySections(getTasksBySections(tasks));
	}, [tasks]);

	if (!projectId || isLoading || !project) return null;

	const handleOpenTaskDialog = (state: boolean, sectionId: string | null, taskData?: TaskListItem | null) => {
		setIsOpen(state);
		setSectionId(sectionId);
		setTask(taskData || null);
	}

	const handleTaskMove = async (taskId: string, fromSectionId: string, toSectionId: string) => {
		setTasksBySections(prev => moveTaskBetweenSections(prev, taskId, fromSectionId, toSectionId));

		const taskToUpdate = tasks?.find(task => task.id === taskId);
		if (taskToUpdate) {
			try {
				const destinationSection = tasksBySections[toSectionId] || [];
				const newOrder = destinationSection.length;
				
				await updateTask({
					...taskToUpdate,
					projectSectionId: toSectionId,
					order: newOrder
				}).unwrap();
			} catch (error) {
				setTasksBySections(prev => moveTaskBetweenSections(prev, taskId, toSectionId, fromSectionId));
				toast.error('Failed to move task. Please try again.');
			}
		}
	}

	const handleTaskMoveToPosition = async (taskId: string, fromSectionId: string, toSectionId: string, targetIndex: number) => {
		setTasksBySections(prev => moveTaskToPosition(prev, taskId, fromSectionId, toSectionId, targetIndex));
		
		const taskToUpdate = tasks?.find(task => task.id === taskId);
		if (taskToUpdate) {
			try {
				await updateTask({
					...taskToUpdate,
					projectSectionId: toSectionId,
					order: targetIndex
				}).unwrap();
				
				const destinationTasks = tasksBySections[toSectionId] || [];
				const updatePromises = destinationTasks.map((task, index) => {
					if (task.id === taskId) {
						return updateTask({ ...task, order: targetIndex }).unwrap();
					} else if (index >= targetIndex) {
						return updateTask({ ...task, order: index + 1 }).unwrap();
					}
					return Promise.resolve();
				});
				
				await Promise.all(updatePromises.filter(p => p !== Promise.resolve()));
			} catch (error) {
				setTasksBySections(prev => moveTaskBetweenSections(prev, taskId, toSectionId, fromSectionId));
				toast.error('Failed to move task. Please try again.');
			}
		}
	}

	const handleTaskReorder = async (sectionId: string, reorderedTasks: TaskListItem[]) => {
		setTasksBySections(prev => ({
			...prev,
			[sectionId]: reorderedTasks
		}));

		const updatePromises = reorderedTasks.map((task, index) => {
			const updatedTask = { ...task, order: index };
			return updateTask(updatedTask).unwrap();
		});

		try {
			await Promise.all(updatePromises);
		} catch (error) {
			toast.error('Failed to update task order. Please try again.');
			setTasksBySections(prev => ({
				...prev,
				[sectionId]: tasksBySections[sectionId]
			}));
		}
	}

	return (
		<>
			<div className="p-3 pb-0">
				<div className="flex items-center mb-4">
					<IconButton 
						color="primary"
						component={NavLink}
						to="/projects"
					><ArrowBack /></IconButton>
					<h1 className="text-2xl font-bold ml-2 truncate" title={project && project.name}>{project && project.name}</h1>
				</div>
				{tasksLoading ? 
					<div className="flex justify-center mt-10"><CircularProgress size={24} /></div> : 
					<SortableTaskList
						sections={project.projectSections}
						tasksBySections={tasksBySections}
						onTaskMove={handleTaskMove}
						onTaskMoveToPosition={handleTaskMoveToPosition}
						onTaskReorder={handleTaskReorder}
						onAddTask={(sectionId) => handleOpenTaskDialog(true, sectionId, null)}
						onTaskEdit={(task) => handleOpenTaskDialog(true, task.projectSectionId, task)}
					/>
				}
			</div>
			<TaskDialog 
				isOpen={isOpen} 
				projectId={projectId}
				sectionId={sectionId}
				task={task}
				onClose={(task: TaskListItem | null) => handleOpenTaskDialog(false, null, task)} 
			/>
		</>
	)
}

export default Tasks;