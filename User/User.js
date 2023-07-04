const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

class User {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true }
);

UserSchema.loadClass(User);

module.exports = mongoose.model("User", UserSchema);
