// Types
import type { TaskPriority } from "../types/task.type";
import type { ProjectSection } from "./project.interface";

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
	newOrder: number;
	onClose: (task: TaskListItem | null) => void;
	onTaskDelete?: (taskId: string) => void;
}

export interface TaskDetailsProps {
	task: TaskListItem;
	onTaskEdit?: (task: TaskListItem) => void;
}

export interface SortableTaskItemProps {
	task: TaskListItem;
	onClick?: () => void;
}

export interface SortableTaskListProps {
	sections: ProjectSection[];
	tasksBySections: Record<string, Array<TaskListItem>>;
	onTaskMove: (taskId: string, fromSectionId: string, toSectionId: string) => void;
	onTaskMoveToPosition: (taskId: string, fromSectionId: string, toSectionId: string, targetIndex: number) => void;
	onTaskReorder: (sectionId: string, tasks: TaskListItem[]) => void;
	onAddTask: (sectionId: string) => void;
	onTaskEdit: (task: TaskListItem) => void;
}