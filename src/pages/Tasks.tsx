import { NavLink, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
// Redux
import { useGetProjectByIdQuery } from "../store/api/projectsApi";
// MUI
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const Tasks = () => {
	const navigate = useNavigate();
	const { projectId } = useParams();
	const { data: project, isLoading, error } = useGetProjectByIdQuery(projectId as string, { skip: !projectId });

	useEffect(() => {
		if (!projectId || (!isLoading && error)) navigate('/projects');
	}, [navigate, projectId, isLoading, error]);

	if (!projectId || isLoading || !project) return null;

	return (
		<>
			<div className="p-3">
			<div className="flex items-center mb-4">
					<IconButton 
						color="primary"
						component={NavLink}
						to="/projects"
					><ArrowBack /></IconButton>
					<h1 className="text-2xl font-bold ml-2">{project && project.name}</h1>
				</div>
			</div>
		</>
	)
}

export default Tasks;