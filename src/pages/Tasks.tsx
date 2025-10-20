import { NavLink, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
// Redux
import { useGetProjectByIdQuery } from "../store/api/projectsApi";
import { useGetTasksQuery } from "../store/api/tasksApi";
// MUI
import { IconButton, CircularProgress } from "@mui/material";
import { Add, ArrowBack } from "@mui/icons-material";
// Interfaces
import type { TaskListItem } from "../interfaces/task.interface";
// Helpers
import { getTasksBySections, setTaskBySection } from "../helpers/taskHelper";
// Components
import TaskDialog from "../components/task/TaskDialog";
import TaskDetails from "../components/task/TaskDetails";

const Tasks = () => {
	const navigate = useNavigate();
	const { projectId } = useParams();
	const { data: project, isLoading, error } = useGetProjectByIdQuery(projectId as string, { skip: !projectId });
	const { data: tasks, isLoading: tasksLoading } = useGetTasksQuery(projectId as string);
	const [tasksBySections, setTasksBySections] = useState<Record<string, Array<TaskListItem>>>({});
	const [sectionId, setSectionId] = useState<string | null>(null);
	const [task, setTask] = useState<TaskListItem | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!projectId || (!isLoading && error)) navigate('/projects');
	}, [navigate, projectId, isLoading, error]);

	useEffect(() => {
		if (tasks) setTasksBySections(getTasksBySections(tasks));
	}, [tasks]);

	if (!projectId || isLoading || !project) return null;

	const handleOpenTaskDialog = (state: boolean, sectionId: string | null, taskData?: TaskListItem | null) => {
		if (taskData) {
			if (task) {}
			else setTasksBySections(setTaskBySection(tasksBySections, sectionId as string, taskData));
		}

		setIsOpen(state);
		setSectionId(sectionId);
		setTask(task);
	}

	return (
		<>
			<div className="p-3 pb-0">
				<div className="flex items-center mb-4">
					<IconButton 
						color="primary"
						component={NavLink}
						to="/projects"
					><ArrowBack /></IconButton>
					<h1 className="text-2xl font-bold ml-2 truncate" title={project && project.name}>{project && project.name}</h1>
				</div>
				<div className="flex gap-4 h-[calc(100vh-95px)] mb-[10px] pb-[10px] overflow-y-auto">
					{project.projectSections.map((section) => (
						<div key={section.id} className="min-w-[300px] border border-gray-700 rounded-xl p-4">
							<div className="flex items-center justify-between">
								<h2 className="truncate">{section.name}</h2>
								<IconButton 
									size="small"
									color="primary"
									onClick={() => handleOpenTaskDialog(true, section.id, null)}
								><Add /></IconButton>
							</div>
							<div className="flex flex-col gap-2 mt-3">
								{tasksLoading ? 
									<div className="flex justify-center mt-10"><CircularProgress size={24} /></div> : 
									tasksBySections[section.id]?.map((task) => (
										<TaskDetails key={task.id} task={task} />
									))
								}
							</div>
						</div>
					))}
				</div>
			</div>
			<TaskDialog 
				isOpen={isOpen} 
				projectId={projectId}
				sectionId={sectionId}
				task={task}
				onClose={(task: TaskListItem | null) => handleOpenTaskDialog(false, null, task)} 
			/>
		</>
	)
}

export default Tasks;