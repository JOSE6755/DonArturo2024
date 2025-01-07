import { date, number, object, string } from "yup";

export const UPDATE_USER_VALIDATION_SCHEMA = object({
  names: string().required("Names is required"),
  lastNames: string().required("Last names is required"),
  email: string().required("Email is required").email("email not valid"),
  phoneNumber: string()
    .required("Phone is required")
    .min(8, "Phone must be 8 characters")
    .length(8, "Phone must be 8 characters")
    .matches(/^[0-9]{8}$/, "Phone number must be only numbers"),

  birthDate: date()
    .required("Birth Date is required")
    .max(minDate(), "You must be at least 18 years old"),
  address: string().required("Address is required"),
  roleId: number()
    .required("Role Id is required")
    .integer("Role Id must be an integer")
    .min(1, "Role Id must not be none")
    .max(2, "Role Id must be either User or Operator"),
});

function minDate() {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  console.log(today);
  return today;
}
