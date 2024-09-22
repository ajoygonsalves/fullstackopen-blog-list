const resetRouter = require("express").Router();
const resetController = require("../controllers/testingController");

resetRouter.post("/reset", resetController.resetDatabase);

module.exports = resetRouter;
