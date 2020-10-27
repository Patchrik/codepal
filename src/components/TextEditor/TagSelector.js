import Chip from '@material-ui/core/Chip';

export const TagSelector = ({ tag }) => {
  const handleDeleteTag = (tag) => {
    console.info('You clicked the delete icon.');
    tag.isSelected = false;
    console.log('this should now be false', tag.isSelected);
  };

  const handleClickTag = (tag) => {
    console.log('This should be a tag obj', tag);
    tag.isSelected = true;
    console.log('this should now be true', tag.isSelected);
  };
  return (
    <Chip
      size="small"
      label={tag.name}
      color={tag.isSelected ? 'primary' : 'default'}
      onClick={() => {
        handleClickTag(tag);
      }}
      onDelete={() => {
        handleDeleteTag(tag);
      }}
    />
  );
};
