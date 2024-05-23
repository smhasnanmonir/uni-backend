export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: "inProcessing" | "blocked";
  isDeleted: boolean;
};

export type newUser = {
  password: string;
  role: string;
  id: string;
};
