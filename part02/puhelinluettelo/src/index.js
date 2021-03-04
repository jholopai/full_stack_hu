import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import List from "./components/List";
import Form from "./components/Form";
import personsService from "./services/persons";

const App = () => {
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
    };
    console.log(personObject);
    if (persons.find((object) => object.name === newName) === undefined) {
      setPersons(persons.concat(personObject));
      personsService.create(personObject);
    } else {
      const foundObject = persons.find((object) => object.name === newName);
      if (foundObject.number === newNumber)
        return window.alert(
          "${foundObject.name} is already added to the phonebook!"
        );
      else
        return window.alert(
          "${foundObject.name} is already added to the phonebook!"
        );
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
      <List persons={persons} searchWith={searchWith} setPersons={setPersons} />
    </div>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
