import "reflect-metadata";
import initalizeApp from "./app";

const startServer = async () => {
  const app = await initalizeApp();

  process.env.NODE_ENV = process.env.NODE_ENV || "development";

  app.listen(5000, () => {
    console.log(
      `Server running at http://localhost:5000 in ${process.env.NODE_ENV} mode`
    );
  });
};

startServer();
