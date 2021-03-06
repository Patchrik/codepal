import React, { useContext, useEffect, useState } from 'react';
import { EntryContext } from '../DataProviders/EntryProvider';
import { UserContext } from '../DataProviders/UserProvider';
import { EntryCard } from './EntryCard';
import { useHistory } from 'react-router-dom';
import { Container, CssBaseline, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CodepalAppBar from './Header';
import { CreationCard } from './CreationCard';

export const EntryList = () => {
  const activeUser = {
    userName: sessionStorage.getItem('activeUserName'),
    id: sessionStorage.getItem('activeUserId'),
  };
  const history = useHistory();

  //  We'll need user context to grab a user's id since the create account form doesn't give us
  // the id.
  // const { getUserByUserName } = useContext(UserContext);
  // This state changes when `getAnimals()` is invoked below
  const { getEntriesByUserId, userEntries, setUserEntries } = useContext(
    EntryContext
  );

  useEffect(() => {
    getEntriesByUserId(activeUser.id);
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <CodepalAppBar />
      </Grid>

      <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <Grid container spacing={4}>
            {userEntries.map((entry) => {
              return (
                <Grid item xs={4} key={entry.id}>
                  <EntryCard key={entry.id} entry={entry} />
                </Grid>
              );
            })}
            <Grid item xs={4}>
              <CreationCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
};
