import React from 'react';
import { Route } from 'react-router-dom';
import { SignIn } from './Login/SignIn';

export const ApplicationViews = (props) => {
  return (
    <>
      {/* Render the location list when http://localhost:3000/ */}
      <Route exact path="/">
        <SignIn />
      </Route>
    </>
  );
};
