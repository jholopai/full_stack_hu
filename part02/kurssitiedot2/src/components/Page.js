import Course from "./Course";

const Page = (props) => (
  <div>
    {props.courses.map((course) => (
      <Course key={course.id} course={course} />
    ))}
  </div>
);

export default Page;
