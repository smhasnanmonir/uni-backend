import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonth,
} from "./academicSemester.const";

export type TAcademicSemester = {
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode;
  year: string;
  startMonth: TMonth;
  endMonth: TMonth;
  timeStamp: Date;
};
