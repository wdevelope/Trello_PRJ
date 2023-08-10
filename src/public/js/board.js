// 페이지 로드 시 실행될 함수
document.addEventListener("DOMContentLoaded", function () {
  const userId = sessionStorage.getItem("userId");
  if (userId) {
    loadAndRenderBoards(userId);
  } else {
    console.log("로그인이 필요합니다.");
  }
});

// 📚 페이지 로드 시 보드 데이터 렌더링 및 렌더링
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
        const boardHtml = `
                          <div class="board w-100 p-3 mt-5 border" style="background-color:${board.color}">
                              <div class="d-flex justify-content-between align-items-center mb-3">
                                  <h1>${board.title}</h1>
                                  <div class="d-flex align-items-center">
                                      <p class="mb-1 mr-3">참여중인 유저 :</p>
                                      <button data-toggle="modal" data-target="#inviteUserModal" class="btn btn-primary mb-1 mr-3">
                                          유저 초대
                                      </button>
                                      <button data-toggle="modal" data-target="#addColumnModal" class="btn btn-primary mb-1" onclick="createColumn(${board.id})">
                                          컬럼 추가
                                      </button>
                                  </div>
                              </div>
                              <div class="description">
                                  ${board.description}
                              </div>
                          </div>
                        `;
        mainSection.insertAdjacentHTML("beforeend", boardHtml);
      });
    })
    .catch((error) => {
      console.error("Error fetching boards:", error);
      alert("보드 불러오기 중 에러 발생: " + error.message);
    });
}

console.log("⭐⭐⭐⭐⭐⭐⭐⭐ :", createColumn(3));

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
