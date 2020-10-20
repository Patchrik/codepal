import React, { useContext, useEffect, useState } from 'react';
import { EntryContext } from '../DataProviders/EntryProvider';
import { EntryCard } from './EntryCard';
import { useHistory } from 'react-router-dom';
import { Container, CssBaseline, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CodepalAppBar from './Header';

export const EntryList = () => {
  const history = useHistory();
  // This state changes when `getAnimals()` is invoked below
  const { entries, getEntries } = useContext(EntryContext);

  // Since you are no longer ALWAYS displaying all of the animals
  // const [entries, setEntries] = useState([]);

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
    getEntries();
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
            {entries.map((entry) => {
              return (
                <Grid item xs={4}>
                  <EntryCard key={entry.id} entry={entry} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
};
