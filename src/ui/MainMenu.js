import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton, makeStyles, MenuIcon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    logo: {
        width: '300px'
    }
}));

export default function MainMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <div>
            <IconButton
                aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
                edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>listagem de karangos</MenuItem>
                <MenuItem onClick={handleClose}>Cadastrar karango</MenuItem>
            </Menu>
        </div>
    );
}
