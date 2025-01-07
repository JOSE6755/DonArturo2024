import { Schema } from "express-validator";

export const GET_SINGLE_PRODUCT_SCHEMA: Schema = {
  id: {
    isInt: {
      errorMessage: "id must be an integer greather than 0",
      options: {
        min: 1,
      },
    },
    notEmpty: { errorMessage: "id is required" },
    in: ["params"],
  },
};
