"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_CATEGORY_SCHEMA = void 0;
exports.CREATE_CATEGORY_SCHEMA = {
    name: {
        isString: { errorMessage: "name must be a string" },
        notEmpty: { errorMessage: "name is required" },
        isLength: {
            options: {
                max: 100,
                min: 1,
            },
            errorMessage: "name must be less than 100 and greater than 0 characters",
        },
    },
};
//# sourceMappingURL=createCategory.js.map