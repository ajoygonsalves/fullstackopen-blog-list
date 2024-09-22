const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

main();

async function main() {
  try {
    app.listen(config.PORT, (e) => {
      logger.info(`Server is running on PORTUS MAXIMUS ${config.PORT}!`);
      if (process.env.NODE_ENV === "test") {
        logger.info("Running in test mode");
      }
    });
  } catch (error) {
    logger.info("Error in index.js: ", error);
  }
}
