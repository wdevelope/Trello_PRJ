// 페이지 로드 시 실행될 함수
// document.addEventListener("DOMContentLoaded", loadColumn);
//컬럼 조회

async function loadColumn(boardId) {
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("Authorization"),
    },
  };

  const column = (
    await fetch(`http://localhost:3000/board/${boardId}/column`, option).then(
      (d) => d.json(),
    )
  ).data;

  const container = document.getElementById("mainBoard");
  container.innerHTML = "";
  column.forEach((data) => {
    const columnDiv = document.createElement("div");
    columnDiv.classList.add("col-lg-3", "col-md-6", "col-sm-12", "mb-4");
    const modalId = `addCardModal-${data.id}`; // 모달의 고유한 ID 생성
    columnDiv.innerHTML = `
    <div class="column h-100 p-2 bg-light rounded">
      <h4>${data.title}</h4>
      
      <button
        data-toggle="modal"
        data-target="#${modalId}"
        class="btn btn-secondary mt-3"
      >
        카드 추가
      </button> 
    </div>

<div class="modal fade" id="${modalId}">
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
//컬럼 생성
async function createColumn(board) {
  const obj = {};
  obj.title = $("#columnTitle").val();
  obj.position = $("#columnPosition").val();

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
      `http://localhost:3000/board/${board.id}/column`,
      option,
    ).then((data) => {
      return data.json();
    });
    console.log(fetchedData);
    // location.reload();
  } catch (e) {
    console.error(e);
  }
}

//컬럼 수정
async function updateColumn(boardId, columnId) {
  const obj = {};
  obj.title = $("#columnTitle").val();
  obj.position = $("#columnPosition").val();

  const option = {
    method: PUT,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("Authorization"),
    },
    body: JSON.stringify(obj),
  };

  try {
    const fetchedData = await fetch(
      `http://localhost:3000/board/${boardId}/column/${columnId}`,
      option,
    ).then((data) => {
      return data.json();
    });
    console.log(fetchedData);
    location.reload();
  } catch (e) {
    console.error(e);
  }
}
//컬럼 삭제
async function deleteColumn(boardId, columnId) {
  const option = {
    method: DELETE,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("Authorization"),
    },
  };

  try {
    const fetchedData = await fetch(
      `http://localhost:3000/board/${boardId}/column/${columnId}`,
      option,
    ).then((data) => {
      return data.json();
    });
    console.log(fetchedData);
    location.reload();
  } catch (e) {
    console.error(e);
  }
}

module.exports = Column;
