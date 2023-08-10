const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controllers");
const auth = require("../middleWares/auth.middleware");
// const usersController = UsersController();

// 회원가입
router.post("/signup", UsersController.register);
// 로그인
router.post("/login", UsersController.login);
// 로그아웃
router.post("/logout", UsersController.logoutUser);
// 프로필 조회
router.get("/:id", auth, UsersController.getUser);
// 유저 정보 수정
router.put("/:id", auth, UsersController.updateUser);
// 유저 삭제
router.delete("/:id", auth, UsersController.deleteUser);

module.exports = router;

//기능  회원가입, 로그인, 로그아웃, 유저조회, 유저정보수정, 유저삭제(탈퇴)
