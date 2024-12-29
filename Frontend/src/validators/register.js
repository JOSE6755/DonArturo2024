import { date, number, object, ref, string } from "yup";

export const REGISTER_VALIDATION_SCHEMA = object({
  names: string().required("Names is required"),
  lastNames: string().required("Last names is required"),
  email: string().required("Email is required").email("email not valid"),
  phoneNumber: string()
    .required("Phone is required")
    .min(8, "Phone must be 8 characters")
    .length(8, "Phone must be 8 characters")
    .matches(/^[0-9]{8}$/, "Phone number must be only numbers"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: string()
    .required("Confirm Password is required")
    .oneOf(
      [ref("password")],
      "ConfirmPassword does not match with Password field"
    ),
  birthDate: date()
    .required("Birth Date is required")
    .max(minDate(), "You must be at least 18 years old"),
  address: string().required("Address is required"),
  roleId: number()
    .required("Role Id is required")
    .integer("Role Id must be an integer")
    .min(1, "Role Id must be at least 1")
    .max(2, "Role Id must be maximum 2"),
});

function minDate() {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  console.log(today);
  return today;
}
