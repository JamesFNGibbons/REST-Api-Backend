import { Customer } from "./customer.interface";

export interface Report {
  
  customer: Customer,
  creator: String,
  
  price: Number,
  startDate: Date,
  endDate: Date,

  description: String

}
