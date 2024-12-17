import express, { Application } from "express";
import cors from "cors";
import { router as productsRouter } from "../routes/products";
import { db } from "../database/config";
import path from "path";
export class Server {
  private app: Application;
  private port: number = Number(process.env.PORT) || 3000;
  private basePath: string;
  constructor() {
    this.basePath = "/api/v1";
    this.app = express();
    this.dbConnection();
    this.routes();
    this.middlewares();
  }

  private routes(): void {
    this.app.use(`${this.basePath}/products`, productsRouter);

    return;
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      "/productImage",
      express.static(path.join(__dirname, "../productImage")),
    );
  }

  private async dbConnection(): Promise<void> {
    try {
      await db.authenticate();
      console.info("Authenticated");
      db.sync();
    } catch (error) {
      console.error(error);
    }
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info(`Server started on ${this.port}`);
    });
  }
}
