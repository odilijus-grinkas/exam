const express = require('express');
const { userControllers } = require('../controllers/user-controllers');
const authToken = require('../../utils/authToken');
const userRouter = express.Router();

const isAdmin = (req, res, next) => {
  req.tokenInfo.admin ? next() : res.status(403).json("Unauthorized.");
}

// All routes here start with /users
userRouter.post("/register", async (req, res) => {
  userControllers.createUser(req, res);
});

userRouter.post("/login", userControllers.loginUser);

userRouter.delete("/:id", authToken, isAdmin, userControllers.deleteUser);

userRouter.get("/all", authToken, isAdmin, userControllers.getAllUsers);

module.exports = userRouter;
