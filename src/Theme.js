import {green, red} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f5a453',
            contrastText: '#fff'
        },
        secondary: {
            main: '#19857b',
        },
        success: {
            main: green['800']
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#f0f0f0',
        },
    },
});

export default theme;
