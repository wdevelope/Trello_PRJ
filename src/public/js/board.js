//보드 등록 함수
function createBoard() {
  const title = document.getElementById("titleBoard").value;
  const description = document.getElementById("descriptionBoard").value;
  const color = document.getElementById("colorBoard").value;
  alert(title, description, color);
  console.log(title, description, color);
  console.log(title, description, color);
  fetch("http://localhost:3000/board", {
    /*로컬에 userId 가져와야하는데?! */ method: "POST",
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
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//보드 상세 보기 함수
