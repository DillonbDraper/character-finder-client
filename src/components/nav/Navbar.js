import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  const history = useHistory()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Lithub
          </Typography>
          {
                (localStorage.getItem("isAdmin") === 'true')
                    ? 
                    <Button onClick={() => history.push('/edit-queue')} color="inherit">Edit Queue</Button>

                    : <></>
            }
          <Button onClick={() => history.push('/creation-hub')} color="inherit">Create!</Button>
          <Button onClick={() => history.push('/')} color="inherit">Home</Button>
          <Button onClick={() => {
            localStorage.removeItem("app_user")
            history.push("/login")
          }} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}