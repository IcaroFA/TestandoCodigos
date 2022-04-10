import { createTheme } from '@mui/material/styles'
export let theme = createTheme({
    typography: {
        fontFamily: 'Helvica, sans-serif'
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: '#000000',
                    "&.Mui-selected": {
                        backgroundColor: '#ed8e53',
                        color: '#fff',
                        ':hover': {
                            backgroundColor: '#ed8e53',
                            color: '#fff'
                        }
                    }
                }

            }
        }

    },

});