import { UUID } from "crypto";

export default interface ICourseData {
  courseData: {
    id: UUID;
    name: string;
    courseCode: string;
    creditHours: Number;
    ects: Number;
  };
}
