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

//보드 등록 함수
function createBoard(){
  const title = document.getElementById("titleBoard").value;
  const description = document.getElementById("descriptionBoard").value;
  const color = document.getElementById("colorBoard").value;
  alert(title, description, color);
  console.log(title, description, color);

  console.log(title, description, color);
  fetch("http://localhost:3000/board", {   /*로컬에 userId 가져와야하는데?! */
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ title, description, color }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("보드 등록 완료");
      } else {
        alert("보드 등록 실패: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

}

// 이벤트 리스너 등록 (가정: 각각의 버튼의 id가 'signupButton'과 'loginButton'임)
document.getElementById("signupButton").addEventListener("click", signup);
document.getElementById("loginButton").addEventListener("click", login);

// 이벤트 리스너 등록
document.getElementById("createBoardButton").addEventListener("click", createBoard);
