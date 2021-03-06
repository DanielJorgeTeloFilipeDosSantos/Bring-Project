"use strict";

const { join } = require("path");
const express = require("express");
const createError = require("http-errors");

const logger = require("morgan");
const serveFavicon = require("serve-favicon");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");
require("./configurations/passport");

const deserializeUserMiddleware = require("./middleware/deserialize-user");

//VOLUNTEER
const authRouter = require("./routes/volunteerAuth");

//DONOR
const donorRouter = require("./routes/donorRoutes");
const donorAuthRouter = require("./routes/donorsAuth");

//ORGANISATION
const organisationAuthRouter = require("./routes/organisationAuth");

const app = express();

app.use(serveFavicon(join(__dirname, "public/images", "favicon.ico")));
app.use(express.static(join(__dirname, "client/build")));
app.use(logger("dev"));
app.use(express.json());

//--------PASSPORT SET UP HERE:

const bodyParser = require("body-parser");
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(
//   session({
//     secret: "some secret goes here",
//     resave: true,
//     saveUninitialized: true
//   })
//);
app.use(passport.initialize());
app.use(passport.session());

//--------PASSPORT SET UP END

app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60
    })
  })
);

// app.use(deserializeUserMiddleware);

app.use("/auth", authRouter);
app.use("/donor", donorRouter);
app.use("/donorsAuth", donorAuthRouter);
app.use("/organisation/auth", organisationAuthRouter);

app.get("*", (req, res, next) => {
  res.sendFile(join(__dirname, "./client/build/index.html"));
});

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.json({ type: "error", error: { message: error.message } });
});

module.exports = app;
