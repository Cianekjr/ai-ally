import { createTheme, ThemeOptions } from '@mui/material/styles'

const theme = createTheme({})

const themeComponents: ThemeOptions['components'] = {}

export const brandingTheme: ThemeOptions = { ...theme, ...themeComponents }
