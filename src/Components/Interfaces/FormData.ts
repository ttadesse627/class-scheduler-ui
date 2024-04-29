

// Lookup interfaces
export interface ILookupData {
  isError?: any;
  errorsOrEmptyList?: any;
  errors?: any;
  lookupProps?: {
    id: string;
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
    id?: string;
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
    id?: string;
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
      id?: string;
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
    id?: string,
    roomNumber: string;
    blockNumber: string;
    roomType: string;
  }
}

export interface IRoomData
{
  roomData:{
    rooms: {
      id?: string,
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
    id: string;
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

