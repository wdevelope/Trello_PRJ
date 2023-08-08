const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/users.repositories");
const userRepository = new UserRepository();

class UserService {
  // 회원가입
  async registerUser(nickname, email, password, passwordConfirm) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepository.registerUser(
      nickname,
      email,
      hashedPassword,
    );

    if (!newUser) {
      throw new Error("중복된 이메일입니다.");
    }

    if (password !== passwordConfirm) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    return newUser;
  }

  // 로그인
  async loginUser(email, password) {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("회원정보가 일치하지 않습니다.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("회원정보가 일치하지 않습니다.");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIREIN,
    });

    console.log("토큰 생성 완료");

    return token;
  }

  // 로그아웃
  async logoutUser(req, res) {
    await userRepository.logoutUser(req, res);
  }

  // 유저 조회
  async getUser(id) {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
    return user;
  }

  // 유저 업데이트
  async updateUser(userId, { password, nickname }) {
    let dataToUpdate = {};

    if (nickname) {
      dataToUpdate.nickname = nickname;
    }

    // 비밀번호 암호화 후 업데이트
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      dataToUpdate.password = hashedPassword;
    }

    const updatedUser = await userRepository.updateUser(userId, dataToUpdate);
    if (!updatedUser[0]) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
    return updatedUser;
  }

  // 유저 삭제
  async deleteUser(id) {
    const deletedCount = await userRepository.deleteUser(id);
    if (!deletedCount) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
  }
}

module.exports = UserService;
