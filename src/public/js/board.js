// 페이지 로드 시 실행될 함수
document.addEventListener("DOMContentLoaded", function () {
  const userId = sessionStorage.getItem("userId");
  if (userId) {
    loadAndRenderBoards(userId);
  } else {
    console.log("로그인이 필요합니다.");
  }
});

// 페이지 로드 시 보드 데이터 렌더링
function loadAndRenderBoards(userId) {
  fetch(`http://localhost:3000/board/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("Authorization"),
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((errorText) => {
          throw new Error(
            errorText || "Authentication failed or user not found.",
          );
        });
      }
      return response.json();
    })
    .then((data) => {
      const mainSection = document.querySelector("main");
      data.forEach((board) => {
        const modalId = `addColumnModal-${board.id}`;
        const columnTitleId = `columnTitle-${board.id}`;
        const columnPositionId = `columnPosition-${board.id}`;

        const boardHtml = `
                            <div id="mainBoard" data-board-id="${board.id}" class="board w-100 p-3 mt-5 border">
                              <div style="background-color:${board.color}" class="board w-100 p-3 mt-5 border">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                  <h1>${board.title}</h1>
                                  <div class="d-flex align-items-center">
                                    <p class="mb-1 mr-3">참여중인 유저 :</p>
                                    <button data-toggle="modal" data-target="#inviteUserModal" class="btn btn-primary mb-1 mr-3">
                                      유저 초대
                                    </button>
                                    <button data-toggle="modal" data-target="#${modalId}" class="btn btn-primary mb-1 btn-add-column" data-board-id="${board.id}">
                                      컬럼 추가
                                    </button>
                                  </div>
                                </div>
                                <div class="description">
                                  ${board.description}
                                </div>
                              </div>
                              <div class="modal fade" id="${modalId}">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-body">
                                      <label for="${columnTitleId}">컬럼 제목</label>
                                      <input type="text" id="${columnTitleId}" placeholder="컬럼 제목" class="form-control mb-2" />
                                      <label for="${columnPositionId}">컬럼 위치</label>
                                      <input type="number" id="${columnPositionId}" placeholder="컬럼 위치 (예: 1)" class="form-control mb-2" />
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-primary" onclick="createColumn(${board.id})">추가</button>
                                      <button type="button" class="btn btn-danger" data-dismiss="modal">닫기</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="columns-container"></div>
                            </div>
                          `;

        mainSection.insertAdjacentHTML("beforeend", boardHtml);
        loadColumn(board.id);
      });
    })
    .catch((error) => {
      console.error("Error fetching boards:", error);
      alert("보드 불러오기 중 에러 발생: " + error.message);
    });
}

//컬럼 생성
async function createColumn(boardId) {
  const obj = {};
  obj.title = document.getElementById(`columnTitle-${boardId}`).value;
  obj.position = document.getElementById(`columnPosition-${boardId}`).value;

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("Authorization"),
    },
    body: JSON.stringify(obj),
  };

  try {
    const fetchedData = await fetch(
      `http://localhost:3000/board/${boardId}/column`,
      option,
    ).then((data) => {
      return data.json();
    });
    location.reload();
  } catch (e) {
    console.error(e);
  }
}

//컬럼 조회
async function loadColumn(boardId) {
  if (!boardId) {
    console.error("No boardId provided to loadColumn function.");
    return;
  }
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("Authorization"),
    },
  };

  const response = await fetch(
    `http://localhost:3000/board/${boardId}/column`,
    option,
  );
  if (!response) {
    console.error(
      `Failed to load columns for boardId: ${boardId}. Status: ${response.status}`,
    );
    return;
  }

  const columnData = await response.json();
  const columns = columnData.data || columnData;

  // position 값에 따라 컬럼을 정렬
  columns.sort((a, b) => a.position - b.position);

  const container = document.querySelector(
    `#mainBoard[data-board-id="${boardId}"] .columns-container`,
  );
  if (!container) {
    console.error(`Failed to find the container for boardId: ${boardId}.`);
    return;
  }

  container.innerHTML = "";
  columns.forEach((data) => {
    const columnDiv = document.createElement("div");
    columnDiv.classList.add("col-lg-3", "col-md-6", "col-sm-12", "mb-4");

    columnDiv.innerHTML += `
                              <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
                              <div class="column h-100 p-2 bg-light rounded">
                                <h4>${data.title}</h4>
                                
                                <button
                                  data-toggle="modal"
                                  data-target="#addCardModal"
                                  class="btn btn-secondary mt-3"
                                >
                                  카드 추가
                                </button>
                              </div>
                            </div>

                            <div class="modal fade" id="addCardModal">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h4 class="modal-title">카드 추가</h4>
                                  <button type="button" class="close" data-dismiss="modal">
                                    &times;
                                  </button>
                                </div>
                                <div class="modal-body">
                                  <label for="cardTitle">카드 제목</label>
                                  <input
                                    type="text"
                                    id="cardTitle"
                                    placeholder="카드 제목"
                                    class="form-control mb-2"
                                  />

                                  <label for="cardContent">카드 내용</label>
                                  <textarea
                                    id="cardContent"
                                    placeholder="카드 내용을 입력하세요."
                                    class="form-control mb-2"
                                    rows="3"
                                  ></textarea>

                                  <label for="dueDate">마감일</label>
                                  <input
                                    type="date"
                                    id="dueDate"
                                    placeholder="마감일"
                                    class="form-control mb-2"
                                  />

                                  <label for="cardColor">색깔</label>
                                  <input type="color" id="cardColor" class="form-control mb-2" />

                                  <label for="cardPosition">순서</label>
                                  <input
                                    type="number"
                                    id="cardPosition"
                                    placeholder="순서 (예: 1)"
                                    class="form-control mb-2"
                                  />
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-primary"onclick="addCard()">
                                    추가
                                  </button>
                                  <button type="button" class="btn btn-danger" data-dismiss="modal">
                                    닫기
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        `;
    container.appendChild(columnDiv);
  });
}

// 📚 새로운 보드 생성
async function createBoard() {
  const title = document.getElementById("titleBoard").value;
  const description = document.getElementById("descriptionBoard").value;
  const color = document.getElementById("colorBoard").value;
  // 토큰값 가져오기
  const token = sessionStorage.getItem("Authorization");

  try {
    const response = await fetch("http://localhost:3000/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ title, description, color }),
    });

    const data = await response.json();

    if (response.status === 201) {
      // 모달 창을 닫습니다.
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
