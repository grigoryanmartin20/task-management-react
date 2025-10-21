// Interfaces
import type { TaskListItem } from "../interfaces/task.interface";

export const getTasksBySections = (tasks: Array<TaskListItem>): Record<string, Array<TaskListItem>> => {
	const tasksBySections: Record<string, Array<TaskListItem>> = {};

	tasks.forEach((task) => {
		if (!tasksBySections[task.projectSectionId]) tasksBySections[task.projectSectionId] = [];
		
		tasksBySections[task.projectSectionId].push(task);
	});

	Object.keys(tasksBySections).forEach(sectionId => {
		tasksBySections[sectionId].sort((a, b) => a.order - b.order);
	});

	return tasksBySections;
}

export const setTaskBySection = (
	tasksBySections: Record<string, Array<TaskListItem>>,
	sectionId: string,
	taskData: TaskListItem,
): Record<string, Array<TaskListItem>> => {
	const newTasksBySections = { ...tasksBySections };

	if (!newTasksBySections[sectionId]) newTasksBySections[sectionId] = [];

	newTasksBySections[sectionId].push(taskData);

	return newTasksBySections;
}

export const moveTaskBetweenSections = (
	tasksBySections: Record<string, Array<TaskListItem>>,
	taskId: string,
	fromSectionId: string,
	toSectionId: string,
): Record<string, Array<TaskListItem>> => {
	const newTasksBySections = { ...tasksBySections };
	const sourceSection = newTasksBySections[fromSectionId] || [];
	const taskIndex = sourceSection.findIndex(task => task.id === taskId);
	
	if (taskIndex !== -1) {
		const [movedTask] = sourceSection.splice(taskIndex, 1);
		
		movedTask.projectSectionId = toSectionId;
		movedTask.order = (newTasksBySections[toSectionId] || []).length;
		
		if (!newTasksBySections[toSectionId]) {
			newTasksBySections[toSectionId] = [];
		}
		newTasksBySections[toSectionId].push(movedTask);
		
		newTasksBySections[fromSectionId] = sourceSection;
	}
	
	return newTasksBySections;
}

export const moveTaskToPosition = (
	tasksBySections: Record<string, Array<TaskListItem>>,
	taskId: string,
	fromSectionId: string,
	toSectionId: string,
	targetIndex: number,
): Record<string, Array<TaskListItem>> => {
	const newTasksBySections = { ...tasksBySections };
	
	const sourceSection = newTasksBySections[fromSectionId] || [];
	const taskIndex = sourceSection.findIndex(task => task.id === taskId);
	
	if (taskIndex !== -1) {
		const [movedTask] = sourceSection.splice(taskIndex, 1);
		
		movedTask.projectSectionId = toSectionId;
		
		if (!newTasksBySections[toSectionId]) newTasksBySections[toSectionId] = [];

		newTasksBySections[toSectionId].splice(targetIndex, 0, movedTask);

		newTasksBySections[fromSectionId] = sourceSection;
		
		newTasksBySections[toSectionId].forEach((task, index) => {
			task.order = index;
		});
	}
	
	return newTasksBySections;
}