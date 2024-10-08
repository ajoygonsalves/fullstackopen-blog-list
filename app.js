const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blogRouter");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const userRouter = require("./routes/userRouter");
const loginRouter = require("./controllers/login");
const testingRouter = require("./routes/testingRouter");

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
app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", userRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}

app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
