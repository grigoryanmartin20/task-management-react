import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from 'react-toastify';
// MUI
import { IconButton, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
// Redux
import { useDeleteProjectMutation, useGetProjectsQuery } from "../store/api/projectsApi";
// Components
import ConfirmDialog from "../components/dialog/ConfirmDialog";

const Projects = () => {
	const navigate = useNavigate();
	const { data: projects, isLoading, error } = useGetProjectsQuery();
	const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [projectToDelete, setProjectToDelete] = useState<{ id: string; name: string } | null>(null);

	const handleDeleteClick = (id: string, name: string) => {
		setProjectToDelete({ id, name });
		setDialogOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (projectToDelete) {
			try {
				await deleteProject(projectToDelete.id).unwrap();
				setDialogOpen(false);
				setProjectToDelete(null);
			} catch (error) {
				toast.error('Failed to delete project. Please try again.');
			}
		}
	};

	const handleCancelDelete = () => {
		setDialogOpen(false);
		setTimeout(() => setProjectToDelete(null), 100);
	};

	const renderContent = () => {
		if (isLoading) {
			return <p className="text-center">Loading projects...</p>;
		}
		
		if (error) {
			return <p className="text-center text-red-500">Error loading projects.</p>;
		}
		
		if (projects?.length) {
			return projects.map((project) => (
				<div key={project.id} className="flex items-center mb-4 p-4 border border-gray-600 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer min-w-0">
					<div className="flex-1 min-w-0" onClick={() => navigate(`/projects/${project.id}/tasks`)}>
						<h2 className="text-lg font-semibold break-words overflow-wrap-anywhere">{project.name}</h2>
 						{project.description && <p className="text-sm text-gray-400 break-words overflow-wrap-anywhere">{project.description}</p>}
					</div>
					<div>
						<IconButton 
							color="primary"
							component={NavLink}
							to={`/projects/${project.id}`}
							disabled={isDeleting}
						><Edit /></IconButton>
					</div>
					<div>
						<IconButton 
							color="error"
							loading={isDeleting}
							onClick={() => handleDeleteClick(project.id, project.name)}
						><Delete /></IconButton>
					</div>
				</div>
			));
		}
		
		return <p>No projects found.</p>;
	};

	return (
		<>
			<div className="flex justify-between items-center mb-4 p-3">
				<h1 className="text-2xl font-bold">Projects</h1>
				<NavLink to="/projects/create">
					<Button variant="contained">Add Project</Button>
				</NavLink>
			</div>
			<div className="h-[calc(100vh-100px)] overflow-y-auto pl-3 pr-3 max-w-full">
				{renderContent()}
			</div>
			<ConfirmDialog
				isOpen={dialogOpen}
				title="Delete Project"
				message={`Are you sure you want to delete "${projectToDelete?.name}"? This action cannot be undone.`}
				confirmText="Delete"
				cancelText="Cancel"
				variant="danger"
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
			/>
		</>
	)
}

export default Projects;