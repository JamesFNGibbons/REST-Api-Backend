import { Customer } from "./customer.interface";
import { SiteAddress } from "./site-address.interface";

export interface Report {
  
  creator: String,
  jobNumber: string,

  price: Number,
  startDate: Date,
  endDate: Date,

  description: String,

  customer: Customer,
  address: SiteAddress

}
