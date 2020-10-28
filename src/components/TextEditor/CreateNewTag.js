import React, { Component, useContext, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { TagsContext } from '../DataProviders/TagProvider';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const AddNewTagComp = () => {
  const { addTag, getTags } = useContext(TagsContext);
  const [tag, setTag] = useState('');

  useEffect(() => {
    setTag('');
  }, []);

  const handleControlledTagChange = (event) => {
    setTag(event.target.value);
    console.log(tag);
  };

  const constructTagObject = () => {
    console.log('you just click the add new tag button');
    addTag({
      name: tag,
    })
      .then((res) => {
        console.log('This should be a tag object', res);
        sessionStorage.setItem('newTagId', res.id);
      })
      .then(setTag(''));
  };

  return (
    <Grid container justify="center" spacing="2" style={{ margin: '1em' }}>
      <Grid item>
        <TextField
          name="newTagName"
          id="tagCreationField"
          label="Create New Tag"
          onChange={handleControlledTagChange}
          value={tag}
        />
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          onClick={(click) => {
            constructTagObject();
          }}
        >
          Add New Tag
        </Button>
      </Grid>
    </Grid>
  );
};
