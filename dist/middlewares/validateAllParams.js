"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAllParams = validateAllParams;
const express_validator_1 = require("express-validator");
const fs_1 = __importDefault(require("fs"));
function validateAllParams(req, res, next) {
    var _a, _b;
    const errors = (0, express_validator_1.validationResult)(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        try {
            if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
                fs_1.default.promises.unlink(req.file.path);
                res.status(400).json(errors);
                return;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            res.status(500).json({
                msg: `Deleting file ${(_b = req.file) === null || _b === void 0 ? void 0 : _b.path} failed: ${error.message}`,
            });
        }
    }
    next();
}
//# sourceMappingURL=validateAllParams.js.map