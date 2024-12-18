import { Schema } from "express-validator";

export const CREATE_STATE_SCHEMA: Schema = {
  name: {
    isString: { errorMessage: "name must be a string" },
    notEmpty: { errorMessage: "name is required" },
    isLength: {
      options: {
        min: 1,
        max: 50,
      },
      errorMessage: "name must be less or equal than 50 characters and greater than 0 characters",
    },
  },
};
