import React, { useState, createContext } from 'react';

/*
    The context is imported and used by individual components
    that need data
*/
export const UserContext = createContext();

/*
 This component establishes what data can be used.
 */
export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    return fetch('http://localhost:8088/users')
      .then((res) => res.json())
      .then(setUsers);
  };

  const addUser = (UserObj) => {
    return fetch('http://localhost:8088/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(UserObj),
    }).then(getUsers);
  };

  const DeleteUser = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`, {
      method: 'DELETE',
    }).then(getUsers);
  };

  const UpdateUser = (user) => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(getUsers);
  };

  const getUserById = (id) => {
    return fetch(`http://localhost:8088/users/${id}`).then((res) => res.json());
  };

  /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        addUser,
        getUserById,
        UpdateUser,
        DeleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
