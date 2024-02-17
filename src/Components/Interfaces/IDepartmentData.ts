import { UUID } from "crypto";
import ICourseData from "./ICourseData";

export default interface IDepartmentData {
  departmentData: {
    id: UUID;
    name: string;
    shortName: string;
    numberOfSemisters: Number;
    currentSemister: Number;
    Courses?: ICourseData[];
  };
}
