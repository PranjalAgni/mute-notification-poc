import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createConnection } from "typeorm";
import router from "./api";
import { errorHandler, notFound } from "./middlewares";

const initalizeApp = async (): Promise<express.Application> => {
  const app: express.Application = express();

  const db = await createConnection();
  console.log("DB connected");
  await db.synchronize();
  console.log("DB synced");

  // If we are behind some reverse proxy like Nginx then we can trust this X-Forwarded-For header
  // Read More: https://stackoverflow.com/questions/39930070/nodejs-express-why-should-i-use-app-enabletrust-proxy
  app.enable("trust proxy");

  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(morgan("combined"));

  // for health checks
  app.get("/", (req, res) => {
    return res.json({ health: "Active" });
  });

  app.use("/api", router);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default initalizeApp;
