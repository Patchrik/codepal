import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { UserContext } from "../DataProviders/UserProvider";
import { useHistory } from "react-router-dom";

// this will handle the state for the user form and allow use to capture the data to be sent to our
// API that is holding our user data base

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				Codepal
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function CreateAccount() {
	const history = useHistory();

	const classes = useStyles();

	const [user, setUser] = useState({});

	const { addUser } = useContext(UserContext);

	const handleControlledInputChange = (event) => {
		// this will create a copy of the user so we can update after each user action.
		const newUser = { ...user };
		// This is going to grab the current values in the field with the matching "name" tag
		// then it will build an object that we can pull from to send to our user API
		newUser[event.target.name] = event.target.value;
		// update state
		setUser(newUser);
	};

	// this will be our function that creates our user object. So we'll need to build a construct user that builds a user
	// object to then post to the users API - we'll either build a AddUser here or try to import it from the UserProvider
	// but that didn't work within the Login form. (Not sure why I need to ask)
	const constructUserObject = () => {
		addUser({
			firstName: user.firstName,
			lastName: user.lastName,
			userName: user.userName,
			email: user.email,
			password: user.password,
		}).then((userObj) => {
			sessionStorage.setItem("activeUserId", userObj.id);
			sessionStorage.setItem("activeUserName", userObj.userName);
			history.push("/home");
		});
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar
					src={require("/home/parker/workspace/codepal/src/img/codePal.png")}
					className={classes.large}
					variant="rounded"
				/>
				<Typography component="h1" variant="h5">
					Create Your Account!
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								onChange={handleControlledInputChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								onChange={handleControlledInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="userName"
								label="Username"
								name="userName"
								autoComplete="userName"
								onChange={handleControlledInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleControlledInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleControlledInputChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={(event) => {
							event.preventDefault();
							constructUserObject();
						}}
					>
						Create Account!
					</Button>
					<Grid container justify="center">
						<Grid item>
							<Link to="/" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}
