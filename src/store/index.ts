import { configureStore } from "@reduxjs/toolkit";
// API
import { projectsApi } from "./api/projectsApi";
import { tasksApi } from "./api/tasksApi";

export const store = configureStore({
	reducer: {
		[projectsApi.reducerPath]: projectsApi.reducer,
		[tasksApi.reducerPath]: tasksApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			projectsApi.middleware, 
			tasksApi.middleware
		);
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
