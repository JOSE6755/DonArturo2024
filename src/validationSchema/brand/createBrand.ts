import { Schema } from "express-validator";

export const CREATE_BRAND_SCHEMA: Schema = {
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
