const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controllers");
// const usersController = UsersController();

// 회원가입
router.post("/signup", UsersController.register);
// 로그인
router.get("/login", UsersController.login);
// // 로그아웃
// router.post("/signout", isSignedIn, logoutUser);
// // 프로필 조회
// router.get("/:userId", UsersController.findUser);
// // 유저 정보 수정
// router.put("/:userId", UsersController.petchUser);
// // 유저 삭제
// router.delete("/:userId", UsersController.deleteUse);

module.exports = router;

//기능  회원가입, 로그인, 로그아웃, 유저조회, 유저정보수정, 유저삭제(탈퇴)
