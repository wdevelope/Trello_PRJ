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

// 🪪 카드 생성 함수

function addCard(boardId, columnId) {
  const title = document.getElementById("cardTitle").value;
  const description = document.getElementById("cardContent").value;
  const color = document.getElementById("cardColor").value;
  const position = document.getElementById("cardPosition").value;
  const deadline = document.getElementById("dueDate").value;

  const apiUrl = `http://localhost:3000/board/${boardId}/column/${columnId}/card`;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, color, position, deadline }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);

        const cardData = `
                          <div 
                            class="card mb-2 p-2 border rounded"
                            data-toggle="modal"
                            data-target="#cardDetailModal"
                            style="background-color:${color};"
                          >
                            ${title}
                          </div> 
                        `;
        const columnContainer = document.querySelector(".column");
        columnContainer.insertAdjacentHTML("beforeend", cardData); // 새로 생성된 카드를 컬럼의 맨 아래에 추가
      } else {
        console.error("Card creation failed:", data);
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


