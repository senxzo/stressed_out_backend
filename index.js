const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const routes = require("./User/routes");
const passport = require("./User/Passport");

class Server {
  constructor() {
    this.app = express();

    mongoose.connect("mongodb://localhost/stress", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      session({
        secret: "123456AAbb",
        resave: false,
        saveUninitialized: false,
      })
    );
    this.app.use(flash());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(routes);
  }

  start() {
    this.app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  }
}

new Server().start();
