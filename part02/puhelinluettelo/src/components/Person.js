const Person = (props) => (
  <div key={props.id}>
    {props.name} {props.number}
  </div>
);

export default Person;
