import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import List from "./components/List";
import Form from "./components/Form";
import Notification from "./components/Notification";
import personsService from "./services/persons";
import "./index.css";

const App = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isError, setIsError] = useState(false);
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
  const notificationHelper = (message) => {
    setErrorMsg(`${message}`);
    setTimeout(() => {
      setErrorMsg(null);
    }, 5000);
  };
  const addPerson = (personObject) => {
    setPersons(persons.concat(personObject));
    personsService.create(personObject);
    notificationHelper(`Added ${personObject.name} to the phonebook.`);
  };
  const updatePerson = (personObject) => {
    const newList = persons;
    newList.find((person) => person.name === personObject.name).number =
      personObject.number;
    setPersons(newList);
    personsService.update(personObject.id, personObject).catch((error) => {
      setIsError(true);
      notificationHelper(`${personObject.name} has already been removed!`);
      setPersons(persons.filter((person) => person.id !== personObject.id));
    });
    notificationHelper(`Changed ${personObject.name}'s number succesfully.`);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: `${newName}${newNumber}`,
    };
    const person = persons.find((object) => object.name === newName);
    if (!person) {
      addPerson(personObject);
    } else {
      if (person.number === newNumber) {
        notificationHelper(
          `${person.name} has already been added with that number!`
        );
      } else if (
        window.confirm(
          `Are you sure you want to change the number for ${person.name}?`
        )
      ) {
        updatePerson(person);
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
      <Notification message={errorMsg} isError={isError} />
      filter shown with{" "}
      <input value={searchWith} onChange={handleSearchChange} />
      <div>
        <h2>Add new contact</h2>
        <Form
          newName={newName}
          newNumber={newNumber}
          handleFormSubmit={handleFormSubmit}
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
