// 🔴메인 🟤회원 🟣보드 🔵모달 🟢컬럼 🟡카드 ⚪댓글 🟠초대

// 🔴 메인 pageload 함수
document.addEventListener("DOMContentLoaded", function () {
  updateUIBasedOnAuth(); // 사용자 인증에 따른 UI 업데이트

  const userId = sessionStorage.getItem("userId");
  if (userId) {
    RenderBoards(userId);
    invitedBoard();
  } else {
    console.log("로그인이 필요합니다.");
  }

  // ESC 키를 눌렀을 때 모달을 닫는 이벤트 리스너 등록
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});

// 🔴 모달 관련
function closeModal() {
  const modals = document.querySelectorAll(".modal.show");
  modals.forEach((modal) => {
    $(modal).modal("hide");
  });
}

// 🔴 메인 nav 버튼 생성 삭제
function updateUIBasedOnAuth() {
  const authorization = sessionStorage.getItem("Authorization");
  const heroSection = document.getElementById("heroSection");
  const startBtn = document.getElementById("startBtn");
  inviteBoardButton;
  if (authorization) {
    // 로그인된 경우
    heroSection.style.display = "none"; // 히어로 영역 숨기기
    startBtn.style.display = "none"; // 시작하기 버튼 숨기기
    document.getElementById("authBtn").style.display = "none"; // 로그인/회원가입 버튼 숨기기
    document.getElementById("logoutBtn").style.display = "block";
    document.getElementById("boardButton").style.display = "block";
    document.getElementById("profilBtn").style.display = "block";
    document.getElementById("inviteBoardButton").style.display = "block";
  } else {
    // 로그아웃된 경우
    heroSection.style.display = "block"; // 히어로 영역 표시
    startBtn.style.display = "block"; // 시작하기 버튼 표시
    document.getElementById("authBtn").style.display = "block"; // 로그인/회원가입 버튼 표시
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("boardButton").style.display = "none";
    document.getElementById("profilBtn").style.display = "none";
    document.getElementById("inviteBoardButton").style.display = "none";
  }
}

// 🟤 회원가입
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

    if (response.status !== 201) {
      throw new Error(data.message || "회원가입에 실패했습니다.");
    }

    alert(data.message);
  } catch (error) {
    console.error("회원가입 에러:", error);
    alert("회원가입에 실패했습니다.");
  }
}

// 🟤 로그인
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
      //sessionStorage에 유저 정보 저장
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
    alert("로그인에 실패했습니다.");
  }
}

// 🟤 로그아웃
async function logout() {
  try {
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
    //버튼함수 실행
    updateUIBasedOnAuth();
    location.reload();

    alert("로그아웃 되었습니다.");
  } catch (error) {
    console.error("로그아웃 에러:", error);
    alert("로그아웃에 실패했습니다.");
  }
}

// 🟤 프로필
async function profile() {
  try {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      throw new Error("로그인 정보가 없습니다.");
    }

    const response = await fetch(`http://localhost:3000/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Authorization"),
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "유저 정보를 가져오는데 실패했습니다.");
    }

    const userData = await response.json();

    // 가져온 정보를 모달에 설정
    document.getElementById("profileUserId").textContent = userData.id;
    document.getElementById("profileEmail").textContent = userData.email;
    document.getElementById("profileNickname").textContent = userData.nickname;
  } catch (error) {
    console.error("Profile Error:", error);
    alert(error.message);
  }
}

// 🟣 보드 생성
async function createBoard() {
  const title = document.getElementById("titleBoard").value;
  const description = document.getElementById("descriptionBoard").value;
  const color = document.getElementById("colorBoard").value;

  try {
    const response = await fetch("http://localhost:3000/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Authorization"),
      },
      body: JSON.stringify({ title, description, color }),
    });

    const data = await response.json();

    if (response.status === 201) {
      $("#createBoardModal").modal("hide");
      alert(data.message || "보드 생성에 성공했습니다.");

      location.reload();
    } else {
      alert(data.message || "보드 생성에 실패했습니다.");
    }
  } catch (error) {
    console.error("보드 에러 발생:", error);
    alert("보드 생성 중 에러 발생");
  }
}

// 🟣 보드 렌더링
async function RenderBoards(userId) {
  try {
    const response = await fetch(`http://localhost:3000/board/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Authorization"),
      },
    });

    const data = await response.json();

    if (response.ok) {
      for (const board of data) {
        const boardHtml = `
                            <div id="mainBoard" data-board-id="${board.id}" style="background-color:${board.color}" class="board w-100 p-3 mt-5 border">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h1>${board.title}</h1>
                                        <div class="description">${board.description}</div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <p class="mb-1 mr-3">참여중인 유저 :</p>
                                        <button data-toggle="modal" data-target="#inviteUserModal" class="btn btn-primary mb-1 mr-3">
                                            유저 초대
                                        </button>
                                        <button data-toggle="modal" data-target="#addColumnModal" class="btn btn-primary mb-1 mr-3 btn-add-column" data-board-id="${board.id}">
                                            컬럼 추가
                                        </button>                                    
                                    </div>
                                </div>
                                <div class="columns-container"></div>  <!-- 컬럼 렌더링하는 부분 -->  
                                <div class="text-right">
                                <button class="btn btn-danger mt-3 btn-delete-board" data-board-id="${board.id}" onclick="deleteBoard(this.getAttribute('data-board-id'))">
                                    보드 삭제 
                                </button>
                                </div>                        
                            </div>
                        `;

        const mainSection = document.querySelector("main");
        mainSection.insertAdjacentHTML("beforeend", boardHtml);

        // 각 보드마다 해당 보드의 컬럼을 불러와 렌더링합니다.
        await loadColumn(board.id);
      }
    } else {
      throw new Error(data.message || "board 렌더링 오류");
    }
  } catch (error) {
    console.error("Error boards:", error);
    alert("보드 불러오기 중 에러 발생: " + error.message);
  }
  document.querySelectorAll(".btn-add-column").forEach((button) => {
    button.addEventListener("click", function () {
      const boardId = this.getAttribute("data-board-id");
      document
        .getElementById("addColumnModal")
        .setAttribute("data-current-board-id", boardId);
    });
  });
  document
    .querySelectorAll("[data-toggle='modal'][data-target='#inviteUserModal']")
    .forEach((button) => {
      button.addEventListener("click", function () {
        const boardId = this.closest(".board").getAttribute("data-board-id");
        document
          .getElementById("inviteUserModal")
          .setAttribute("data-current-board-id", boardId);
      });
    });
}

// 🟣 보드 삭제
async function deleteBoard(boardId) {
  const confirmation = confirm("정말로 보드를 삭제하시겠습니까?");
  if (!confirmation) {
    return;
  }
  try {
    const response = await fetch(`http://localhost:3000/board/${boardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("Authorization"),
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      alert(data.message || "보드 삭제에 성공했습니다.");
      location.reload();
    } else {
      alert(data.message || "보드 삭제 실패했습니다.");
    }
  } catch (error) {
    console.error("보드 삭제 에러 발생:", error);
    alert("보드 삭제중 에러 발생");
  }
}

// 🟠 보드멤버 초대
async function inviteUser() {
  const userId = document.querySelector(
    '#inviteUserModal input[type="text"]',
  ).value;

  if (!userId) {
    alert("유저 ID를 입력해주세요.");
    return;
  }

  // 현재 보드의 ID 가져오기
  const boardId = document
    .getElementById("inviteUserModal")
    .getAttribute("data-current-board-id");

  console.log("보드 id가져오는지 확인:", boardId);
  // API 호출
  try {
    const response = await fetch(
      `http://localhost:3000/boardMember/${boardId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Authorization"), // 인증 토큰이 필요하다면
        },
        body: JSON.stringify({ userId: userId }),
      },
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "유저를 초대하는데 실패했습니다.");
    }

    alert("유저가 성공적으로 초대되었습니다.");
    $("#inviteUserModal").modal("hide"); // 모달 닫기
  } catch (error) {
    alert(`${error.message}`);
  }
}

// 🟠 초대된 보드 불러오기
async function invitedBoard() {
  try {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      throw new Error("로그인 정보가 없습니다.");
    }

    const response = await fetch(
      `http://localhost:3000/boardMember/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Authorization"),
        },
      },
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "보드 정보를 가져오는데 실패했습니다.");
    }

    const boards = await response.json();

    if (!boards || boards.length === 0) {
      throw new Error("받아온 보드 정보가 없습니다.");
    }
    // 기존에 렌더링된 보드의 ID 목록을 가져옵니다.
    const existingBoardIds = Array.from(
      document.querySelectorAll("[data-board-id]"),
    ).map((el) => el.getAttribute("data-board-id"));

    if (!existingBoardIds) {
      throw new Error("기존 보드 ID를 가져오는데 실패했습니다.");
    }

    // 각 보드를 렌더링합니다.
    const mainSection = document.querySelector("main");
    for (const board of boards) {
      // 이미 렌더링된 보드는 건너뛰기
      if (existingBoardIds.includes(board.id.toString())) {
        continue;
      }
      const boardHtml = `
                        <div id="mainBoard" data-board-id="${board.id}" style="background-color:${board.color}" class="board w-100 p-3 mt-5 border">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h1>${board.title}</h1>
                                    <div class="description">${board.description}</div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <p class="mb-1 mr-3">참여중인 유저 :</p>
                                    <button data-toggle="modal" data-target="#inviteUserModal" class="btn btn-primary mb-1 mr-3">
                                        유저 초대
                                    </button>
                                    <button data-toggle="modal" data-target="#addColumnModal" class="btn btn-primary mb-1 mr-3 btn-add-column" data-board-id="${board.id}">
                                        컬럼 추가
                                    </button>                                    
                                </div>
                            </div>
                            <div class="columns-container"></div>  <!-- 컬럼 렌더링하는 부분 -->  
                            <div class="text-right">
                            <button class="btn btn-danger mt-3 btn-delete-board" data-board-id="${board.id}" onclick="deleteBoard(this.getAttribute('data-board-id'))">
                                보드 삭제 
                            </button>
                            </div>                        
                        </div>
                      `;

      mainSection.insertAdjacentHTML("beforeend", boardHtml);

      // 각 보드마다 해당 보드의 컬럼을 불러와 렌더링합니다.
      await loadColumn(board.id);
    }

    // 모달 이벤트 리스너
    document.querySelectorAll(".btn-add-column").forEach((button) => {
      button.addEventListener("click", function () {
        const boardId = this.getAttribute("data-board-id");
        document
          .getElementById("addColumnModal")
          .setAttribute("data-current-board-id", boardId);
      });
    });

    document
      .querySelectorAll("[data-toggle='modal'][data-target='#inviteUserModal']")
      .forEach((button) => {
        button.addEventListener("click", function () {
          const boardId = this.closest(".board").getAttribute("data-board-id");
          document
            .getElementById("inviteUserModal")
            .setAttribute("data-current-board-id", boardId);
        });
      });
  } catch (error) {
    console.error("Error fetching boards:", error);
    alert(error.message);
  }
}

// 🟢 컬럼 생성
async function createColumn() {
  const modal = document.getElementById("addColumnModal");
  const boardId = modal.getAttribute("data-current-board-id");
  const columnTitle = document.getElementById(`columnTitle`).value;
  const columnPosition = document.getElementById(`columnPosition`).value;

  try {
    const response = await fetch(
      `http://localhost:3000/board/${boardId}/column`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Authorization"),
        },
        body: JSON.stringify({
          title: columnTitle,
          position: columnPosition,
        }),
      },
    );

    const fetchedData = await response.json();

    if (!response.ok) {
      throw new Error(fetchedData.message || "컬럼 생성 오류");
    }

    alert(fetchedData.message || "컬럼 생성에 성공했습니다.");

    loadColumn(boardId);
  } catch (err) {
    console.error(err);
    alert("컬럼을 생성하는 도중 오류가 발생했습니다: " + err.message);
  }
}

// 🟢 컬럼 렌더링
async function loadColumn(boardId) {
  if (!boardId) return;

  try {
    const response = await fetch(
      `http://localhost:3000/board/${boardId}/column`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Authorization"),
        },
      },
    );
    const columnData = await response.json();

    if (!response.ok) return;

    //컬럼 포지션 설정
    const columns = columnData.data || columnData;
    if (!Array.isArray(columns)) return;
    columns.sort((a, b) => a.position - b.position);

    const container = document.querySelector(
      `#mainBoard[data-board-id="${boardId}"] .columns-container`,
    );
    if (!container) return;

    container.innerHTML = "";
    columns.forEach((data) => {
      const columnDiv = document.createElement("div");
      columnDiv.classList.add("col-lg-3", "col-md-6", "col-sm-12", "mb-4");
      columnDiv.innerHTML = `
                              <div class="column h-100 p-2 bg-light rounded" data-column-id="${data.id}">
                                  <div class="d-flex justify-content-between">
                                      <h4>${data.title}</h4>
                                      <button class="btn btn-danger btn-sm mb-2"
                                              data-board-id="${boardId}"
                                              data-column-id="${data.id}"                                
                                              onclick="deleteColumn(this.getAttribute('data-board-id'), this.getAttribute('data-column-id'))">
                                          X
                                      </button>
                                  </div>
                                  <div class="card-container flex-grow-1 overflow-auto"></div>
                                  <div class="mt-3 d-flex justify-content-between">                           
                                      <button data-toggle="modal"
                                              data-target="#addCardModal"
                                              data-column-id="${data.id}"
                                              data-board-id="${boardId}"
                                              class="btn btn-warning">
                                          카드 추가
                                      </button>
                                      <button data-toggle="modal"
                                              data-target="#updateColumnModal"
                                              data-board-id="${boardId}"
                                              data-column-id="${data.id}"
                                              class="btn btn-secondary" 
                                              > 
                                          컬럼 수정
                                      </button>
                                  </div>
                              </div>
                          `;
      container.appendChild(columnDiv);

      requestAnimationFrame(() => {
        loadCards(data.id);
      });
    });

    container
      .querySelectorAll(
        "button[data-toggle='modal'][data-target='#addCardModal']",
      )
      .forEach((button) => {
        button.addEventListener("click", function () {
          const columnId = this.getAttribute("data-column-id");
          const boardId = this.getAttribute("data-board-id");

          const addCardModal = document.getElementById("addCardModal");
          if (addCardModal) {
            addCardModal.setAttribute("data-column-id", columnId);
            addCardModal.setAttribute("data-board-id", boardId);
          }
        });
      });

    container
      .querySelectorAll(
        "button[data-toggle='modal'][data-target='#updateColumnModal']",
      )
      .forEach((button) => {
        button.addEventListener("click", function () {
          const columnId = this.getAttribute("data-column-id");
          const boardId = this.getAttribute("data-board-id");

          const updateColumnModal =
            document.getElementById("updateColumnModal");
          if (updateColumnModal) {
            updateColumnModal.setAttribute("data-column-id", columnId);
            updateColumnModal.setAttribute("data-board-id", boardId);
          }
        });
      });
  } catch (error) {
    console.error(
      `Error fetching columns for boardId: ${boardId}. Error: ${error.message}`,
    );
  }
}

// 🟢 컬럼 수정
async function updateColumn() {
  const updateColumnModal = document.getElementById("updateColumnModal");
  const boardId = updateColumnModal.getAttribute("data-board-id");
  const columnId = updateColumnModal.getAttribute("data-column-id");

  const obj = {};
  obj.title = $("#updateColumnTitle").val();
  obj.position = $("#updateColumnPosition").val();

  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("Authorization"),
    },
    body: JSON.stringify(obj),
  };

  try {
    const response = await fetch(
      `http://localhost:3000/board/${boardId}/column/${columnId}`,
      option,
    );

    const data = await response.json();

    if (response.status === 200) {
      alert(data.message || "수정이 성공적으로 완료되었습니다.");
      location.reload();
      return;
    }

    throw new Error(data.message || "컬럼 수정시 에러가 발생했습니다.");
  } catch (e) {
    console.error(e);
    alert(`Error: ${e.message}`);
  }
}

// 🟢 컬럼 삭제
async function deleteColumn(boardId, columnId) {
  const confirmation = confirm("정말로 컬럼을 삭제하시겠습니까?");
  if (!confirmation) {
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:3000/board/${boardId}/column/${columnId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Authorization"),
        },
      },
    );

    const data = await response.json();

    if (response.ok) {
      alert(data.message || "컬럼 삭제에 성공했습니다.");
      location.reload();
    } else {
      alert(data.message || "컬럼 삭제에 실패했습니다.");
    }
  } catch (err) {
    console.error("컬럼 삭제 에러 발생:", err);
    alert("컬럼 삭제 중 문제가 발생했습니다.");
  }
}

// 🟡 카드 생성
async function addCard() {
  const addCardModal = document.getElementById("addCardModal");
  const columnId = addCardModal.getAttribute("data-column-id");

  const title = document.getElementById("cardTitle").value;
  const description = document.getElementById("cardContent").value;
  const color = document.getElementById("cardColor").value;
  const position = document.getElementById("cardPosition").value;
  const deadline = document.getElementById("dueDate").value;

  const obj = {
    title: title,
    description: description,
    color: color,
    position: position,
    deadline: deadline,
  };

  try {
    const response = await fetch(
      `http://localhost:3000/column/${columnId}/card`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Authorization"),
        },
        body: JSON.stringify(obj),
      },
    );

    const fetchedData = await response.json();

    if (!response.ok) {
      throw new Error(fetchedData.message || "카드 생성 오류");
    }

    alert(fetchedData.message || "카드 생성에 성공했습니다.");
    loadCards(columnId);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

// 🟡 카드 삭제
async function deleteCard() {
  const confirmation = confirm("정말로 카드를 삭제하시겠습니까?");
  if (!confirmation) {
    return;
  }

  const cardDetailModal = document.getElementById("cardDetailModal");
  const columnId = cardDetailModal.getAttribute("data-column-id");
  const cardId = cardDetailModal.getAttribute("data-card-id");

  try {
    const response = await fetch(
      `http://localhost:3000/column/${columnId}/card/${cardId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Authorization"),
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "카드 삭제 오류");
    }

    alert(result.message || "카드가 성공적으로 삭제되었습니다.");
    await loadCards(columnId);
    $(cardDetailModal).modal("hide");
  } catch (err) {
    console.error(err);
    alert("카드를 삭제하는데 오류가 발생했습니다: " + err.message);
  }
}

// 🟡 카드 수정
async function updateCard() {
  const cardDetailModal = document.getElementById("cardDetailModal");
  const columnId = cardDetailModal.getAttribute("data-column-id");
  const cardId = cardDetailModal.getAttribute("data-card-id");

  const title = document.getElementById("updateCardTitle").value;
  const description = document.getElementById("updateCardContent").value;
  const dueDate = document.getElementById("updateDueDate").value;
  const color = document.getElementById("updateCardColor").value;
  const position = document.getElementById("updateCardPosition").value;

  const obj = {
    title: title,
    description: description,
    dueDate: dueDate,
    color: color,
    position: position,
  };

  try {
    const response = await fetch(
      `http://localhost:3000/column/${columnId}/card/${cardId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Authorization"),
        },
        body: JSON.stringify(obj),
      },
    );

    const fetchedData = await response.json();

    if (!response.ok) {
      throw new Error(fetchedData.message || "카드 수정 오류");
    }

    alert(fetchedData.message || "카드 수정에 성공했습니다.");
    $("#updateCardModal").modal("hide");
    window.location.reload();

    // displayCardDetails(columnId, cardId);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

// 🟡 카드 렌더링
async function loadCards(columnId) {
  if (!columnId) return;

  try {
    const response = await fetch(
      `http://localhost:3000/column/${columnId}/card`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Authorization"),
        },
      },
    );

    const cardsData = await response.json();

    if (!response.ok) return;

    const cards = cardsData.data || cardsData;

    // 카드 포지션 설정: position을 기준으로 오름차순 정렬
    if (!Array.isArray(cards)) {
      console.error("카드 데이터 형식이 잘못되었습니다:", cards);
      return;
    }
    cards.sort((a, b) => a.position - b.position);

    const cardContainer = document.querySelector(
      `.column[data-column-id="${columnId}"] .card-container`,
    );

    if (!cardContainer) {
      console.error(
        `카드를 추가할 컬럼의 카드 컨테이너를 찾을 수 없습니다: ${columnId}`,
      );
      return;
    }

    cardContainer.innerHTML = "";
    cards.forEach((data) => {
      cardContainer.innerHTML += `
                                  <div 
                                  class="card mb-2 p-2 border rounded" 
                                  data-toggle="modal" 
                                  data-target="#cardDetailModal" 
                                  data-card-id="${data.id}"
                                  onclick="displayCardDetails(${columnId},${data.id});" 
                                  style="background-color:${data.color};">
                                  ${data.title}
                                  </div>
                                `;
    });
  } catch (error) {
    console.error(
      `Error fetching cards for columnId: ${columnId}. Error: ${error.message}`,
    );
  }
}

// 🟡 카드 상세페이지 렌더링
async function displayCardDetails(columnId, cardId) {
  try {
    const response = await fetch(
      `http://localhost:3000/column/${columnId}/card/${cardId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Authorization"),
        },
      },
    );

    const cardData = await response.json();
    if (!response.ok) {
      throw new Error(
        cardData.message || "카드 상세 정보를 가져오는데 실패했습니다.",
      );
    }

    // 모달에 정보 설정
    document.getElementById("cardDetailTitle").textContent = cardData.title;
    document.getElementById("cardDetailContent").textContent =
      cardData.description;
    document.getElementById("cardDetailDueDate").textContent =
      cardData.deadline;

    const cardDetailModal = document.getElementById("cardDetailModal");
    cardDetailModal.setAttribute("data-column-id", columnId); // 컬럼 ID 설정
    cardDetailModal.setAttribute("data-card-id", cardId); // 카드 ID 설정

    const commentsSection = document.querySelector(".comments-section");
    commentsSection.setAttribute("data-card-id", cardId);

    // 해당 카드의 댓글 불러오기
    await loadComments(cardId);
  } catch (err) {
    console.error(err);
    alert("카드 상세 정보를 가져오는데 오류가 발생했습니다: " + err.message);
  }
}

// ⚪ 댓글 생성
async function addComment() {
  const commentsSection = document.querySelector(".comments-section");
  const cardId = commentsSection.getAttribute("data-card-id");

  const commentInput = document.getElementById("commentInput");
  const newComment = commentInput.value;

  if (!newComment) {
    alert("댓글 내용을 입력해주세요.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/card/${cardId}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Authorization"),
        },
        body: JSON.stringify({ comment: newComment }),
      },
    );

    const result = await response.json();
    console.log("댓글관련 result:", result);
    if (!response.ok) {
      throw new Error(result.message || "댓글을 추가하는데 실패했습니다.");
    }

    // 화면에 새로운 댓글 추가
    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML += `<li class="list-group-item">${newComment}</li>`;
    commentInput.value = "";

    // 댓글 추가 후 댓글 목록 갱신
    await loadComments(cardId);
    alert("댓글 작성에 성공했습니다.");
  } catch (err) {
    console.error(err);
    alert("댓글을 추가하는데 오류가 발생했습니다: " + err.message);
  }
}

// ⚪ 댓글 삭제
async function deleteComment(commentId, cardId) {
  const confirmation = confirm("정말로 댓글을 삭제하시겠습니까?");
  if (!confirmation) {
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:3000/card/${cardId}/comment/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Authorization"),
        },
      },
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "댓글을 삭제하는데 실패했습니다.");
    }

    // 화면에서 댓글 삭제
    await loadComments(cardId);
  } catch (err) {
    console.error(err);
    alert("댓글을 삭제하는데 오류가 발생했습니다: " + err.message);
  }
}

// ⚪ 댓글 렌더링
async function loadComments(cardId) {
  console.log(cardId);
  try {
    const response = await fetch(
      `http://localhost:3000/card/${cardId}/comment`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("Authorization"),
        },
      },
    );

    const commentsData = await response.json();
    if (!response.ok) {
      throw new Error(
        commentsData.message || "댓글을 불러오는데 실패했습니다.",
      );
    }

    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = ""; // 기존 댓글 삭제

    const commentsArray = commentsData.data || [];
    commentsArray.forEach((comment) => {
      commentsList.innerHTML += `
                                <li class="list-group-item">
                                  ${comment.comment}
                                 <button class="btn btn-sm btn-secondary float-right" onclick="deleteComment(${comment.id}, ${cardId})">삭제</button>
                                </li>
                                `;
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
