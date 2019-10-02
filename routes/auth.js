"use strict";

const { Router } = require("express");
const router = Router();

//const uploadImageMiddleware = require("./../middleware/image-upload");
const routeGuardMiddleware = require("./../middleware/route-guard");

module.exports = router;

const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcrypt");

// require the user model !!!!
const VolunteerUser = require("../models/volunteerUser");

authRoutes.post("/register", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.passwordHash;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({
      message:
        "Please make your password at least 8 characters long for security purposes."
    });
    return;
  }

  VolunteerUser.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new VolunteerUser({
      username: username,
      passwordHash: hashPass
    });

    aNewUser.save(err => {
      if (err) {
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      req.login(aNewUser, err => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(aNewUser);
      });
    });
  });
});

module.exports = authRoutes;
