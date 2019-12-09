# :green_book: ​NodeJs 

Node.Js에 관한 프로젝트 및 실습을 업로드 하는 공간입니다.



## SOPT-1st-assignment

Node.js의 `routing`이 어떻게 이루어지는지에 대한 간단한 실습입니다.

로직은 따로 없으며, 아래의 라우팅만 구현하였습니다.

```
/api/cafe
/api/blog
/api/news
/api/news/like
```

## SOPT-2nd-assignment

Node.js  서버를 통해 

Level 1. SOPT 25기 멤버들의 정보를 조회하고

Level 2. groupIdx가 아닌 **그룹 이름**으로 보여주며

Level 3. 팀원을 랜덤으로 생성해주는 `Mixer`모듈을 구현한 실습입니다.

```
/api/cafe
/api/group/:groupIdx
/api/mixer
```

## SOPT-3rd-and-4th-assignment

Node.js 서버를 통해 블로그를 구현한 프로젝트입니다. 

Blog, Article, Comment의 CRUD를 구현하였습니다.

### :blue_book: ~/blog

#### [GET] 

##### Request - Header

| 메소드       | 파라미터         |
| ------------ | ---------------- |
| Content-Type | application/json |

#### [POST]

##### Request - Header

| 메소드       | 파라미터         |
| ------------ | ---------------- |
| Content-Type | application/json |

##### Request - Body

| 변수     | 타입   | 설명              |
| -------- | ------ | ----------------- |
| username | String | 블로그 주인의 이름 |
| blogname   | String    | 블로그 이름 |
| describe    | String    | 블로그 설명 |
| password    | String    | 패스워드 |

#### [PUT]

##### Request - Header

| 메소드       | 파라미터         |
| ------------ | ---------------- |
| Content-Type | application/json |

##### Request - Body

| 변수     | 타입   | 설명              |
| -------- | ------ | ----------------- |
| blog_id | Int | 변경할 블로그의 Idx |
| username | String | 블로그 주인의 이름 |
| blogname   | String    | 블로그 이름 |
| describe    | String    | 블로그 설명 |
| password    | String    | 패스워드 |
| new_password    | String    | 새로 변경할 패스워드 |

#### [DELETE]

##### Request - Header

| 메소드       | 파라미터         |
| ------------ | ---------------- |
| Content-Type | application/json |

##### Request - Body

| 변수    | 타입 | 설명                |
| ------- | ---- | ------------------- |
| blogIdx | Int  | 삭제할 블로그의 Idx |
| password    | String    | 삭제할 블로그의 패스워드 |

### :newspaper: ~/blog/:blog_id/article

#### [GET]

##### Request - Header

| 메소드       | 파라미터         |
| ------------ | ---------------- |
| Content-Type | application/json |

#### [POST]

##### Request - Header

| 메소드       | 파라미터         |
| ------------ | ---------------- |
| Content-Type | application/json |

##### Request - Body

| 변수     | 타입   | 설명              |
| -------- | ------ | ----------------- |
| blog_id | Int | 글을 작성할 블로그 Idx |
| title | String    | 글 제목 |
| content | String    | 글 내용 |

#### [PUT]

##### Request - Header

| 메소드       | 파라미터         |
| ------------ | ---------------- |
| Content-Type | application/json |

##### Request - Body

| 변수     | 타입   | 설명              |
| -------- | ------ | ----------------- |
| board_id | Int | 변경할 글의 Idx |
| title | String | 글 제목                                              |
| content       | String | 글 내용                                              |
| blog_password | String    | 블로그 주인만 업데이트할 수 있도록 하기위한 비밀번호 |

#### [DELETE]

##### Request - Header

| 메소드       | 파라미터         |
| ------------ | ---------------- |
| Content-Type | application/json |

##### Request - Body

| 변수    | 타입 | 설명                |
| ------- | ---- | ------------------- |
| blog_id       | Int    | 변경할 글의 블로그 Idx                           |
| board_id      | Int    | 변경할 글의 Idx                                  |
| blog_password | String | 블로그 주인만 삭제할 수 있도록 하기위한 비밀번호 |

> comment는 article과 유사합니다.


## SOPT-5th-assignment

[SOPT-3&4th-assignment]( https://github.com/jiss02/Practice/tree/master/01_NodeJs/SOPT-3rd-and-4th-assignment ) 프로젝트에서 회원관리 기능, 이미지 필드를 추가하여 구현했습니다.

JWT를 이용해 자신이 작성한 글만 수정, 삭제가 가능하도록 구현했습니다.

토큰을이용한 수정 삭제가 가능해지므로 글과 댓글의 id와 password 컬럼을 삭제하였습니다.



## Simple-community

장고로 구현했던 게시글과 댓글 crud, 회원가입등을 노드로 구현한 실습입니다. 

