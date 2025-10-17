import { configureStore } from "@reduxjs/toolkit";
// API
import { projectsApi } from "./api/projectsApi";

export const store = configureStore({
	reducer: {
		[projectsApi.reducerPath]: projectsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(projectsApi.middleware);
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
