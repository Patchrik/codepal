import React, { useState, createContext } from 'react';

/*
    The context is imported and used by individual components
    that need data
*/
export const TestContext = createContext();

/*
 This component establishes what data can be used.
 */
export const TestProvider = (props) => {
  const [tests, setTests] = useState([]);

  const getTests = () => {
    return fetch('http://localhost:8088/tests')
      .then((res) => res.json())
      .then(setTests);
  };

  const addTest = (testObj) => {
    return fetch('http://localhost:8088/tests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testObj),
    }).then(getTests);
  };

  const DeleteTest = (testId) => {
    return fetch(`http://localhost:8088/tests/${testId}`, {
      method: 'DELETE',
    }).then(getTests);
  };

  const UpdateTest = (test) => {
    return fetch(`http://localhost:8088/tests/${test.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(test),
    }).then(getTests);
  };

  const gettestById = (id) => {
    return fetch(`http://localhost:8088/tests/${id}`).then((res) => res.json());
  };

  /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
  return (
    <TestContext.Provider
      value={{
        tests,
        getTests,
        addTest,
        gettestById,
        UpdateTest,
        DeleteTest,
      }}
    >
      {props.children}
    </TestContext.Provider>
  );
};
