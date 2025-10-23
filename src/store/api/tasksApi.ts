// Redux
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Interfaces
import type { TaskListItem } from "../../interfaces/task.interface";

export const tasksApi = createApi({
	reducerPath: "tasksApi",
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
	tagTypes: ['Task'],
	endpoints: (builder) => ({
		getTasks: builder.query<Array<TaskListItem>, string>({
			query: (projectId) => `/tasks?projectId=${projectId}`,
			providesTags: ['Task']
		}),
		createTask: builder.mutation<TaskListItem, Partial<TaskListItem>>({
			query: (newTask) => ({
				url: "/tasks",
				method: "POST",
				body: newTask,
			}),
			invalidatesTags: ['Task'],
		}),
		updateTask: builder.mutation<TaskListItem, Partial<TaskListItem>>({
			query: (updatedTask) => ({
				url: `/tasks/${updatedTask.id}`,
				method: "PUT",
				body: updatedTask,
			}),
			invalidatesTags: ['Task'],
		}),
		deleteTask: builder.mutation<void, string>({
			query: (id) => ({
				url: `/tasks/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ['Task'],
		}),
	}),
});

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi;