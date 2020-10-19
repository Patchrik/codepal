import React from 'react';
import { Route } from 'react-router-dom';
import CreateAccount from './CreateAccount/AccountForm';
import { EntryProvider } from './DataProviders/EntryProvider';
import { UserProvider } from './DataProviders/UserProvider';
import { SignIn } from './Login/SignIn';
import { EntryList } from './EntryList/EntryContainer';

export const ApplicationViews = (props) => {
  return (
    <>
      {/* Render the signIn form as the landing, http://localhost:3000/ */}
      <Route exact path="/">
        <SignIn />
      </Route>

      {/* Render the account creation form, http://localhost:3000/createAccount*/}
      <UserProvider>
        <Route exact path="/createAccount">
          <CreateAccount />
        </Route>
      </UserProvider>
      {/* Render the entry list on cards, http://localhost:3000/home*/}
      <UserProvider>
        <EntryProvider>
          <Route exact path="/home">
            <EntryList />
          </Route>
        </EntryProvider>
      </UserProvider>
    </>
  );
};
