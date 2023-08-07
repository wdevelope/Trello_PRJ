const bcrypt = require("bcrypt");
const UserRepository = require("../repositories/users.repositories");

module.exports = {
  registerUser: async (nickname, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserRepository.registerUser(
      nickname,
      email,
      hashedPassword,
    );

    if (!newUser) {
      throw new Error("중복된 이메일입니다.");
    }

    return newUser;
  },

  loginUser: async (email, password, res) => {
    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("이메일 또는 비밀번호가 틀렸습니다.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("이메일 또는 비밀번호가 틀렸습니다.");
    }

    UserRepository.generateToken(user, res);
    console.log("쿠키 생성 완료");

    return { message: "로그인 성공" };
  },

  logoutUser: async (req, res) => {
    await UserRepository.logoutUser(req, res);
  },
};
