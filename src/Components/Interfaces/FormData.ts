import { UUID } from "crypto";


// Lookup interfaces
export interface ILookupData {
  isError?: any;
  errorsOrEmptyList?: any;
  errors?: any;
  lookupProps?: {
    id: UUID;
    category: string;
    value: string;
  }[];
  firstError?: {
    code: string;
    description: string;
    type: number;
    numericType: number;
    metadata: {};
  };
}


// Department interfaces

export interface IDepartmentData {
  departmentData: {
    id: UUID | undefined;
    name: string;
    shortName: string;
    numberOfSemisters: Number;
    currentSemister: Number;
    Courses?: ICourseData["courseData"][];
  };
}


// Course interfaces

export interface ICourseData {
  courseData: {
    id?: UUID;
    name: string;
    courseCode: string;
    creditHours: Number;
    ects: Number;
    departmentName?: string;
  };
}
export interface ICourseForm {
  courseForm: {
    courses: {
      id?: UUID;
      name: string;
      courseCode: string;
      creditHours: Number;
      ects: Number;
    }[];
    departmentId?: string;
  };
}


// Room interfaces

export interface IRoomForm
{
  roomForm:{
    id?: UUID,
    roomNumber: string;
    blockNumber: string;
    roomType: string;
  }
}

export interface IRoomData
{
  roomData:{
    rooms: {
      id?: UUID,
      roomNumber: string;
      blockNumber: string;
      roomType: string;
    }[],
    departmentId?: string;
  }
}


// Student intefaces

export interface IStudentData {
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

