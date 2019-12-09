// responseMessage.js
// 통일성을위해 응답메세지에 관련된 것을 이곳에 넣어 한꺼먼에 관리하자.
// 변하지 않는 상수 값이라 대문자와 언더스코어만 사용

module.exports = {
    EMPTY: "불러올 목록이 없습니다.", 
    NULL_VALUE: "필요한 값이 없습니다.",
    OUT_OF_VALUE: "파라미터 값이 잘못 되었습니다.",
    
    ALREADY_ID: "존재하는 ID 입니다.",
    SIGN_UP_SUCCESS: "회원가입 성공",
    SIGN_UP_FAIL: "회원 가입 실패",
    SIGN_IN_SUCCESS: "로그인 성공",
    SIGN_IN_FAIL: "로그인 실패",
    MISS_MATCH_PW: "비밀번호가 일치하지 않습니다",
    NO_USER: "존재하지 않는 유저 입니다.",
    NOT_LOGIN: "로그인이 필요합니다.",

    NO_BOARD: "존재하지않는 게시글 입니다.",
    BOARD_CREATE_SUCCESS: "게시글 작성 성공",
    BOARD_CREATE_FAIL: "게시글 작성 실패",
    BOARD_READ_ALL_SUCCESS: "게시글 전체 조회 성공",
    BOARD_READ_ALL_FAIL: "게시글 전체 조회 실패",
    BOARD_READ_SUCCESS: "게시글 조회 성공",
    BOARD_READ_FAIL: "게시글 조회 실패",
    BOARD_UPDATE_SUCCESS: "게시글 수정 성공",
    BOARD_UPDATE_FAIL: "게시글 수정 실패",
    BOARD_DELETE_SUCCESS: "게시글 삭제 성공",
    BOARD_DELETE_FAIL: "게시글 삭제 실패",

    EMPTY_BLOG: "불러올 블로그가 존재하지 않습니다. 블로그를 만들어보세요!",
    NO_BLOG: "존재하지않는 블로그 입니다.",
    BLOG_CREATE_SUCCESS: "블로그 작성 성공",
    BLOG_CREATE_FAIL: "블로그 작성 실패",
    BLOG_READ_ALL_SUCCESS: "블로그 전체 조회 성공",
    BLOG_READ_ALL_FAIL: "블로그 전체 조회 실패",
    BLOG_READ_SUCCESS: "블로그 조회 성공",
    BLOG_READ_FAIL: "블로그 조회 실패",
    BLOG_UPDATE_SUCCESS: "블로그 수정 성공",
    BLOG_UPDATE_FAIL: "블로그 수정 실패",
    BLOG_DELETE_SUCCESS: "블로그 삭제 성공",
    BLOG_DELETE_FAIL: "블로그 삭제 실패",
    BLOG_READ_ALL_SUCCESS: "블로그 전체 조회 성공",

    NO_COMMENT: "존재하지않는 댓글 입니다.",
    COMMENT_CREATE_SUCCESS: "댓글 작성 성공",
    COMMENT_CREATE_FAIL: "댓글 작성 실패",
    COMMENT_READ_ALL_SUCCESS: "댓글 전체 조회 성공",
    COMMENT_READ_ALL_FAIL: "댓글 전체 조회 실패",
    COMMENT_READ_SUCCESS: "댓글 조회 성공",
    COMMENT_READ_FAIL: "댓글 조회 실패",
    COMMENT_UPDATE_SUCCESS: "댓글 수정 성공",
    COMMENT_UPDATE_FAIL: "댓글 수정 실패",
    COMMENT_DELETE_SUCCESS: "댓글 삭제 성공",
    COMMENT_DELETE_FAIL: "댓글 삭제 실패",
    COMMENT_READ_ALL_SUCCESS: "댓글 전체 조회 성공",


    INTERNAL_SERVER_ERROR: "서버 내부 오류",

    INVALID_TOKEN: "잘못된 형식의 토큰입니다.",
    EMPTY_TOKEN: "토큰값이 존재하지 않습니다.",
    EXPIRED_TOKEN: "만료된 토큰입니다.",
    EMPTY_REFRESH_TOKEN: "재발급 토큰이 존재하지 않습니다.",
    CREATE_TOKEN: "토큰 발급 완료.",
    REFRESH_TOKEN: "토큰 재발급 완료.",
    NO_SELECT_AUTHORITY: "조회 권한 없음.",
    USER_SELECTED: "회원 조회 성공"
    }