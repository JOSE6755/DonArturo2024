import { Schema } from "express-validator";

export const UPDATE_CATEGORY_STATE_SCHEMA: Schema = {
  stateId: {
    isInt: {
      errorMessage: "stateId must be and integer and between 1 and 2",
      options: {
        min: 1,
        max: 2,
      },
    },
    notEmpty: { errorMessage: "stateId is required" },
  },
  id: {
    isInt: {
      errorMessage: "id must be an integer greater than 0",
      options: { min: 1 },
    },
    notEmpty: { errorMessage: "id is required" },
    in: ["params"],
  },
};
