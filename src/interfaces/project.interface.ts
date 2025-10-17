export interface ProjectListItem {
	id: string;
	name: string;
	description: string;
	projectSections: Array<ProjectSection>;
	createdAt: Date;
}

export interface ProjectSection {
	id: string;
	name: string;
	createdAt: Date;
}

export interface ProjectDetailsProps {
	name: string;
	setName: (name: string) => void;
	description: string;
	setDescription: (description: string) => void;
}

export interface ProjectSectionsProps {
	projectSections: Array<ProjectSection>;
	setProjectSections: (projectSections: Array<ProjectSection>) => void;
}

export interface ProjectSectionSortableItemProps {
	section: ProjectSection;
	onDelete: (id: string) => void;
	onChange: (id: string, name: string) => void;
	canDelete: boolean;
}