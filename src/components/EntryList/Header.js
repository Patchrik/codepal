import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {} from 'module';
import { Avatar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

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
  userName: {
    fontStyle: 'italic',
  },
}));

const clearLocalStorage = () => {
  sessionStorage.removeItem('activeUserId');
  sessionStorage.removeItem('activeUserName');
};

// You need to build a sign out funtion that will route the user to the login, and
// will also clear the local storage.

export default function CodepalAppBar() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Avatar
            src={require('/home/parker/workspace/codepal/src/img/codePal.png')}
            className={classes.menuButton}
            variant="rounded"
          />
          <Typography variant="h6" className={classes.title}>
            <Link to={'/home'} style={{ textDecoration: 'none' }}>
              Codepal
            </Link>
          </Typography>
          <Typography className={classes.userName} variant="subtitle1">
            Hello {sessionStorage.getItem('activeUserName')}
          </Typography>
          {/* TODO You need to add a button to create an entry right here. */}
          <Button
            color="inherit"
            onClick={() => {
              history.push('/create');
            }}
          >
            Create
          </Button>

          <Button
            color="inherit"
            onClick={() => {
              clearLocalStorage();
            }}
            href="http://localhost:3000/"
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
