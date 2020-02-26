# SOPT-3rd-and-4th-assignment

`Node.js 서버`를 통해 `블로그`를 구현한 프로젝트입니다.

`Blog, Article, Comment`의 `CRUD`를 구현하였습니다.

### 📘 ~/blog

#### [GET]

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### [POST]

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |

##### Request - Body

| 변수     | 타입   | 설명               |
| -------- | ------ | ------------------ |
| username | String | 블로그 주인의 이름 |
| blogname | String | 블로그 이름        |
| describe | String | 블로그 설명        |
| password | String | 패스워드           |

#### [PUT]

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |

##### Request - Body

| 변수         | 타입   | 설명                 |
| ------------ | ------ | -------------------- |
| blog_id      | Int    | 변경할 블로그의 Idx  |
| username     | String | 블로그 주인의 이름   |
| blogname     | String | 블로그 이름          |
| describe     | String | 블로그 설명          |
| password     | String | 패스워드             |
| new_password | String | 새로 변경할 패스워드 |

#### [DELETE]

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |

##### Request - Body

| 변수     | 타입   | 설명                     |
| -------- | ------ | ------------------------ |
| blogIdx  | Int    | 삭제할 블로그의 Idx      |
| password | String | 삭제할 블로그의 패스워드 |

### 📰 ~/blog/:blog_id/article

#### [GET]

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### [POST]

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |

##### Request - Body

| 변수    | 타입   | 설명                   |
| ------- | ------ | ---------------------- |
| blog_id | Int    | 글을 작성할 블로그 Idx |
| title   | String | 글 제목                |
| content | String | 글 내용                |

#### [PUT]

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |

##### Request - Body

| 변수          | 타입   | 설명                                                 |
| ------------- | ------ | ---------------------------------------------------- |
| board_id      | Int    | 변경할 글의 Idx                                      |
| title         | String | 글 제목                                              |
| content       | String | 글 내용                                              |
| blog_password | String | 블로그 주인만 업데이트할 수 있도록 하기위한 비밀번호 |

#### [DELETE]

##### Request - Header

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |

##### Request - Body

| 변수          | 타입   | 설명                                             |
| ------------- | ------ | ------------------------------------------------ |
| blog_id       | Int    | 변경할 글의 블로그 Idx                           |
| board_id      | Int    | 변경할 글의 Idx                                  |
| blog_password | String | 블로그 주인만 삭제할 수 있도록 하기위한 비밀번호 |

> comment는 article과 유사합니다.
