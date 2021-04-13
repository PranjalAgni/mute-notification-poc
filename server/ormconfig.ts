/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path");

const resolvePath = (tag: string) => {
  const baseDir = process.env.NODE_ENV === "production" ? "dist" : "src";
  return join(__dirname, `${baseDir}/${tag}`, "*.{ts,js}");
};

module.exports = {
  name: "default",
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  logging: true,
  database: "notifications",
  entities: [resolvePath("entities")],
  migrations: [resolvePath("migrations")],
  subscribers: [resolvePath("subscribers")]
};
