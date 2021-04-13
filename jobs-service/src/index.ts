import "reflect-metadata";
import initalizeApp from "./app";

const startServer = async () => {
  await initalizeApp();
};

startServer();
