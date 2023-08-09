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
