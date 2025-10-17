import { createTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

export const useAppTheme = () => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	
	const theme = createTheme({
		palette: {
			mode: prefersDarkMode ? 'dark' : 'light',
		},
	})

	return theme;
}
