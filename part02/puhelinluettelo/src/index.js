import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import List from "./components/List";
import Form from "./components/Form";
import Notification from "./components/Notification";
import personsService from "./services/persons";
import "./index.css";

const notificationHelper = (props) => {
  props.setErrorMsg(props.message);
  setTimeout(() => {
    props.setErrorMsg((errorMsg[0] = null));
    props.setErrorMsg((errorMsg[1] = false));
  }, 5000);
};

const App = () => {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchWith, setSearchWith] = useState("");
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState([]);
  const [newNumber, setNewNumber] = useState([]);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchWith(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: `${newName}${newNumber}`,
    };
    const person = persons.find((object) => object.name === newName);
    if (!person) {
      setPersons(persons.concat(personObject));
      personsService.create(personObject);
      setErrorMsg(`Added ${personObject.name} to the phonebook.`);
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    } else {
      const foundObject = persons.find((object) => object.name === newName);
      if (foundObject.number === newNumber) {
      } else if (
        window.confirm(
          `Are you sure you want to change the number for ${foundObject.name}?`
        )
      ) {
        const newList = persons;
        newList.find((person) => person.name === personObject.name).number =
          personObject.number;
        setPersons(newList);
        personsService.update(foundObject.id, foundObject).catch((error) => {
          setIsError(true);
          setErrorMsg(`${foundObject.name} has already been removed!`);
          setTimeout(() => {
            setErrorMsg(null);
            setIsError(false);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== foundObject.id));
        });
        setErrorMsg(`Changed ${foundObject.name}'s number succesfully.`);
        setTimeout(() => {
          setErrorMsg(null);
        }, 5000);
      }
    }
    setNewName("");
    setNewNumber("");
  };
  const hook = () => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  };
  useEffect(hook, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={errorMsg}
        isError={isError}
        setErrorMsg={setErrorMsg}
      />
      filter shown with{" "}
      <input value={searchWith} onChange={handleSearchChange} />
      <div>
        <h2>Add new contact</h2>
        <Form
          newName={newName}
          newNumber={newNumber}
          addPerson={addPerson}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />
      </div>
      <h2>Numbers</h2>
      <List
        persons={persons}
        searchWith={searchWith}
        setPersons={setPersons}
        setErrorMsg={setErrorMsg}
      />
    </div>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
