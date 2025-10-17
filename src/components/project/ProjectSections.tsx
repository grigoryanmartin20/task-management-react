// Plugins
import { v4 as uuidv4 } from 'uuid';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';
// MUI
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
// Components
import ProjectSectionSortableItem from './ProjectSectionSortable';
// Interfaces
import type { ProjectSectionsProps } from "../../interfaces/project.interface";
// Helpers
import { projectHelper, PROJECT_SECTIONS_MIN_LENGTH, PROJECT_SECTIONS_MAX_LENGTH, PROJECT_SECTIONS_DEFAULT_NAME } from "../../helpers/projectHelper";

const ProjectSections = ({ projectSections, setProjectSections }: ProjectSectionsProps) => {
	const sections = projectHelper.getProjectSections(projectSections);

	const handleChange = (id: string, name: string) => {
		setProjectSections(sections.map((section) => section.id === id ? { ...section, name } : section));
	}

	const handleDelete = (id: string) => {
		if (sections?.length === PROJECT_SECTIONS_MIN_LENGTH) return;
		
		setProjectSections(sections.filter((section) => section.id !== id));
	}

	const handleAddSection = () => {
		if (sections?.length === PROJECT_SECTIONS_MAX_LENGTH) return;
		
		setProjectSections([...sections, { id: uuidv4(), name: PROJECT_SECTIONS_DEFAULT_NAME, createdAt: new Date() }]);
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (active.id !== over?.id) {
			const oldIndex = sections.findIndex((section) => section.id === active.id);
			const newIndex = sections.findIndex((section) => section.id === over?.id);

			const newSections = [...sections];
			const [reorderedSection] = newSections.splice(oldIndex, 1);
			newSections.splice(newIndex, 0, reorderedSection);

			setProjectSections(newSections);
		}
	}

	return (
		<>
			<h2 className="text-lg font-bold mb-4">Project Sections</h2>
			<DndContext 
				onDragEnd={handleDragEnd}
				modifiers={[restrictToVerticalAxis]}
			>
				<div className="flex flex-col gap-4 h-[calc(100vh-555px)] overflow-y-auto mx-[-10px] px-[10px] mb-[10px]">
					<SortableContext 
						items={sections.map(section => section.id)} 
						strategy={verticalListSortingStrategy}
					>
						{sections.map((section) => (
							<ProjectSectionSortableItem
								key={section.id}
								section={section}
								onDelete={handleDelete}
								onChange={handleChange}
								canDelete={sections.length > PROJECT_SECTIONS_MIN_LENGTH}
							/>
						))}
					</SortableContext>
				</div>
			</DndContext>
			<div className="flex justify-center">
				<Button variant="contained" color="primary" 
					startIcon={<AddIcon />} 
					disabled={sections.length === PROJECT_SECTIONS_MAX_LENGTH}
					onClick={handleAddSection}
				>Add Section</Button>
			</div>
		</>
	)
}

export default ProjectSections;