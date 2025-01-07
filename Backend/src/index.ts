import dotenv from "dotenv";
dotenv.config();
import { Server } from "./models/server";

const server = new Server();

server
  .start()
  .then((x) => {
    console.log(x);
  })
  .catch((err) => {
    console.log(err);
  });
