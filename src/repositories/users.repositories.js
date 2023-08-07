const User = require("../database/models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  registerUser: async (nickname, email, password) => {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return null;
    }

    return User.create({
      nickname,
      email,
      password,
    });
  },

  findUserByEmail: async (email) => {
    return await User.findOne({ where: { email } });
  },

  generateToken: (user, res) => {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIREIN,
    });
    res.cookie("Authorization", `Bearer ${token}`);
  },

  logoutUser: async (req, res) => {
    res.cookie("Authorization", { expires: Date.now() });
  },
};
