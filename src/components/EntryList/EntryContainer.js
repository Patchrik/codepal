import React, { useContext, useEffect, useState } from 'react';
import { EntryContext } from '../DataProviders/EntryProvider';
import { EntryCard } from './EntryCard';
import { useHistory } from 'react-router-dom';
import { Container, CssBaseline, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    <Container maxWidth="lg">
      <CssBaseline />
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <h1>Entry</h1>

        <div className="entries">
          {entries.map((entry) => {
            return (
              <Grid item xs={12}>
                <EntryCard key={entry.id} entry={entry} />
              </Grid>
            );
          })}
        </div>

        <button>placeholder</button>
      </Grid>
    </Container>
  );
};
