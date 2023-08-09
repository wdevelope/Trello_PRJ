const { response } = require("express");
$(document).ready(function () {
  getColumn();
});
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
//컬럼 조회(상시)
function getColumn() {
  fetch(`http://localhost:3000/board/${boardId}/column`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const columns = data.columns; // 서버에서 받은 컬럼 정보
        const mainBoard = document.getElementById("mainBoard");

        columns.forEach((column) => {
          const { title, position } = column;

          const columnDiv = document.createElement("div");
          columnDiv.className = "col-lg-3 col-md-6 col-sm-12 mb-4";

          const columnEl = document.createElement("div");
          columnEl.className = "column h-100 p-2 bg-light rounded";

          const h4 = document.createElement("h4");
          h4.textContent = title;

          const cardDiv = document.createElement("div");
          cardDiv.className = "card mb-2 p-2 border rounded";

          const cardButton = document.createElement("button");
          cardButton.className = "btn btn-secondary mt-3";
          cardButton.textContent = "카드 추가";

          cardDiv.appendChild(cardButton);
          columnEl.appendChild(h4);
          columnEl.appendChild(cardDiv);
          columnDiv.appendChild(columnEl);

          mainBoard.appendChild(columnDiv);
        });
      } else {
        alert("컬럼 조회 실패: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//컬럼 추가
function createColumn() {
  const title = document.getElementById("columnTitle").value;
  const position = document.getElementById("columnPosition").value;
  console.log(title, position);

  fetch(`http://localhost:3000/board/${boardId}/column`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, position }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("컬럼 생성 성공");
      } else {
        alert("컬럼 생성 실패: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// 이벤트 리스너 등록 (가정: 각각의 버튼의 id가 'signupButton'과 'loginButton'임)
document.getElementById("signupButton").addEventListener("click", signup);
document.getElementById("loginButton").addEventListener("click", login);
