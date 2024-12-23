"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_STATE_PRODUCT_SCHEMA = void 0;
exports.UPDATE_STATE_PRODUCT_SCHEMA = {
    id: {
        isInt: {
            options: {
                min: 1,
            },
            errorMessage: "Product id must be greater than or equal to 1",
        },
        notEmpty: { errorMessage: "id url param is required" },
        in: ["params"],
    },
    stateId: {
        isInt: {
            options: {
                min: 1,
                max: 2,
            },
            errorMessage: "Product id must be between 1 and 2",
        },
        notEmpty: { errorMessage: "stateId is required" },
        in: ["body"],
    },
};
//# sourceMappingURL=updateStateProduct.js.map