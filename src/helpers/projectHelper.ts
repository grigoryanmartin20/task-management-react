// Plugins
import { v4 as uuidv4 } from 'uuid';
// Interfaces
import type { ProjectSection } from "../interfaces/project.interface";

export const PROJECT_SECTIONS_MIN_LENGTH = 2;

export const PROJECT_SECTIONS_MAX_LENGTH = 10;

export const PROJECT_SECTIONS_DEFAULT_NAME = "New Section";

export const projectHelper = {
	getProjectSections: (projectSections: Array<ProjectSection>) => {
		if (projectSections.length === 0) {
			return getDefaultsProjectSections();
		}

		return projectSections;
	}
}

const getDefaultsProjectSections = () => {
	const now = new Date();

	return [
		{
			id: uuidv4(),
			name: "New Tasks",
			createdAt: now,
		},
		{
			id: uuidv4(),
			name: "In Progress",
			createdAt: now,
		},
		{
			id: uuidv4(),
			name: "Completed",
			createdAt: now,
		}
	];
}