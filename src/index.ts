import "reflect-metadata";

import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { createConnection } from "typeorm";

import playerRoutes from "./routes/player.routes";

const app = express();
createConnection();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use(playerRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`server on port ${process.env.PORT}`);
});
