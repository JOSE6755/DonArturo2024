"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_PRODUCT_SCHEMA = void 0;
exports.CREATE_PRODUCT_SCHEMA = {
    "productInfo.name": {
        isString: { errorMessage: "name must be a string" },
        notEmpty: { errorMessage: "name is required" },
        isLength: {
            options: {
                max: 100,
            },
            errorMessage: "Name must be less than 100 characters",
        },
        trim: true,
    },
    "productInfo.code": {
        isString: { errorMessage: "code must be a string" },
        notEmpty: { errorMessage: "code is required" },
        isLength: {
            options: {
                max: 50,
            },
            errorMessage: "Code must be less than 50 characters",
        },
    },
    "productInfo.stock": {
        isInt: {
            errorMessage: "stock must be an integer greater than or equal 0",
            options: { min: 0 },
        },
        notEmpty: { errorMessage: "stock is required" },
    },
    "productInfo.price": {
        isFloat: {
            errorMessage: "price must be a float greater than or equal 0",
            options: { min: 0 },
        },
        notEmpty: { errorMessage: "price is required" },
    },
    "productInfo.stateId": {
        isInt: {
            errorMessage: "stateId must be an integer between 1 and 5",
            options: { min: 1, max: 5 },
        },
        notEmpty: { errorMessage: "stateId is required" },
    },
    "productInfo.brandId": {
        isInt: {
            errorMessage: "brandId must be an integer greater than or equal to 1",
            options: { min: 1 },
        },
        notEmpty: { errorMessage: "brandId is required" },
    },
    "productInfo.categories": {
        isArray: {
            errorMessage: "categories must be an array",
            options: {
                min: 1,
            },
        },
        notEmpty: { errorMessage: "categories is required" },
    },
    "productInfo.categories.*": {
        isInt: {
            errorMessage: "each category must be an integer greather than 0",
            options: {
                min: 1,
            },
        },
    },
};
//# sourceMappingURL=createProduct.js.map