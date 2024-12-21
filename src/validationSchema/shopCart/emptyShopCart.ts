import { Schema } from "express-validator";

export const EMPTY_SHOPCART_SCHEMA: Schema = {
  id: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "id must be an integer greather than 1",
    },
    notEmpty: {
      errorMessage: "id is required",
    },
    in: ["params"],
  },
};
