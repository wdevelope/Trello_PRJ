const User = require("../database/models/user");
const jwt = require("jsonwebtoken");

class UserRepository {
  async registerUser(nickname, email, password) {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return null;
    }

    return User.create({
      nickname,
      email,
      password,
    });
  }

  async findUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async logoutUser(req, res) {
    res.cookie("Authorization", { expires: Date.now() });
  }

  async getUserById(id) {
    return await User.findOne({ where: { id: id } });
  }

  async updateUser(userId, data) {
    return await User.update(data, { where: { id: userId } });
  }

  async deleteUser(id) {
    return await User.destroy({ where: { id: id } });
  }
}

module.exports = UserRepository;
