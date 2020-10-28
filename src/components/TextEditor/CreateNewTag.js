import React, { Component, useContext, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { TagsContext } from '../DataProviders/TagProvider';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const AddNewTagComp = () => {
  const { addTag, getTags } = useContext(TagsContext);

  return (
    <Grid>
      <TextField
        name="createNewTagField"
        id="standard-basic"
        label={'Tag Name'}
        onChange={handleControlledTagChange}
        defaultValue={'tag value'}
      />
      <Button>Add New Tag</Button>
    </Grid>
  );
};
