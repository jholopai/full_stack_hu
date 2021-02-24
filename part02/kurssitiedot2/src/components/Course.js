import Content from "./Content";
import Total from "./Total";

const Course = (props) => (
  <div>
    <h1>{props.course.name}</h1>
    <Content course={props.course} />
    <Total course={props.course} />
  </div>
);

export default Course;
