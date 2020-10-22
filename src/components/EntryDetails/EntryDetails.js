import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Grid, Paper } from '@material-ui/core';
import CodepalAppBar from '../EntryList/Header';
import { EntryContext } from '../DataProviders/EntryProvider';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import { Delete } from '@material-ui/icons';

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
  const classes = useStyles();

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
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
                  style={{ margin: '1em' }}
                >
                  <CKEditor
                    className="textField"
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onInit={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                      console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log('Focus.', editor);
                    }}
                  />
                </Grid>
                <div className={classes.root}>
                  <Chip
                    size="small"
                    // icon={<FaceIcon />}
                    label="Clickable Deletable"
                    onClick={handleClick}
                    onDelete={handleDelete}
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
