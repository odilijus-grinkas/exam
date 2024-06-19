const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { userModels } = require("../models/user-models");

const userControllers = {
  createUser: async (req, res) => {
    if (req.body.email.length === 0 || req.body.password.length === 0 || req.body.username.length === 0) {
      res.status(403).json("Please fill out all fields.");
      return;
    }
    if (req.body.username.length > 25 || req.body.email.length > 25) {
      res.status(403).json("Username & Email must be less than 25 characters long");
      return;
    }
    hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword)
    try {
      await userModels.createUser(req.con, req.body.email, hashedPassword, req.body.username);
      res.status(200).json("User created.");
    } catch (err) {
      res.status(403).json("User already exists.");
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await userModels.getUser(req.con, req.body.email);
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ id: user.id, admin: user.admin }, process.env.TOKEN_SECRET);
        res.status(200).json({ id: user.id ,username: user.username, admin: user.admin, token: token});
      } else {
        throw new Error();
      }
    } catch (err) {
      res.status(403).json("Email or Password is incorrect.");
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userModels.getAllUsers(req.con);
      res.status(200).json(users);
    } catch (err) {
      res.status(403).json("No users found.");
    }
  },

  deleteUser: async (req, res) => {
    try {
      await userModels.deleteUser(req.con, req.params.id);
      res.status(200).json("User deleted.");
    } catch (err) {
      res.status(403).json("User not found.");
    }
  },

}

module.exports = { userControllers };
