# SOPT-5th-assignment

[SOPT-3&4th-assignment]( https://github.com/jiss02/Practice/tree/master/01_NodeJs/SOPT-3rd-and-4th-assignment ) 프로젝트에서 `회원관리 기능, 이미지 필드를 추가`하여 구현했습니다.

### BASEURL:  http://15.165.67.97:3000

> 2020.01.06 현재 닫힌 상태

### 로그인 / 회원가입

#### :pencil2: ~/user/register

| 변수     | 타입   | 설명     |
| -------- | ------ | -------- |
| id       | String | 아이디   |
| password | String | 비밀번호 |
| username | String | 닉네임   |
| email    | String | 이메일   |

#### :key: ~/user/login

##### Request - Body

| 변수     | 타입   | 설명     |
| -------- | ------ | -------- |
| id       | String | 아이디   |
| password | String | 비밀번호 |

### 블로그 / 게시글

#### :blue_book: ~/blog

#### [GET] 

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### [POST] ~/blog/:blogIdx

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |
| token        | 토큰값           |

##### Request - Body

| 변수     | 타입   | 설명        |
| -------- | ------ | ----------- |
| blogname | String | 블로그 이름 |
| summary  | String | 블로그 설명 |

#### [PUT] ~/blog/:blogIdx

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |
| token        | 토큰값           |

##### Request - Body

| 변수     | 타입   | 설명        |
| -------- | ------ | ----------- |
| blogname | String | 블로그 이름 |
| summary  | String | 블로그 설명 |

#### [DELETE] ~/blog/:blogIdx

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |
| token        | 토큰값           |

#### :newspaper: ~/blog/:blogIdx/board

#### [GET]

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### [POST] ~/blog/:blogIdx/board/:boardIdx

##### Request - Header

| KEY          | VALUE               |
| ------------ | ------------------- |
| Content-Type | multipart/form-data |
| token        | 토큰값           |

##### Request - Body

| 변수    | 타입   | 설명        |
| ------- | ------ | ----------- |
| title   | String | 글 제목     |
| content | String | 글 내용     |
| image   | Files  | 글의 이미지 |

#### [PUT] ~/blog/:blogIdx/board/:boardIdx

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |
| token        | 토큰값           |

##### Request - Body 

| 변수    | 타입   | 설명    |
| ------- | ------ | ------- |
| title   | String | 글 제목 |
| content | String | 글 내용 |

#### [DELETE] ~/blog/:blogIdx/board/:boardIdx

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |
| token        | 토큰값           |

### **추가 사항 요약**

#### Article Table에 Image Field를 추가

Article을 작성할 때 이미지 파일도 업로드 할 수 있습니다.

> [심화] 만약 하나의 게시글 에서 복수개의 이미지 업로드

##### article의 CREAT, PUT에서 image컬럼이 추가되었습니다.

| 변수    | 타입   | 설명                   |
| ------- | ------ | ---------------------- |
| blogIdx | Int    | 글을 작성할 블로그 Idx |
| title   | String | 글 제목                |
| content | String | 글 내용                |
| image   | Files  | 글의 이미지            |

**이미지 파일을 전송하므로 Header또한 바뀝니다.**

| KEY          | VALUE               |
| ------------ | ------------------- |
| Content-Type | multipart/form-data |

#### 로그인 회원가입을 추가

> 이때 로그인에서 성공한 경우 token값을 반환.

#### 모든 객체(블로그, 게시글, 댓글)의 작성, 수정, 삭제는 token을 이용해서 검증단계를 거침

> [심화] 보충세미나에서 다룬 미들웨어 적용

JWT를 이용해 자신이 작성한 글만 수정, 삭제가 가능하도록 구현했습니다.

**이제 CREATE, PUT, DELETE 메소드를 요청할 시, Header에 토큰을 넣어 전송해야합니다.**

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |
| token        | 토큰값           |

> 추가 기능을 구현하기 위한 과제이므로 comment 구현은 하지 않았습니다. 추후 구현할 예정입니다.
