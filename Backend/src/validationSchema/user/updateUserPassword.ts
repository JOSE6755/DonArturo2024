import { Schema } from "express-validator";

export const UPDATE_USER_PASSWORD_SCHEMA: Schema = {
  id: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "id must be greater than 0",
    },
    notEmpty: { errorMessage: "id is required" },
    in: ["params"],
  },
  password: {
    isString: { errorMessage: "password must be a string" },
    notEmpty: { errorMessage: "password is required" },
    trim: true,
    isLength: {
      options: {
        max: 100,
        min: 8,
      },
      errorMessage: "password must be either greater or equal than 8 and less than 100 characters",
    },
  },
};
