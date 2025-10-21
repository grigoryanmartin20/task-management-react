import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// Interfaces
import type { TaskDetailsProps } from '../../interfaces/task.interface';
// Components
import TaskDetails from './TaskDetails';

const SortableTaskItem: React.FC<TaskDetailsProps> = ({ task }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: task.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="cursor-grab active:cursor-grabbing"
		>
			<TaskDetails task={task} />
		</div>
	);
};

export default SortableTaskItem;
