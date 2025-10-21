import React from 'react';
import {
	DndContext, DragOverlay, PointerSensor, useSensor, useSensors, useDroppable, closestCenter,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent, DragOverEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
// MUI
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
// Interfaces
import type { TaskListItem } from '../../interfaces/task.interface';
import type { ProjectSection } from '../../interfaces/project.interface';
// Components
import TaskDetails from './TaskDetails';
import SortableTaskItem from './SortableTaskItem';

interface SortableTaskListProps {
	sections: ProjectSection[];
	tasksBySections: Record<string, Array<TaskListItem>>;
	onTaskMove: (taskId: string, fromSectionId: string, toSectionId: string) => void;
	onTaskMoveToPosition: (taskId: string, fromSectionId: string, toSectionId: string, targetIndex: number) => void;
	onTaskReorder: (sectionId: string, tasks: TaskListItem[]) => void;
	onAddTask: (sectionId: string) => void;
}

const SortableTaskList: React.FC<SortableTaskListProps> = ({
	sections,
	tasksBySections,
	onTaskMove,
	onTaskMoveToPosition,
	onTaskReorder,
	onAddTask,
}) => {
	const [activeTask, setActiveTask] = React.useState<TaskListItem | null>(null);
	const [overId, setOverId] = React.useState<string | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		const taskId = active.id as string;

		for (const sectionId in tasksBySections) {
			const task = tasksBySections[sectionId].find(t => t.id === taskId);

			if (task) {
				setActiveTask(task);
				break;
			}
		}
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { over } = event;
		setOverId(over?.id as string || null);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveTask(null);
		setOverId(null);

		if (!over) return;

		const taskId = active.id as string;
		const overId = over.id as string;
		let fromSectionId = '';

		for (const sectionId in tasksBySections) {
			if (tasksBySections[sectionId].some(task => task.id === taskId)) {
				fromSectionId = sectionId;
				break;
			}
		}

		const isDroppingOnSection = sections.some(section => section.id === overId);

		if (isDroppingOnSection) {
			if (fromSectionId !== overId) {
				onTaskMove(taskId, fromSectionId, overId);
			}
		} else {
			let toSectionId = '';
			let targetTaskIndex = -1;

			for (const sectionId in tasksBySections) {
				const taskIndex = tasksBySections[sectionId].findIndex(task => task.id === overId);
				if (taskIndex !== -1) {
					toSectionId = sectionId;
					targetTaskIndex = taskIndex;
					break;
				}
			}

			if (fromSectionId !== toSectionId) {
				onTaskMoveToPosition(taskId, fromSectionId, toSectionId, targetTaskIndex);
			} else {
				const sectionTasks = [...tasksBySections[fromSectionId]];
				const fromIndex = sectionTasks.findIndex(task => task.id === taskId);
				const toIndex = sectionTasks.findIndex(task => task.id === overId);

				if (fromIndex !== -1 && toIndex !== -1) {
					const reorderedTasks = arrayMove(sectionTasks, fromIndex, toIndex);
					onTaskReorder(fromSectionId, reorderedTasks);
				}
			}
		}
	};

	return (
		<DndContext
			sensors={sensors}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			collisionDetection={closestCenter}
		>
			<div className="flex gap-4 h-[calc(100vh-95px)] mb-[10px] pb-[10px] overflow-y-auto">
				{sections.map((section) => {
					const sectionTasks = tasksBySections[section.id] || [];
					const taskIds = sectionTasks.map(task => task.id);

					return (
						<SectionColumn
							key={section.id}
							section={section}
							tasks={sectionTasks}
							taskIds={taskIds}
							onAddTask={onAddTask}
							overId={overId}
							activeTask={activeTask}
						/>
					);
				})}
			</div>

			<DragOverlay>
				{activeTask ? (
					<div className="opacity-50">
						<TaskDetails task={activeTask} />
					</div>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};

const SectionColumn: React.FC<{
	section: ProjectSection;
	tasks: TaskListItem[];
	taskIds: string[];
	onAddTask: (sectionId: string) => void;
	overId: string | null;
	activeTask: TaskListItem | null;
}> = ({ section, tasks, taskIds, onAddTask, overId, activeTask }) => {
	const { setNodeRef, isOver } = useDroppable({ id: section.id });

	const isOverSection = isOver || overId === section.id;
	const isOverTask = overId && taskIds.includes(overId);
	const isDraggingFromOtherSection = activeTask && !taskIds.includes(activeTask.id);

	return (
		<div
			ref={setNodeRef}
			className={`min-w-[300px] border border-gray-700 rounded-xl p-4 transition-all duration-200 ${
				isOverSection ? 'bg-gray-600 border-gray-500' : ''
			}`}
		>
			<div className="flex items-center justify-between">
				<h2 className="truncate">{section.name}</h2>
				<IconButton
					size="small"
					color="primary"
					onClick={() => onAddTask(section.id)}
				>
					<Add />
				</IconButton>
			</div>
			<div className="flex flex-col gap-2 mt-3 mx-[-10px] px-[10px] h-[calc(100%-40px)] overflow-y-auto">
				<SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
					{tasks.map((task) => {
						const isOverThisTask = overId === task.id;
						const showDropIndicator = isDraggingFromOtherSection && isOverThisTask;
						
						return (
							<React.Fragment key={task.id}>
								{showDropIndicator && (
									<div className="h-1 bg-blue-500 rounded-full mx-2 opacity-75 animate-pulse" />
								)}
								<SortableTaskItem task={task} />
							</React.Fragment>
						);
					})}
					{isDraggingFromOtherSection && isOverSection && !isOverTask && (
						<div className="h-1 bg-blue-500 rounded-full mx-2 opacity-75 animate-pulse" />
					)}
				</SortableContext>
			</div>
		</div>
	);
};

export default SortableTaskList;