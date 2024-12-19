import express, { Application } from "express";
import cors from "cors";

import { routes } from "../routes";
import { db } from "../database/config";
import path from "path";
export class Server {
  private app: Application;
  private port: number = Number(process.env.PORT) || 3000;
  private basePath: string;
  constructor() {
    this.basePath = "/api/v1";
    this.app = express();
    this.middlewares();

    this.routes();
  }

  private routes(): void {
    this.app.use(`${this.basePath}/category`, routes.categoryRouter);
    this.app.use(`${this.basePath}/products`, routes.productsRouter);
    this.app.use(`${this.basePath}/states`, routes.stateRouter);
    this.app.use(`${this.basePath}/brands`, routes.brandRouter);
    this.app.use(`${this.basePath}/clients`, routes.clientRouter);
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use("/productImage", express.static(path.join(__dirname, "../productImage")));
  }

  private async dbConnection(): Promise<void> {
    try {
      await db.authenticate();
      console.info("Authenticated");
      await db.sync();
    } catch (error) {
      console.error(error);
    }
  }

  public async start(): Promise<string | Error> {
    try {
      await this.dbConnection();
      this.app.listen(this.port);
      return `Server started on ${this.port}`;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
      return new Error("An error ocurred during server startup");
    }
  }
}
