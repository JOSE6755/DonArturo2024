import { Schema } from "express-validator";

export const UPDATE_ORDER_STATE_SCHEMA: Schema = {
  id: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "id must be a number greater than 0",
    },
    notEmpty: {
      errorMessage: "id is required",
    },
    in: ["params"],
  },
  stateId: {
    isInt: {
      options: {
        min: 3,
        max: 5,
      },
      errorMessage: "stateId must be a number between 3 and 5",
    },
    notEmpty: { errorMessage: "stateId is required" },
  },
};
