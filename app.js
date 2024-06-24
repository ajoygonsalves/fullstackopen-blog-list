const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blogRouter");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const userRouter = require("./routes/userRouter");

const mongoUrl = config.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoConnect();
async function mongoConnect() {
  await mongoose.connect(mongoUrl);
  logger.info("Mongo connected, comrade.");
}

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
