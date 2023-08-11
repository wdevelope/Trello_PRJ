# 🔥 협업툴 Trello 프로젝트

- 프로젝트 협업관리 사이트 <Trello> 벤치마킹 프로젝트
- express, javascript 사용 아키텍쳐 패턴으로 서버구현
- 서버실행 npm run dev
- public : 프론트폴더

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
2. 로그인 (POST) = /user/login
3. 유저 조회 (DELETE) = /user/:id
4. 유저 정보 수정 (PUT) = /user/:id
5. 유저 삭제 (DELETE) = /user/:id

### board (보드)

1. 생성 (POST) = /board
2. 조회 (GET) = /board/:userId
3. 삭제 (DELETE) = /board/:boradId
4. 수정 (PUT) = /board/:boardId
5. 초대 (POST) = /board/:boardId

### boardMember (보드멤버)

1. 초대 (POST) = /boardMember/:boardId
2. 조회 (GET) = /boardMember/:boardId
3. 삭제 (DLELETE) = /boardMember/:boardId

### column (컬럼)

1. 생성 (POST) = /board/:boardId/column
2. 조회 (GET) = /board/:boardId/column/:columnId
3. 삭제 (DELETE) = /board/:boardId/column/:columnId
4. 수정 (PUT) = /board/:boardId/column/:columnId

### card (카드)

1. 생성 (POST) = /column/card
2. 전체조회 (GET) = /column/:columnId/card
3. 상세조회 (GET) = /column/:columnId/card/:cardId
4. 삭제 (DELETE) = /column/:columnId/card/:cardId
5. 수정 (PUT) = /column/:columnId/card/:cardId

### comment (댓글)

1. 생성 (POST) = /card/:cardId/comment
2. 조회 (GET) = /card/:cardId/comment
3. 삭제 (DELETE) = /card/:cardId/comment/:commentId
4. 수정 (PUT) = /card/:cardId/comment/:commentId
