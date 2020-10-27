import Chip from '@material-ui/core/Chip';
import React from 'react';

export const TagSelector = ({ tag, handleClickTag, handleDeleteTag }) => {
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
    />
  );
};
