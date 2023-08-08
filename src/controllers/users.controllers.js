const UserService = require("../services/user.service");
const userService = new UserService();

class UsersController {
  // 회원가입
  async register(req, res) {
    const { nickname, email, password, passwordConfirm } = req.body;
    try {
      await userService.registerUser(
        nickname,
        email,
        password,
        passwordConfirm,
      );
      res.status(201).json({ message: "회원가입에 성공했습니다." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // 로그인
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const token = await userService.loginUser(email, password);
      res.cookie("authorization", `Bearer ${token}`);
      res.status(200).json({ message: "로그인 성공" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  //로그아웃
  async logoutUser(req, res) {
    try {
      await userService.logoutUser(req, res);
      return res.status(200).json({ message: "로그아웃 되었습니다." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }

  // 유저 조회
  async getUser(req, res) {
    try {
      const user = await userService.getUser(req.params.id);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // 유저 업데이트
  async updateUser(req, res) {
    try {
      await userService.updateUser(req.params.id, req.body);
      res.json({ message: "사용자 정보가 수정되었습니다." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // 유저 삭제
  async deleteUser(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      res.json({ message: "유저 삭제에 성공했습니다." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new UsersController();
