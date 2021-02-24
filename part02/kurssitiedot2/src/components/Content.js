import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

export default Content;
