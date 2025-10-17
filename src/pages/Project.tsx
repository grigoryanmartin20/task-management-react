import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { NavLink } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
// Plugins
import { v4 as uuidv4 } from 'uuid';
// MUI
import { IconButton, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
// Redux
import { useCreateProjectMutation, useGetProjectByIdQuery, useUpdateProjectMutation } from "../store/api/projectsApi";
// Helpers
import { PROJECT_SECTIONS_DEFAULT_NAME } from "../helpers/projectHelper";
// Interfaces
import type { ProjectListItem, ProjectSection } from "../interfaces/project.interface";
// Components
import ProjectDetails from "../components/project/ProjectDetails";
import ProjectSections from "../components/project/ProjectSections";

const Project = () => {
	const navigate = useNavigate();
	const { projectId } = useParams();
	const [project, setProject] = useState<ProjectListItem | null>(null);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [projectSections, setProjectSections] = useState<Array<ProjectSection>>([]);
	const [createProject, { isLoading }] = useCreateProjectMutation();
	const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

	const { data: projectData } = useGetProjectByIdQuery(projectId as string, { skip: !projectId });

	useEffect(() => {
		if (projectData) {
			setProject(projectData);
			setName(projectData.name);
			setDescription(projectData.description);
			setProjectSections(projectData.projectSections);
		}
	}, [projectData]);

	const handleSave = async () => {
		if (!name?.trim()?.length) return;


		let projectData = {
			id: project?.id || uuidv4(),
			name: name.trim(),
			description: description.trim(),
			projectSections: projectSections.map((section) => ({
				id: section.id,
				name: section.name.trim() || PROJECT_SECTIONS_DEFAULT_NAME,
				createdAt: section.createdAt
			})),
		};

		try {
			if (projectId) await updateProject(projectData);
			else await createProject(projectData);
			
			toast.success('Project created successfully.');
			navigate('/projects');
		} catch (error) {
			toast.error('Error creating project. Please try again.');
		}
	}

	return (
		<>
			<div className="p-3">
				<div className="flex items-center mb-4">
					<IconButton 
						color="primary"
						component={NavLink}
						to="/projects"
					>
						<ArrowBack />
					</IconButton>
					<h1 className="text-2xl font-bold ml-2">{projectId ? "Edit Project" : "Create Project"}</h1>
					<div className="ml-auto">
						<Button 
							variant="contained" 
							disabled={!name?.trim()?.length || isLoading || isUpdating}
							loading={isLoading || isUpdating}
							onClick={handleSave}
						>Save</Button>
					</div>
				</div>
				<div className="max-w-3xl mx-auto border border-gray-700 rounded-2xl p-4 mt-4">
					{/* Project Details Component */}
					<ProjectDetails 
						name={name}
						setName={setName}
						description={description}
						setDescription={setDescription}
					/>
				</div>
				<div className="max-w-3xl mx-auto border border-gray-700 rounded-2xl p-4 mt-4">
					{/* Project Sections Component */}
					<ProjectSections 
						projectSections={projectSections} 
						setProjectSections={setProjectSections} 
					/>
				</div>
			</div>
			<ToastContainer theme="colored" />
		</>
	)
}

export default Project;