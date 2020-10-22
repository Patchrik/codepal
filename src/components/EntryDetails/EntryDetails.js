import React, { Component, useContext, useState, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import CodepalAppBar from '../EntryList/Header';
import { EntryContext } from '../DataProviders/EntryProvider';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { useParams } from 'react-router-dom';
import { EntryTagContext } from '../DataProviders/EntryTagProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export const EntryDetails = () => {
  const { getEntryById } = useContext(EntryContext);
  const { getEntryTagsByEntryId, FilteredTagEntries } = useContext(
    EntryTagContext
  );

  const [entry, setEntry] = useState({});

  const [entryTags, setEntryTags] = useState([]);

  const { entryId } = useParams();

  const classes = useStyles();

  useEffect(() => {
    getEntryById(entryId)
      .then((response) => {
        setEntry(response);
      })
      .then((_) => {
        getEntryTagsByEntryId(entryId);
      });
  }, []);

  useEffect(() => {
    setEntryTags(FilteredTagEntries);
  }, [FilteredTagEntries]);

  const handleDeleteTag = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClickTag = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <CodepalAppBar />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <Grid
            container
            alignItems="center"
            justify="center"
            style={{ margin: '1em' }}
          >
            <Paper style={{ height: '100%', width: '100%', margin: '1em' }}>
              <Grid container item={12} alignItems="center" justify="center">
                <Grid
                  className="EntryDetails"
                  container
                  alignItems="center"
                  justify="center"
                  direction="column"
                  style={{ margin: '1em' }}
                >
                  <Typography variant="h6">
                    {entry.title} - Written on {entry.date}
                  </Typography>
                  <CKEditor
                    className="textField"
                    disabled={true}
                    editor={ClassicEditor}
                    data={entry.entryText}
                    config={{
                      toolbar: [
                        // We're taking out the toolbar because we do not need it when using
                        // the editor as a rich text reader
                      ],
                    }}
                    onInit={(editor) => {
                      // You can store the "editor" and use when it is needed.
                    }}
                  />
                </Grid>
                <div className={classes.root}>
                  {entryTags.map((entry) => {
                    return (
                      <Chip
                        key={entry.id}
                        size="small"
                        label={entry.tag.name}
                        onClick={handleClickTag}
                        onDelete={handleDeleteTag}
                      />
                    );
                  })}
                </div>
                <Grid
                  item
                  container
                  spacing={2}
                  justify="space-around"
                  style={{ margin: '1em' }}
                >
                  <Grid item>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
};

export default EntryDetails;
