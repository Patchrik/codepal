import Chip from '@material-ui/core/Chip';
import React, { useContext } from 'react';
import { TagsContext } from '../DataProviders/TagProvider';

export const TagSelector = ({ tag, handleClickTag, handleDeleteTag }) => {
  const { DeleteTagsById } = useContext(TagsContext);
  return (
    <Chip
      size="small"
      label={tag.name}
      color={tag.isSelected ? 'primary' : 'default'}
      onClick={() => {
        if (tag.isSelected) {
          handleDeleteTag(tag);
        } else {
          handleClickTag(tag);
        }
      }}
      onDelete={() => {
        DeleteTagsById(tag.id);
      }}
    />
  );
};
