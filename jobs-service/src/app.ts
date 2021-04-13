import { createConnection } from "typeorm";

import { checkAndMarkStatusAsActive } from "./jobs/status";

const initalizeApp = async (): Promise<void> => {
  const db = await createConnection();
  console.log("DB connected");

  const TIME_INTERVAL = 5 * 1000;
  setInterval(async () => {
    try {
      console.time("status");
      const rows = await checkAndMarkStatusAsActive();
      console.timeEnd("status");
      if (rows) console.log("Updated successfully: ", rows);
    } catch (ex) {
      console.error("Error occurred: ", ex);
    }
  }, TIME_INTERVAL);
};

export default initalizeApp;
