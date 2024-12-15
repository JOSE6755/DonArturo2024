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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const products_1 = require("../routes/products");
const config_1 = require("../database/config");
class Server {
    constructor() {
        this.port = Number(process.env.PORT) || 3000;
        this.basePath = "/api/v1";
        this.app = (0, express_1.default)();
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    routes() {
        this.app.use(`${this.basePath}/products`, products_1.router);
        return;
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.db.authenticate();
                console.info("Authenticated");
                config_1.db.sync();
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    start() {
        this.app.listen(this.port, () => {
            console.info(`Server started on ${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map