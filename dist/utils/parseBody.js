"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBodyToJson = parseBodyToJson;
const fs_1 = __importDefault(require("fs"));
function parseBodyToJson(req, res, next) {
    try {
        if (!req.body.productInfo) {
            res.status(400).json({ msg: "Missing productInfo param in multipart/form-data" });
            return;
        }
        const body = JSON.parse(req.body.productInfo);
        req.body.productInfo = body;
        next();
    }
    catch (error) {
        if (req.file) {
            fs_1.default.promises.unlink(req.file.path).catch(() => {
                console.log(error.message);
            });
        }
        res.status(500).json({ msg: "Error parsing body to JSON: " + error.message });
        return;
    }
}
//# sourceMappingURL=parseBody.js.map