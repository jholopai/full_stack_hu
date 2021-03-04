import Person from "./Person";
import personsService from "../services/persons";

const List = (props) => {
  const deleteAndUpdate = (id) => {
    const newList = props.persons.filter((person) => person.id !== id);
    personsService.deletePerson(id);
    props.setPersons(newList);
  };
  return (
    <div>
      {props.persons
        .filter((person) =>
          person.name.toLowerCase().includes(props.searchWith.toLowerCase())
        )
        .map((person) => (
          <p>
            <Person {...person} />
            <button key={person.id} onClick={() => deleteAndUpdate(person.id)}>
              delete
            </button>
          </p>
        ))}
    </div>
  );
};

export default List;
