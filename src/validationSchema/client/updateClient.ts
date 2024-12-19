import { Schema } from "express-validator";

export const UPDATE_CLIENT_SCHEMA: Schema = {
  id: {
    isInt: {
      errorMessage: "id must be an integer greater than 0",
      options: { min: 1 },
    },
    notEmpty: { errorMessage: "id is required" },
    in: ["params"],
  },
  commercialName: {
    isString: { errorMessage: "commercialName must be a string" },
    notEmpty: { errorMessage: "commercialName is required" },
    isLength: {
      options: {
        min: 1,
        max: 100,
      },
      errorMessage: "commercialName must be greater than 0 and less than 100 characters",
    },
  },
  address: {
    isString: { errorMessage: "address must be a string" },
    notEmpty: { errorMessage: "address is required" },
    isLength: {
      options: {
        min: 1,
        max: 250,
      },
      errorMessage: "commercialName must be greater than 0 and less than 250 characters",
    },
  },
  phoneNumber: {
    isString: { errorMessage: "phoneNumber must be a string" },
    notEmpty: { errorMessage: "phoneNumber is required" },
    isLength: {
      options: {
        min: 8,
        max: 8,
      },
      errorMessage: "phoneNumber must be exactly 8 characters",
    },
  },
  commercialEmail: {
    isString: { errorMessage: "commercialEmail must be a string" },
    notEmpty: { errorMessage: "commercialEmail is required" },
    isLength: {
      options: {
        max: 100,
      },
      errorMessage: "commercialEmail must be less than 100 characters",
    },
    isEmail: {
      errorMessage: "commercialEmail is an invalid email",
      options: {
        allow_underscores: true,
      },
    },
  },
};
