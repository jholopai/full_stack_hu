import Person from "./Person";

const List = (props) => (
  <div>
    {props.persons
      .filter((person) =>
        person.name.toLowerCase().includes(props.searchWith.toLowerCase())
      )
      .map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
  </div>
);

export default List;
