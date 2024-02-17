import { UUID } from "crypto";

export default interface ILookupData {
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
