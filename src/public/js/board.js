// 페이지 로드 시 실행될 함수
document.addEventListener("DOMContentLoaded", loadBoards);

// 페이지 로드 시 보드 데이터 불러와서 렌더링
function loadBoards() {
  fetch("http://localhost:3000/board")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((board) => {
        renderBoard(board);
      });
    })
    .catch((error) => {
      console.error("Error fetching boards:", error);
      alert("보드 불러오기 중 에러 발생");
    });
}

// 주어진 보드 데이터로 보드 렌더링
function renderBoard(board) {
  const boardHtml = `
                      <div class="board w-100 p-3 mt-5 border" style="background-color:${board.color}">
                          <div class="d-flex justify-content-between align-items-center mb-3">
                              <h1>${board.title}</h1>
                              <div class="d-flex align-items-center">
                                  <p class="mb-1 mr-3">참여중인 유저 :</p>
                                  <button data-toggle="modal" data-target="#inviteUserModal" class="btn btn-primary mb-1 mr-3">
                                      유저 초대
                                  </button>
                                  <button data-toggle="modal" data-target="#addColumnModal" class="btn btn-primary mb-1">
                                      컬럼 추가
                                  </button>
                              </div>
                          </div>
                          <div class="description">
                              ${board.description}
                          </div>
                      </div>
                  `;

  const mainSection = document.querySelector("main");
  mainSection.insertAdjacentHTML("beforeend", boardHtml);
}

document
  .getElementById("createBoardbtn")
  .addEventListener("click", createBoard);

// 새로운 보드 생성
function createBoard() {
  const title = document.getElementById("titleBoard").value;
  const description = document.getElementById("descriptionBoard").value;
  const color = document.getElementById("colorBoard").value;

  fetch("http://localhost:3000/board", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, color }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
      }
      renderBoard({
        title: title,
        description: description,
        color: color,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("보드 생성 중 에러 발생");
    });
}

//보드 상세 보기 함수
