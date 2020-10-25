import React, { Component, useContext, useState, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CodepalAppBar from '../EntryList/Header';
import { EntryContext } from '../DataProviders/EntryProvider';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { EntryTagContext } from '../DataProviders/EntryTagProvider';
import { TagsContext } from '../DataProviders/TagProvider';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  textRoot: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  },
}));

export const CreateEntry = (props) => {
  const { addEntry } = useContext(EntryContext);

  const { getEntryTagsByEntryId, FilteredTagEntries } = useContext(
    EntryTagContext
  );

  const { getTags, addTag, getTagById, DeleteTagsById } = useContext(
    TagsContext
  );

  const [entry, setEntry] = useState({});

  const [entryTags, setEntryTags] = useState({});

  const [richText, setRichText] = useState({});

  const [tag, setTag] = useState({});

  const handleControlledInputChange = (event) => {
    const newEntry = { ...entry };

    newEntry[event.target.name] = event.target.value;

    setEntry(newEntry);
  };

  const classes = useStyles();

  const handleDeleteTag = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClickTag = () => {
    console.info('You clicked the Chip.');
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
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
                  <Grid
                    container
                    justify="space-evenly"
                    style={{ margin: '1em' }}
                  >
                    <form
                      className={classes.textRoot}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="standard-basic"
                        label="Entry Title"
                        value={'Entry Title'}
                      />
                    </form>
                  </Grid>
                  <CKEditor
                    className="textField"
                    editor={ClassicEditor}
                    data="You need to read about how to use the built in getData function"
                    onInit={(editor) => {
                      // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                      setRichText(editor.getData());
                      console.log({ event, editor, richText });
                    }}
                  />
                  <Grid container justify="space-around">
                    <Grid direction="column">
                      <InputLabel id="tags-select-label">Tags</InputLabel>
                      <Select
                        labelId="tags-select-label"
                        id="tag-select"
                        value={tag}
                        onChange={handleTagChange}
                      >
                        <MenuItem value={10}>HTML</MenuItem>
                        <MenuItem value={20}>CSS</MenuItem>
                        <MenuItem value={30}>JavaScript</MenuItem>
                      </Select>
                    </Grid>
                    <Button type="button" variant="contained" color="primary">
                      Add Tag
                    </Button>
                  </Grid>
                </Grid>
                <div className={classes.root}>
                  <Chip
                    key="placeholder 1"
                    size="small"
                    label="placeholder"
                    onClick={handleClickTag}
                    onDelete={handleDeleteTag}
                  />
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
                      Save
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Cancel
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

export default CreateEntry;
