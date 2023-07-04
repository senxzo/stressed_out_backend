const express = require("express");
const passport = require("passport");
const User = require("./User");

class Routes {
  constructor() {
    this.router = express.Router();

    this.router.post("/register", this.register.bind(this));
    this.router.post(
      "/login",
      passport.authenticate("local", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true,
      })
    );
    this.router.get("/logout", (req, res) => this.logout(req, res));
    this.router.get("/profile", (req, res) => this.profile(req, res));
  }

  async register(req, res) {
    try {
      const newUser = new User();
      newUser.username = req.body.username;
      newUser.password = newUser.hashPassword(req.body.password);

      await newUser.save();
      res.redirect("/login");
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  logout(req, res) {
    req.logout();
    res.redirect("/login");
  }

  profile(req, res) {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  }
}

module.exports = new Routes().router;
