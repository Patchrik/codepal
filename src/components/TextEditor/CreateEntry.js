import React, { useContext, useState, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Grid, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CodepalAppBar from '../EntryList/Header';
import { EntryContext } from '../DataProviders/EntryProvider';
import { makeStyles } from '@material-ui/core/styles';
import { EntryTagContext } from '../DataProviders/EntryTagProvider';
import { TagsContext } from '../DataProviders/TagProvider';
import { TagSelector } from './TagSelector';
import { useHistory, useParams } from 'react-router-dom';
import { AddNewTagComp } from './CreateNewTag';

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
    // textField: {
    //   marginLeft: theme.spacing(1),
    //   marginRight: theme.spacing(1),
    //   width: '100%',
    // },
  },
}));

export const CreateEntry = (props) => {
  const { addEntry, getEntryById, UpdateEntry } = useContext(EntryContext);

  const { getEntryTagsByEntryId, addSelectedEntryTags } = useContext(
    EntryTagContext
  );

  const { getTags, addTag, getTagById, DeleteTagsById, tags } = useContext(
    TagsContext
  );

  const { entryId } = useParams();

  const [entry, setEntry] = useState({ title: '', entryText: '', date: '' });

  const [richText, setRichText] = useState({});

  const [
    LocalTagSelectorHoldingArray,
    setLocalTagSelectorHoldingArray,
  ] = useState([]);

  // This will be our first useEffect for the page to grab the first list of tags.
  useEffect(() => {
    getTags().then(() => {
      if (entryId) {
        getEntryById(entryId).then((entry) => {
          if (
            parseInt(sessionStorage.getItem('activeUserId')) !== entry.userId
          ) {
            history.push('/home');
          }
          setEntry(entry);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (LocalTagSelectorHoldingArray.length <= 0) {
      setLocalTagSelectorHoldingArray([...tags]);
      return;
    }
    const newlyAddedTags = tags
      .filter((tag) => {
        return !LocalTagSelectorHoldingArray.find((t) => {
          return tag.id === t.id;
        });
      })
      .map((tag) => {
        tag.isSelected = true;
        return tag;
      });
    const updatedTags = [...LocalTagSelectorHoldingArray, ...newlyAddedTags];
    setLocalTagSelectorHoldingArray(updatedTags);
  }, [tags]);

  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newEntry = { ...entry };

    newEntry[event.target.name] = event.target.value;

    setEntry(newEntry);
  };

  const classes = useStyles();

  const handleDeleteTag = (tag) => {
    const updatedState = LocalTagSelectorHoldingArray.map((item) => {
      if (parseInt(item.id) === parseInt(tag.id)) {
        item.isSelected = false;
      }
      return item;
    });

    setLocalTagSelectorHoldingArray(updatedState);
  };

  const handleClickTag = (tag) => {
    const updatedState = LocalTagSelectorHoldingArray.map((item) => {
      if (parseInt(item.id) === parseInt(tag.id)) {
        item.isSelected = true;
      }
      return item;
    });

    setLocalTagSelectorHoldingArray(updatedState);
  };

  // This will be our builder function to create the entryObj to add to the api

  const constructEntryObject = () => {
    const createdDate = new Intl.DateTimeFormat('en-US').format(new Date());
    if (entryId) {
      UpdateEntry({
        id: entryId,
        userId: parseInt(sessionStorage.getItem('activeUserId')),
        title: entry.title,
        entryText: richText,
        date: createdDate,
      }).then(() => {
        history.push('/home');
      });
    } else {
      addEntry({
        userId: parseInt(sessionStorage.getItem('activeUserId')),
        title: entry.title,
        entryText: richText,
        date: createdDate,
      })
        .then((addedEntry) => {
          const selectedTags = LocalTagSelectorHoldingArray.filter(
            (tag) => tag.isSelected
          );
          const entryTags = selectedTags.map((tag) => {
            return { entryId: addedEntry.id, tagId: tag.id };
          });
          return addSelectedEntryTags(entryTags);
        })
        .then(() => {
          history.push('/home');
        });
    }
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
            <Grid
              container
              item={12}
              alignItems="center"
              justify="center"
              direction="column"
            >
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
                  <Grid item>
                    <form
                      className={classes.textRoot}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        name="title"
                        id="standard-basic"
                        label={'Entry Title'}
                        onChange={handleControlledInputChange}
                        value={entry.title}
                      />
                    </form>
                  </Grid>
                </Grid>
                <Grid item>
                  <CKEditor
                    className="textField"
                    editor={ClassicEditor}
                    config={{
                      toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        'blockQuote',
                        'undo',
                        '|',
                        'redo',
                      ],
                    }}
                    data={entry.entryText}
                    onInit={(editor) => {
                      // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                      setRichText(editor.getData());
                    }}
                  />
                </Grid>
              </Grid>
              <div className={classes.root}>
                {LocalTagSelectorHoldingArray.map((tagObj) => {
                  return (
                    <TagSelector
                      key={tagObj.id}
                      tag={tagObj}
                      handleClickTag={handleClickTag}
                      handleDeleteTag={handleDeleteTag}
                    />
                  );
                })}
              </div>
              <AddNewTagComp />
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
                    onClick={(event) => {
                      event.preventDefault();
                      constructEntryObject();
                    }}
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
          </Grid>
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
};

export default CreateEntry;
