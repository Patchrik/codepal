import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EntryCard.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export const EntryCard = ({ entry }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {entry.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* {entry.entryText} */}
            <CKEditor
              className="textReader"
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
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/details/${entry.id}`}>
          <Button size="small" color="primary">
            Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
