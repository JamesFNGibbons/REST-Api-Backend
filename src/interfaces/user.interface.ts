import { Report } from "./report.interface";

export interface User {

  name: String,

  username: String,
  password: String,

  reports: Array<Report>,
  superUser: Boolean,

  created: Date

};
