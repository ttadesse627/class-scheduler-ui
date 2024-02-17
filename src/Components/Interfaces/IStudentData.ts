import { UUID } from "crypto";

export default interface IStudentData {
  isError?: boolean;
  errorsOrEmptyList?: string[];
  errors?: string[];
  value?: {
    id: UUID;
    firstName: string;
    middleName: string;
    lastName: string;
    birthDate: string;
  }[];
  firstError?: {
    code: string;
    description: string;
    type: number;
    numericType: number;
    metadata: {};
  };
}
