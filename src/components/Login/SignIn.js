import React, { useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { Refresh } from '@material-ui/icons';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Codepal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// This will be where most of our edited JS will live, such as our Auth method and grabing the data to push to the
// the user api
export const SignIn = () => {
  const history = useHistory();

  const classes = useStyles();

  const enteredUsername = useRef('');
  const enteredPassword = useRef('');
  const existDialog = useRef('');

  const existingUserCheck = () => {
    return fetch(
      `http://localhost:8088/users?userName=${enteredUsername.current.value}`
    )
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    existingUserCheck().then((exists) => {
      if (exists) {
        if (exists.password === enteredPassword.current.value) {
          sessionStorage.setItem('activeUserId', exists.id);
          sessionStorage.setItem('activeUserName', exists.userName);
          // This history will push you to the landing page where we'll have multiple entries.
          history.push('/home');
          console.log("congrats motherfucker you're in");
        } else {
          alert(
            `Sorry that's not the password for ${exists.userName}! Make sure that your Caps Lock is off and try again.`
          );
        }
      } else {
        alert(`Sorry but that user doesn't exist. Do you have an account?`);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          src={require('/home/parker/workspace/codepal/src/img/codePal.png')}
          className={classes.large}
          variant="rounded"
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            inputRef={enteredUsername}
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            inputRef={enteredPassword}
            label="Fake Password - NOT SECURE - DEMO ONLY"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  history.push('/createAccount');
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
