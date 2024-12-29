import { object, string } from "yup";
export const LOGIN_VALIDATOR_SCHEMA = object({
  email: string().required("email is required").email("not valid email"),
  password: string().required("password is required"),
}).required();
