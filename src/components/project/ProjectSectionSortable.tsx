// Plugins
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// MUI
import { TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
// Interfaces
import type { ProjectSectionSortableItemProps } from '../../interfaces/project.interface';

const ProjectSectionSortableItem = ({ 
	section, 
	onDelete, 
	onChange, 
	canDelete 
}: ProjectSectionSortableItemProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ 
		id: section.id,
		disabled: false,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		zIndex: isDragging ? 1000 : 'auto',
	};

	return (
		<div 
			ref={setNodeRef} 
			style={style} 
			{...attributes}
			className="flex items-center w-full"
		>
			<div 
				{...listeners}
				className="mr-2 text-gray-400 hover:text-gray-600 cursor-grab flex items-center justify-center p-1"
			>
				<DragIndicatorIcon fontSize="small" />
			</div>
			<TextField 
				size="small"
				fullWidth
				value={section.name}
				onChange={(e) => onChange(section.id, e.target.value)}
			/>
			<div className="ml-2">
				<IconButton color="primary" sx={{ p: '10px' }} 
					onClick={() => onDelete(section.id)}
					disabled={!canDelete}
				>
					<DeleteIcon color={canDelete ? "error" : "disabled"} />
				</IconButton>
			</div>
		</div>
	);
};

export default ProjectSectionSortableItem;
