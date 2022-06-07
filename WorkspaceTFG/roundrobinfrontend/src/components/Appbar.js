
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from "react-router-dom";

//import { color } from '@mui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: '30px', 
  },
  background: {
    backgroundColor: '#4C4C4C',
  }

}));

export default function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.background}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <NavLink className="navbar-brand" to="/">
              Round-Robin
            </NavLink>
          </Typography>

          <NavLink className="nav-link" to="/">
            Home
            <span className="sr-only">(current)</span>
          </NavLink>
          <NavLink className="nav-link" to="/researchCenters">
            Research Centers
            <span className="sr-only">(current)</span>
          </NavLink>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
