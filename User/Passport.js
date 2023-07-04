const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./User");

class Passport {
  constructor() {
    this.passport = passport;
    passport.use(new LocalStrategy(this.strategyFunction.bind(this)));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (err) {
        done(err);
      }
    });
  }

  async strategyFunction(username, password, done) {
    try {
      const user = await User.findOne({ username });
      if (!user || !user.comparePassword(password, user.password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
}

module.exports = new Passport().passport;
