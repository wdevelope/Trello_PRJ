# 🔥 협업툴 Trello 프로젝트

![MAIN](https://ifh.cc/g/fMZKly.png)

- 프로젝트 협업관리 사이트 <Trello> 벤치마킹 프로젝트
- express, javascript 사용 아키텍쳐 패턴으로 서버구현
- 서버실행 npm run dev
- public : 프론트폴더

<br>

# 🔥 주요 기능

1. 사용자 관리

   회원 가입 및 로그인: 사용자는 간편한 회원 가입 절차를 통해 Trello 프로젝트에 참가할 수 있으며, 기존 회원은 로그인을 통해 서비스에 접근할 수 있습니다.

   회원 정보 : 사용자는 자신의 프로필 정보를 확인가능합니다.

2. 보드 관리

   보드 생성, 수정, 삭제: 사용자는 새로운 보드를 생성할 수 있으며, 기존의 보드를 수정하거나 삭제할 수 있습니다.

   보드 멤버 관리: 보드의 소유자는 다른 사용자를 해당 보드에 초대할 수 있습니다. 초대된 멤버는 보드의 내용을 공유받아 협업할 수 있습니다.

3. 컬럼, 카드, 댓글 관리

   컬럼 생성, 조회, 수정, 삭제: 보드 내에서 사용자는 여러 개의 컬럼을 생성하고 관리할 수 있습니다.

   카드 생성, 조회, 수정, 삭제: 각 컬럼 내에서 사용자는 작업 항목을 나타내는 카드를 생성하고 관리할 수 있습니다.

   댓글 작성, 조회, 삭제 기능 : 각 카드 내에서 사용자는 생성된 카드에 댓글을 생성하고 관리할 수 있습니다.

4. 편의 기능

   키보드 단축키 지원: ESC 키를 이용한 모달 창 닫기 등, 사용자의 편의를 위한 여러 키보드 단축키 기능을 제공합니다.

<br>

# 🔥 개발 일정

![Schedule](https://ifh.cc/g/SYyGVM.png)

<br>

# 🔥 역할 분배

- 지안 : 댓글 api , 로직 복습
- 승원 : 컬럼 api , 컬럼 프론트 , 서버 추가기능
- 형진 : 보드, 보드멤버 api , 소켓 추가기능
- 성원 : 카드, 카드멤버 api , 프론트

<br>

# 🔥 ERD

![ERD](https://ifh.cc/g/Cx5519.jpg)

1. users : 유저
2. boards : 보드
3. columns : 보드 안에 컬럼
4. cards : 컬럼 안에 카드
5. comments : 카드 안에 댓글
6. boardMember : 보드 멤버 관리
7. cardMember : 카드 멤버 관리

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
2. 조회 (GET) = /boardMember/:userId
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
