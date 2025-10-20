// Interfaces
import type { TaskListItem } from "../interfaces/task.interface";

export const getTasksBySections = (tasks: Array<TaskListItem>): Record<string, Array<TaskListItem>> => {
	let tasksBySections: Record<string, Array<TaskListItem>> = {};

	tasks.forEach((task) => {
		if (!tasksBySections[task.projectSectionId]) tasksBySections[task.projectSectionId] = [];
		
		tasksBySections[task.projectSectionId].push(task);
	});

	return tasksBySections;
}

export const setTaskBySection = (
	tasksBySections: Record<string, Array<TaskListItem>>,
	sectionId: string,
	taskData: TaskListItem,
): Record<string, Array<TaskListItem>> => {
	let newTasksBySections = { ...tasksBySections };

	if (!newTasksBySections[sectionId]) newTasksBySections[sectionId] = [];

	newTasksBySections[sectionId].push(taskData);

	return newTasksBySections;
}