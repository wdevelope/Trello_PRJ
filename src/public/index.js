// 회원가입 함수
function signup() {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const nickname = document.getElementById("registerNickname").value;
  const passwordConfirm = document.getElementById("confirmPassword").value;

  console.log(email, password, nickname, passwordConfirm);
  fetch("http://localhost:3000/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, nickname, password, passwordConfirm }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("회원가입 성공");
      } else {
        alert("회원가입 실패: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// 로그인 함수
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);

  fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("로그인 성공");
        // 추가적으로 토큰 저장, 페이지 이동 등의 동작을 수행할 수 있습니다.
      } else {
        alert("로그인 실패: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// 이벤트 리스너 등록 (가정: 각각의 버튼의 id가 'signupButton'과 'loginButton'임)
document.getElementById("signupButton").addEventListener("click", signup);
document.getElementById("loginButton").addEventListener("click", login);
