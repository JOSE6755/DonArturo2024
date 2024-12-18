"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_CATEGORY_STATE_SCHEMA = void 0;
exports.UPDATE_CATEGORY_STATE_SCHEMA = {
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
//# sourceMappingURL=updateCategoryState.js.map