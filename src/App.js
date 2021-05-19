import TopBar from './ui/TopBar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import pink from '@material-ui/core/colors/pink';

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
});

function App() {
    return (
        <ThemeProvider theme={theme}>
        <TopBar />
        </ThemeProvider>
    );
}

export default App;
