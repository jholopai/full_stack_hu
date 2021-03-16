import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import List from "./components/List";
import Form from "./components/Form";
import Notification from "./components/Notification";
import personsService from "./services/persons";
import "./index.css";

const App = () => {
  const [notificationMsg, setNotificationMsg] = useState({
    notification: null,
    notificationType: "green",
  });
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
  const notificationHelper = (message, color) => {
    setNotificationMsg({
      notification: `${message}`,
      notificationType: `${color}`,
    });
    setTimeout(() => {
      setNotificationMsg({ notification: null });
      setNotificationMsg({ notificationType: "green" });
    }, 5000);
  };
  const addPerson = (personObject) => {
    setPersons(persons.concat(personObject));
    personsService.create(personObject);
    notificationHelper(`Added ${personObject.name} to the phonebook.`, "green");
  };
  const updatePerson = (personObject) => {
    const newList = persons.map((person) => {
      if (person.id === personObject.id) {
        const updatedPerson = { ...personObject, number: newNumber };
        return updatedPerson;
      }
      return person;
    });
    setPersons(newList);
    personsService.update(personObject.id, personObject).catch((error) => {
      setNotificationMsg({ notificationType: "red" });
      notificationHelper(
        `${personObject.name} has already been removed!`,
        "red"
      );
      setPersons(persons.filter((person) => person.id !== personObject.id));
    });
    notificationHelper(
      `Changed ${personObject.name}'s number succesfully.`,
      "green"
    );
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
          `${person.name} has already been added with that number!`,
          "red"
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
      <Notification notificationMsg={notificationMsg} />
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
        notificationHelper={notificationHelper}
      />
    </div>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
