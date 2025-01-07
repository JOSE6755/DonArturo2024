import { Schema } from "express-validator";

export const UPDATE_USER_SCHEMA: Schema = {
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
  names: {
    isString: { errorMessage: "names must be a string" },
    notEmpty: { errorMessage: "names is required" },
    isLength: {
      options: {
        max: 100,
        min: 1,
      },
      errorMessage: "names must be greater than 0 and less than 100 characters",
    },
  },
  lastNames: {
    isString: { errorMessage: "lastNames must be a string" },
    notEmpty: { errorMessage: "lasTNames is required" },
    isLength: {
      options: {
        max: 100,
        min: 1,
      },
      errorMessage: "lasTNames must be greater than 0 and less than 100 characters",
    },
  },
  email: {
    isString: { errorMessage: "email must be a string" },
    notEmpty: { errorMessage: "email is required" },
    isLength: {
      options: {
        max: 100,
        min: 1,
      },
      errorMessage: "email must be greater than 0 and less than 100 characters",
    },
    trim: true,
    isEmail: { errorMessage: "this email is not valid" },
  },

  phoneNumber: {
    isString: { errorMessage: "phone number must be a string" },
    notEmpty: { errorMessage: "phoneNumber is required" },
    trim: true,
    isLength: {
      options: {
        min: 8,
        max: 8,
      },
      errorMessage: "phoneNumber must be exactly 8 characters",
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
      errorMessage: "address must be greater than 0 and less than 250 characters",
    },
  },
  roleId: {
    isInt: {
      errorMessage: "roleId must be an integer between 1 and 2",
      options: {
        min: 1,
        max: 2,
      },
    },
    notEmpty: { errorMessage: "roleId is required" },
  },
  clientId: {
    isInt: {
      errorMessage: "clientId must be an integer greater than 1",
      options: {
        min: 1,
      },
    },
    optional: true,
  },
};
