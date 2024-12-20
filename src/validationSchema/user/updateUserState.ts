import { Schema } from "express-validator";

export const UPDATE_USER_STATE_SCHEMA: Schema = {
  id: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "id must be an integer greater than 0",
    },
    notEmpty: { errorMessage: "id is required" },
    in: ["params"],
  },
  stateId: {
    isInt: {
      options: {
        min: 1,
        max: 2,
      },
      errorMessage: "id must be an integer between 1 and 2",
    },
    notEmpty: { errorMessage: "id is required" },
  },
};
