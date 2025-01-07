import { Schema } from "express-validator";

export const GET_ORDER_DETAIL_SCHEMA: Schema = {
  id: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "id must be a number greather than 0",
    },
    notEmpty: {
      errorMessage: "id is required",
    },
  },
};
