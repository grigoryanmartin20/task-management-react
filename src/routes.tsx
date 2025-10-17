import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import App from "./App";
// Pages
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Tasks from "./pages/Tasks";

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Projects />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/projects/create" element={<Project />} />
					<Route path="/projects/:projectId" element={<Project />} />
					<Route path="/projects/:projectId/tasks" element={<Tasks />} />
					<Route path="*" element={<Navigate to="/projects" replace />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}