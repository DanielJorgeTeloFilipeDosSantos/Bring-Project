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
// done with passport http://localhost:3010/donorsAuth/logout

//res/signin   -------------------------------------------------------
//done with passport http://localhost:3010/donorsAuth/logout

//res/signout   -------------------------------------------------------
// done with passport http://localhost:3010/donorsAuth/logout

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

router.delete("/deleteProfile/:donor_id", (req, res, next) => {
  donorUser
    .findByIdAndRemove(req.params.donor_id)
    .then(res.json({ msg: "donoraaaa works" }))
    .catch(err => next(err));
});

module.exports = router;
