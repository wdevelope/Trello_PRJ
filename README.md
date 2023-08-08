# 🔥 협업툴 Trello 프로젝트

- 프로젝트 협업 작업관리 사이트
- express, javascript 함수화를 사용해서 아키텍쳐 패턴으로 서버구현
- 서버실행 npm run dev

<br>

# 🔥 ERD

![ERD](https://ifh.cc/g/p8bVhM.png)

1. Users : 유저
2. Boards : 보드
3. Columns : 보드 안에 컬럼
4. Cards : 컬럼 안에 카드
5. Comments : 카드 안에 댓글
6. BoardMember : 보드 멤버 관리
7. CardMember : 카드 멤버 관리

<br>

# 🔥 api 가이드

### user (유저)

1. 회원가입 (POST) = /user/signup
2. 로그인 (GET) = /user/login
3. 유저 조회 (DELETE) = /user/:id
4. 유저 정보 수정 (PUT) = /user/:id
5. 유저 삭제 (DELETE) = /user/:id

### board (보드 관련)

1. 생성 (POST) = /board
2. 조회 (GET) = /board
3. 삭제 (DELETE) = /board/:boradId
4. 수정 (PUT) = /board/:boardId
5. 초대 (POST) = /board/:boardId

### column (컬럼 관련)

1. 생성 (POST) = /board/:boardId/column
2. 조회 (GET) = /board/:boardId/column/:columnId
3. 삭제 (DELETE) = /board/:boardId/column/:columnId
4. 수정 (PUT) = /board/:boardId/column/:columnId

### card (카드 관련)

1. 생성 (POST) = /board/:boardId/column
2. 조회 (GET) = /board/:boardId/column/:columnId
3. 삭제 (DELETE) = /board/:boardId/column/:columnId
4. 수정 (PUT) = /board/:boardId/column/:columnId

### comment (댓글 관련)

1. 생성 (POST) = /board/:boradId/column/:columnId/card/:cardId/comment
2. 조회 (GET) = /board/:boradId/column/:columnId/card/:cardId/comment
3. 삭제 (DELETE) = /board/:boradId/column/:columnId/card/:cardId/comment/:commentId
4. 수정 (PUT) = /board/:boradId/column/:columnId/card/:cardId/comment/:commentId
