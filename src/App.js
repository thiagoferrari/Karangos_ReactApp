import TopBar from './ui/TopBar';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import pink from '@material-ui/core/colors/pink';
import { FooterBar } from './ui/FooterBar';
import { Box } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: yellow[500],
        },
        secondary: {
            main: pink[500],
        },
    },
})

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh'
    }
}))
function Main() {
    const classes = useStyles()
    return (
        <Box className={classes.box}>
            <TopBar />
            <FooterBar />
        </Box>
    )
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Main />
        </ThemeProvider>
    );
}

export default App;
