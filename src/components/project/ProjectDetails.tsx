import { useState } from "react";
// MUI
import { TextField } from "@mui/material";
// Interfaces
import type { ProjectDetailsProps } from "../../interfaces/project.interface";

const ProjectDetails = ({ name, setName, description, setDescription }: ProjectDetailsProps) => {
	const [nameTouched, setNameTouched] = useState(false);
	
	return (
		<>
			<h2 className="text-lg font-bold mb-4">Project Details</h2>
			<div className="mb-4">
				<label className="block mb-2 text-sm">Name <span className="text-red-500">*</span></label>
				<div>
					<TextField 
						size="small"
						fullWidth
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						onBlur={() => setNameTouched(true)}
						error={nameTouched && !name?.trim()?.length}
						helperText={nameTouched && !name?.trim()?.length ? "Name is required" : ""}
					/>
				</div>
			</div>
			<div className="mb-4">
				<label className="block text-sm mb-2">
					Description
				</label>
				<div>
					<TextField 
						size="small"
						fullWidth
						multiline
						minRows={3}
						maxRows={6}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
			</div>
		</>
	)
}

export default ProjectDetails