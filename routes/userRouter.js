const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getAllUsers);
userRouter.delete("/", userController.deleteAllUsers);

module.exports = userRouter;
