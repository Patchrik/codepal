import React, { useState, createContext } from 'react';

/*
    The context is imported and used by individual components
    that need data
*/
export const EntryTagContext = createContext();

/*
 This component establishes what data can be used.
 */
export const EntryTagProvider = (props) => {
  const [entryTags, setEntryTags] = useState([]);

  const [FilteredTagEntries, setFilteredTagEntries] = useState([]);

  const getEntryTags = () => {
    return fetch('http://localhost:8088/entryTags')
      .then((res) => res.json())
      .then(setEntryTags);
  };

  const addEntryTag = (EntryTagObj) => {
    return fetch('http://localhost:8088/entryTags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(EntryTagObj),
    }).then(getEntryTags);
  };

  const DeleteEntryTagById = (EntryTagsObj) => {
    return fetch(`http://localhost:8088/entryTags/${EntryTagsObj}`, {
      method: 'DELETE',
    }).then(getEntryTags);
  };

  const getEntryTagsByEntryId = async (entryIdFromParams) => {
    const res = await fetch(
      'http://localhost:8088/entryTags?_expand=tag&_expand=entry'
    );
    const value = await res.json();
    debugger;
    const sortedValue = value.filter(
      (entryTag) => parseInt(entryTag.entryId) === parseInt(entryIdFromParams)
    );
    return setFilteredTagEntries(sortedValue);
  };

  /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
  return (
    <EntryTagContext.Provider
      value={{
        entryTags,
        getEntryTags,
        addEntryTag,
        DeleteEntryTagById,
        FilteredTagEntries,
        getEntryTagsByEntryId,
      }}
    >
      {props.children}
    </EntryTagContext.Provider>
  );
};
