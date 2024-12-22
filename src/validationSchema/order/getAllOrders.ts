import { Schema } from "express-validator";

export const GET_ALL_ORDERS_SCHEMA: Schema = {
  stateId: {
    isInt: {
      options: {
        min: 3,
        max: 5,
      },
      errorMessage: "stateId must be a number between 3 and 5",
    },
    notEmpty: {
      errorMessage: "stateId is required",
    },
    in: ["query"],
  },
};
