document.addEventListener("DOMContentLoaded", function () {
  updateUIBasedOnAuth();
});

// 🪪 nav 버튼 생성 삭제
function updateUIBasedOnAuth() {
  const authorization = sessionStorage.getItem("Authorization");

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
async function signup() {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const nickname = document.getElementById("registerNickname").value;
  const passwordConfirm = document.getElementById("confirmPassword").value;

  try {
    const response = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, nickname, password, passwordConfirm }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message || "회원가입에 실패했습니다.");
    }

    alert(data.message);
  } catch (error) {
    console.error("Error during signup:", error);
    alert(error.message);
  }
}

// 🪪 로그인 함수
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.status == 200) {
      sessionStorage.setItem(
        "Authorization",
        response.headers.get("Authorization"),
      );

      sessionStorage.setItem("userId", response.headers.get("userId"));

      alert(result.message);
      window.location.reload();
    } else {
      alert(result.message || "로그인에 실패했습니다.");
    }
  } catch (error) {
    console.error("로그인 에러:", error);
    alert("로그인 중 에러 발생");
  }
}

// 🪪 로그아웃 함수

async function logout() {
  try {
    // 서버에 로그아웃 요청을 보내기
    const response = await fetch("http://localhost:3000/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Authorization"),
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to logout");
    }
    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("userId");
    updateUIBasedOnAuth();
    location.reload();

    alert("로그아웃 되었습니다.");
  } catch (error) {
    console.error("로그아웃 에러:", error);
    alert("로그아웃 중 에러 발생");
  }
}
