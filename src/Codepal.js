import React from 'react';
import { Route } from 'react-router-dom';
import { ApplicationViews } from './components/ApplicationViews';

export const Codepal = () => (
  <>
    <Route
      render={() => {
        return (
          <>
            <ApplicationViews />
          </>
        );
      }}
    />
  </>
);
