import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
// Store
import { store } from "./store"
// MUI
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
// Routes
import { AppRoutes } from './routes.tsx'
// Theme
import { useAppTheme } from './theme'
// Styles
import './index.css'

function AppWithTheme() {
	const theme = useAppTheme()

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppRoutes />
		</ThemeProvider>
	)
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<AppWithTheme />
		</Provider>
	</StrictMode>
)