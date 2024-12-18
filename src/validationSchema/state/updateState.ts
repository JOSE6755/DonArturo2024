import { Schema } from "express-validator";

export const UPDATE_STATE_SCHEMA: Schema = {
  id: {
    isInt: {
      errorMessage: "id must be an integer greater than 0",
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: "id is required",
    },
    in: ["params"],
  },
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
