import Person from "./Person";
import personsService from "../services/persons";

const List = (props) => {
  const deleteAndUpdate = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      const newList = props.persons.filter((p) => p.id !== person.id);
      personsService.deletePerson(person.id);
      props.setPersons(newList);
      props.notificationHelper(
        `Deleted ${person.name}'s number succesfully.`,
        "green"
      );
    }
  };
  return (
    <div>
      {props.persons
        .filter((person) =>
          person.name.toLowerCase().includes(props.searchWith.toLowerCase())
        )
        .map((person) => (
          <div key={person.id} className="personListing">
            <Person key={person.id} {...person} className="person" />{" "}
            &nbsp;&nbsp;
            <button
              className="button"
              key={`${person.id}button`}
              onClick={() => deleteAndUpdate(person)}
            >
              delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default List;
