import React, { Component, useContext, useState, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import CodepalAppBar from '../EntryList/Header';
import { EntryContext } from '../DataProviders/EntryProvider';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { useHistory, useParams } from 'react-router-dom';
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
  const { getEntryById, DeleteEntryById } = useContext(EntryContext);
  const { getEntryTagsByEntryId, FilteredTagEntries } = useContext(
    EntryTagContext
  );

  const [entry, setEntry] = useState({});

  const [entryTags, setEntryTags] = useState([]);

  const { entryId } = useParams();

  const classes = useStyles();

  const history = useHistory();

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

  const handleClick = (tag) => {
    window.open(`http://www.google.com/search?q=${tag.tag.name}`, '_blank');
  };

  // This is going to be the delete entry function that is used below.
  const deleteEntry = () => {
    DeleteEntryById(entryId).then(() => {
      history.push('/home');
    });
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
                  {entryTags.map((tag) => {
                    return (
                      <Chip
                        key={tag.id}
                        size="small"
                        label={tag.tag.name}
                        // TODO You need to figure out why this is causing a
                        onClick={() => handleClick(tag)}
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
                      onClick={() => {
                        history.push(`/details/edit/${entryId}`);
                      }}
                    >
                      {/* TODO You need to finsh the route to the create form and refactor it so
                      that you can use the form as an edit form as well. */}
                      Edit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={deleteEntry}
                    >
                      {/* You need to create a delete function to handle your onClick */}
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
