import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// Interfaces
import type { SortableTaskItemProps } from '../../interfaces/task.interface';
// Components
import TaskDetails from './TaskDetails';

const SortableTaskItem: React.FC<SortableTaskItemProps> = ({ task, onClick }) => {
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

	const handleClick = () => {
		if (!isDragging) onClick?.();
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		if (e.button !== 0) e.preventDefault();
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="cursor-grab active:cursor-grabbing"
		>
			<div onClick={handleClick} onMouseDown={handleMouseDown}>
				<TaskDetails task={task} />
			</div>
		</div>
	);
};

export default SortableTaskItem;
