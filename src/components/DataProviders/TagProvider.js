import React, { useState, createContext } from 'react';

/*
    The context is imported and used by individual components
    that need data
*/
export const TagsContext = createContext();

/*
 This component establishes what data can be used.
 */
export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);

  const getTags = async () => {
    const res = await fetch('http://localhost:8088/tags');
    const value = await res.json();
    setTags(value);
    return value;
  };

  const addTag = (tagsObj) => {
    return fetch('http://localhost:8088/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tagsObj),
      // Probably don't need the getTags call on the end of this.
    }).then((res) => res.json());
  };

  const DeleteTagsById = (tagsId) => {
    return fetch(`http://localhost:8088/tags/${tagsId}`, {
      method: 'DELETE',
    }).then(getTags);
  };

  const getTagById = async (id) => {
    const res = await fetch(`http://localhost:8088/tags/${id}`);
    return await res.json();
  };

  /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
  return (
    <TagsContext.Provider
      value={{
        tags,
        getTags,
        addTag,
        getTagById,
        DeleteTagsById,
      }}
    >
      {props.children}
    </TagsContext.Provider>
  );
};
