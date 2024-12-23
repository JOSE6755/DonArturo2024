"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAllParams = validateAllParams;
const express_validator_1 = require("express-validator");
const fs_1 = __importDefault(require("fs"));
function validateAllParams(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            try {
                if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
                    yield fs_1.default.promises.unlink(req.file.path);
                }
                res.status(400).json(errors);
                return;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            catch (error) {
                res.status(500).json({
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    msg: `Deleting file ${(_b = req.file) === null || _b === void 0 ? void 0 : _b.path} failed: ${error.message}`,
                });
                return;
            }
        }
        next();
    });
}
//# sourceMappingURL=validateAllParams.js.map