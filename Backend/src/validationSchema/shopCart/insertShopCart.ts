import { Schema } from "express-validator";

export const INSERT_SHOPCART_SCHEMA: Schema = {
  quantity: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "quantity must be an integer greather than 0",
    },
    notEmpty: {
      errorMessage: "quantity is required",
    },
  },
  price: {
    isFloat: {
      options: {
        gt: 0,
      },
      errorMessage: "price must be a number greather than 0",
    },
    notEmpty: {
      errorMessage: "price is required",
    },
  },
  subTotal: {
    isFloat: {
      options: {
        gt: 0,
      },
      errorMessage: "subTotal must be a number greather than 0",
    },
    notEmpty: {
      errorMessage: "subTotal is required",
    },
  },
  id: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "shopCartId must be a number greather than 0",
    },
    notEmpty: {
      errorMessage: "shopCartId is required",
    },
    in: ["params"],
  },
  productId: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "productId must be a number greather than 0",
    },
    notEmpty: { errorMessage: "productId is required" },
  },
};
