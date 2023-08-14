const request = require("supertest");
const app = require("../app"); // app.js에서 export한 app 객체 가져오기

describe("Users Test", () => {
  it("/user/signup 회원가입 기능 테스트", async () => {
    const userData = {
      nickname: "testUser4",
      email: "test4@example.com",
      password: "password4",
      passwordConfirm: "password4",
    };

    const response = await request(app)
      .post("/user/signup") // 실제 서버의 경로를 사용
      .send(userData);

    expect(response.status).toBe(201); // 상태 코드 검증
    expect(response.body).toEqual({ message: "회원가입에 성공했습니다." }); // 응답 본문 검증
  });

  it("/user/login 로그인 기능 테스트", async () => {
    const userData = {
      email: "test4@example.com",
      password: "password4",
    };

    const response = await request(app)
      .post("/user/login") // 실제 서버의 경로를 사용
      .send(userData);

    expect(response.status).toBe(200); // 상태 코드 검증
    expect(response.body).toEqual({ message: "로그인 성공" }); // 응답 본문 검증
  });
});
