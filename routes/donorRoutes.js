"use strict";

const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const donorUser = require("../models/donorUser");
const mongoose = require("mongoose");

//test route -------------------------------------------------------

router.get("/test", (req, res, next) => {
  res.json({ msg: "donor works" });
});

//res/register -------------------------------------------------------

router.post("/register", (req, res) => {
  donorUser.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res.status(404).json({ name: "name already exists ma man" });
    } else {
      const newUser = new donorUser({
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
  donorUser
    .update({ _id: req.query.donor_id }, { $set: { name, foto } })
    .then(donor => {
      res.json({ msg: "donor updated", donorr: donor });
    })
    .catch(error => {
      console.log(error);
    });
});

//res/deleteProfile  -------------------------------------------------------

// router.get("/deleteProfile/:donor_id", function(req, res) {
//   res.json({ msg: req.params.donor_id });
//   donorUser.remove(
//     {
//       _id: req.params.donor_id,
//       ownerID: req.user._id
//     },
//     function(err, user) {
//       if (err) return console.error(err);

//       console.log("User successfully removed from donors collection!");
//       res.status(200).send();
//     }
//   );
// });

router.delete("/deleteProfile/:donor_id", (req, res, next) => {
  donorUser
    .findByIdAndRemove(req.params.donor_id)
    .then(res.json({ msg: "donoraaaa works" }))
    .catch(err => next(err));
});

// Todo.findByIdAndRemove(req.params.todoId, (err, todo) => {
//   // As always, handle any potential errors:
//   if (err) return res.status(500).send(err);
//   // We'll create a simple object to send back with a message and the id of the document that was removed
//   // You can really do this however you want, though.
//   const response = {
//       message: "Todo successfully deleted",
//       id: todo._id
//   };
//   return res.status(200).send(response);
// });

module.exports = router;
