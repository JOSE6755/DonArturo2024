import { Schema } from "express-validator";

export const GET_ALL_ORDERS_BY_USER_SCHEMA: Schema = {
  id: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "id must be a numer greather than 0",
    },
    notEmpty: {
      errorMessage: "id is required",
    },
    in: ["params"],
  },
};
