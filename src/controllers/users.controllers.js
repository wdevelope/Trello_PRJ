const UserService = require("../services/user.service");

module.exports = {
  register: async (req, res) => {
    const { nickname, email, password } = req.body;
    try {
      const newUser = await UserService.registerUser(nickname, email, password);
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const token = await UserService.loginUser(email, password, res);
      res.status(200).json(token);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },

  logoutUser: async (req, res) => {
    try {
      await UserService.logoutUser(req, res);
      return res.status(200).json({ message: "로그아웃 되었습니다." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },
};
