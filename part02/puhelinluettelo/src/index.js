import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import List from "./components/List";
import Form from "./components/Form";
import axios from "axios";

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
      id: newName,
    };
    if (persons.find((object) => object.name === newName) === undefined) {
      setPersons(persons.concat(personObject));
    } else {
      window.alert("${newName} is already added to phonebook");
    }
    setNewName("");
    setNewNumber("");
  };
  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
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
      <List persons={persons} searchWith={searchWith} />
    </div>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
