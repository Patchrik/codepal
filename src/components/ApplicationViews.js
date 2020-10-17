import React from 'react';
import { Route } from 'react-router-dom';
import CreateAccount from './CreateAccount/AccountForm';
import { SignIn } from './Login/SignIn';

export const ApplicationViews = (props) => {
  return (
    <>
      {/* Render the signIn form as the landing, http://localhost:3000/ */}
      <Route exact path="/">
        <SignIn />
      </Route>

      {/* Render the account creation form, http://localhost:3000/createAccount*/}
      <Route exact path="/createAccount">
        <CreateAccount />
      </Route>
    </>
  );
};
