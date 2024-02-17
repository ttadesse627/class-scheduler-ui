import { UUID } from "crypto";

export default interface IAddress {
  subCity: string;
  zone: string;
  woreda: string;
  kebele: string;
  phoneNumber: string;
  houseNumber: string;
  officePhone: string;
  mobile: string;
  alternativePhone: string;
  fax: string;
  adress: string;
  postCode: string;
  email: string;
  website: string;
  regionId: UUID;
}
