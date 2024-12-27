import { Schema } from "express-validator";

export const GET_USER_SCHEMA: Schema = {
  id: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "id must be an integer greather than 1",
    },
    notEmpty: { errorMessage: "id is required" },
  },
};
