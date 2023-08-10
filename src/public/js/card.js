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
