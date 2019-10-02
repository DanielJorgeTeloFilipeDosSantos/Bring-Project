"use strict";

const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const restaurantUser = require("../models/restaurantUser");

//test route -------------------------------------------------------

router.get("/test", (req, res, next) => {
  res.json({ msg: "restaurant works" });
});

//res/register -------------------------------------------------------

router.post("/register", (req, res) => {
  restaurantUser.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res.status(404).json({ name: "name already exists ma man" });
    } else {
      const newUser = new restaurantUser({
        name: req.body.name,
        foto: req.body.foto,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//res/signin   -------------------------------------------------------

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//res/signout   -------------------------------------------------------

//res/addSingleFood  -------------------------------------------------------

//res/updateProfile   -------------------------------------------------------

router.post("/updateProfile", (req, res, next) => {
  const { name, foto } = req.body;
  restaurantUser
    .update({ _id: req.query.restaurant_id }, { $set: { name, foto } })
    .then(restaurant => {
      res.json({ msg: "restaurant updated", restaurantt: restaurant });
    })
    .catch(error => {
      console.log(error);
    });
});

//res/deleteProfile  -------------------------------------------------------

router.delete("/user/:id", function(req, res) {
  User.remove(
    {
      _id: req.params.id,
      ownerID: req.user._id
    },
    function(err, user) {
      if (err) return console.error(err);

      console.log("User successfully removed from polls collection!");
      res.status(200).send();
    }
  );
});

module.exports = router;
