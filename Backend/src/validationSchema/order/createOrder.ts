import { Schema } from "express-validator";

export const CREATE_ORDER_SCHEMA: Schema = {
  // Authorization: {
  //   notEmpty: {
  //     errorMessage: "Authorization header is required",
  //   },
  //   isJWT: { errorMessage: "provide a valid token" },
  //   in: ["headers"],
  // },
  total: {
    isFloat: {
      options: {
        gt: 0,
      },
      errorMessage: "total must be a numer greather than 0",
    },
    notEmpty: { errorMessage: "total is required" },
  },
};
