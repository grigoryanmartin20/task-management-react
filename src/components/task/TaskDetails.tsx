// Interfaces
import type { TaskDetailsProps } from "../../interfaces/task.interface";
import type { TaskPriority } from "../../types/task.type";


const TaskDetails = ({ task }: TaskDetailsProps) => {
	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
	}

	const getPriorityColor = (priority: TaskPriority) => {
		switch (priority) {
			case 'low':
				return 'text-green-400';
			case 'medium':
				return 'text-yellow-400';
			case 'high':
				return 'text-red-400';
		}
	}

	return (
		<>
			<div className="bg-gray-700 rounded-md p-2 hover:bg-gray-800 transition-colors cursor-pointer">
				<div className="text-sm line-clamp-2">{task.name}</div>
				{
					task.description && (
						<div className="text-xs text-gray-400 line-clamp-3 mt-2">{task.description}</div>
					)
				}
				<div className="flex justify-between items-center mt-2">
					<div className={`${getPriorityColor(task.priority)} text-xs font-bold capitalize italic`}>{task.priority}</div>
					<div className="text-xs italic text-gray-400">{formatDate(task.createdAt)}</div>
				</div>
			</div>
		</>
	)
}

export default TaskDetails;