// Types
import type { TaskPriority } from "../types/task.type";

export interface TaskListItem {
	id: string;
	projectId: string;
	projectSectionId: string;
	name: string;
	description: string;
	priority: TaskPriority;
	createdAt: Date;
	order: number;
}

export interface TaskDialogProps {
	isOpen: boolean;
	projectId: string | null;
	sectionId: string | null;
	task: TaskListItem | null;
	onClose: (task: TaskListItem | null) => void;
}

export interface TaskDetailsProps {
	task: TaskListItem;
}