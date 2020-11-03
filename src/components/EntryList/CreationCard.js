import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, useHistory } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CenterFocusWeakTwoTone } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export const CreationCard = () => {
  const history = useHistory();

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Create A New Entry
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <CKEditor
              disabled={true}
              editor={ClassicEditor}
              data={
                "This app will allow you to create entries about your coding journey, think of it as keeping track of your steps. It can also serve to help you backtrack and find things that have helped you learn more on a subject. It can also be a good way to just take notes about what you've been learning. Now click that big blue button and get started!"
              }
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
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={(ev) => {
            history.push('/create');
          }}
        >
          New Entry
        </Button>
      </CardActions>
    </Card>
  );
};
