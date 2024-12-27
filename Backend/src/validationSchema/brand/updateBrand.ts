import { Schema } from "express-validator";

export const UPDATE_BRAND_SCHEMA: Schema = {
  id: {
    isInt: {
      errorMessage: "id must be an integer greater than 0",
      options: { min: 1 },
    },
    notEmpty: { errorMessage: "id is required" },
    in: ["params"],
  },
  name: {
    isString: { errorMessage: "name must be a string" },
    notEmpty: { errorMessage: "name is required" },
    isLength: {
      options: {
        max: 100,
        min: 1,
      },
      errorMessage: "name must be less than 100 and greater than 0 characters",
    },
  },
};
