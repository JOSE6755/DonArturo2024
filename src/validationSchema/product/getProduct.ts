import { Schema } from "express-validator";

export const GET_PRODUCT_SCHEMA: Schema = {
  price: {
    optional: true,
    isString: { errorMessage: "price query must be a string" },
    //notEmpty: { errorMessage: "price query is required" },
    isIn: { errorMessage: "incorrect price query value ['ASC','DESC']", options: [["DESC", "ASC"]] },
    default: { options: "DESC" },
    in: ["query"],
  },
  name: {
    optional: true,
    isString: { errorMessage: "name query must be a string" },
    //notEmpty: { errorMessage: "name query is required" },
    default: { options: "%%" },
    in: ["query"],
  },
  page: {
    optional: true,
    isInt: {
      errorMessage: "page query must be an integer greater than 0",
      options: {
        min: 1,
      },
    },
    //notEmpty: { errorMessage: "page query is required" },
    default: { options: 1 },
    in: ["query"],
  },
  size: {
    optional: true,
    isInt: {
      errorMessage: "size query must be an integer at least 5 and maximum 10",
      options: {
        min: 5,
        max: 10,
      },
    },
    //notEmpty: { errorMessage: "size query is required" },
    default: { options: 10 },
    in: ["query"],
  },
  categories: {
    optional: true,
    isString: { errorMessage: "categories query must be a string" },
    //notEmpty: { errorMessage: "categories query is required" },
    matches: {
      errorMessage: "categories query must be a list of numbers separated by commas",
      options: /^\d+(,\d+)*$/,
    },
    default: { options: "" },
    in: ["query"],
  },
};
