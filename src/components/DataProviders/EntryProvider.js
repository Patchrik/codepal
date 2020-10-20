import React, { useState, createContext } from 'react';

/*
    The context is imported and used by individual components
    that need data
*/
export const EntryContext = createContext();

/*
 This component establishes what data can be used.
 */
export const EntryProvider = (props) => {
  const [entries, setEntries] = useState([]);

  const getEntries = () => {
    return fetch('http://localhost:8088/entries')
      .then((res) => res.json())
      .then(setEntries);
  };

  const addEntry = (entryObj) => {
    return fetch('http://localhost:8088/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryObj),
    }).then(getEntries);
  };

  const DeleteEntry = (entryId) => {
    return fetch(`http://localhost:8088/entries/${entryId}`, {
      method: 'DELETE',
    }).then(getEntries);
  };

  const UpdateEntry = (entry) => {
    return fetch(`http://localhost:8088/entries/${entry.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    }).then(getEntries);
  };

  const getEntryById = (id) => {
    return fetch(`http://localhost:8088/entries/${id}`).then((res) =>
      res.json()
    );
  };

  /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
  return (
    <EntryContext.Provider
      value={{
        entries,
        getEntries,
        addEntry,
        getEntryById,
        UpdateEntry,
        DeleteEntry,
      }}
    >
      {props.children}
    </EntryContext.Provider>
  );
};
