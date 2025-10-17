import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Interfaces
import type { ProjectListItem } from "../../interfaces/project.interface";

export const projectsApi = createApi({
	reducerPath: "projectsApi",
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
	tagTypes: ['Project'],
	endpoints: (builder) => ({
		getProjects: builder.query<Array<ProjectListItem>, void>({
			query: () => "/projects",
			providesTags: ['Project'],
		}),
		getProjectById: builder.query<ProjectListItem, string>({
			query: (id) => `/projects/${id}`,
			providesTags: (_result, _error, id) => [{ type: 'Project', id }],
		}),
		createProject: builder.mutation<ProjectListItem, Partial<ProjectListItem>>({
			query: (newProject) => ({
				url: "/projects",
				method: "POST",
				body: newProject,
			}),
			invalidatesTags: ['Project'],
		}),
		updateProject: builder.mutation<ProjectListItem, Partial<ProjectListItem>>({
			query: (updatedProject) => ({
				url: `/projects/${updatedProject.id}`,
				method: "PUT",
				body: updatedProject,
			}),
			invalidatesTags: ['Project'],
		}),
		deleteProject: builder.mutation<void, string>({
			query: (id) => ({
				url: `/projects/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ['Project'],
		}),
	}),
});

export const { 
	useGetProjectsQuery, 
	useGetProjectByIdQuery, 
	useCreateProjectMutation, 
	useUpdateProjectMutation, 
	useDeleteProjectMutation 
} = projectsApi;