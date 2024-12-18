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
const routes_1 = require("../routes");
const config_1 = require("../database/config");
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.port = Number(process.env.PORT) || 3000;
        this.basePath = "/api/v1";
        this.app = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    routes() {
        this.app.use(`${this.basePath}/category`, routes_1.routes.categoryRouter);
        this.app.use(`${this.basePath}/products`, routes_1.routes.productsRouter);
        this.app.use(`${this.basePath}/states`, routes_1.routes.stateRouter);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use("/productImage", express_1.default.static(path_1.default.join(__dirname, "../productImage")));
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.db.authenticate();
                console.info("Authenticated");
                yield config_1.db.sync();
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dbConnection();
                this.app.listen(this.port);
                return `Server started on ${this.port}`;
            }
            catch (error) {
                if (error instanceof Error) {
                    return error;
                }
                return new Error("An error ocurred during server startup");
            }
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map