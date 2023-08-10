$(document).ready(function () {
  getColumn();
});

// 회원가입 함수
document.addEventListener("DOMContentLoaded", function () {
  updateUIBasedOnAuth();
});

// 🪪 nav 버튼 생성 삭제
function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function updateUIBasedOnAuth() {
  const authorization = getCookie("authorization");

  if (authorization) {
    // 로그인된 경우
    document.getElementById("authBtn").style.display = "none";
    document.getElementById("signupBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
    document.getElementById("boardButton").style.display = "block";
    document.getElementById("profilBtn").style.display = "block";
    document.getElementById("inviteBtn").style.display = "block";
  } else {
    // 로그아웃된 경우
    document.getElementById("authBtn").style.display = "block";
    document.getElementById("signupBtn").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("boardButton").style.display = "none";
    document.getElementById("profilBtn").style.display = "none";
    document.getElementById("inviteBtn").style.display = "none";
  }
}

// 🪪 회원가입 함수
function signup() {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const nickname = document.getElementById("registerNickname").value;
  const passwordConfirm = document.getElementById("confirmPassword").value;

  fetch("http://localhost:3000/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, nickname, password, passwordConfirm }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// 🪪 로그인 함수
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
        window.location.reload();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// 🪪 로그아웃 함수
function logout() {
  fetch("http://localhost:3000/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
        window.location.reload();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
