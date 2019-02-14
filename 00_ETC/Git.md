## Git 기초

## 명령어

- pwd: 현재 위치
- cd: 디렉토리 이동
- mkdir: 디렉토리 만들기
- is -al: 폴더에 있는 것을 보여줌
- clear: cmd 창 청소
- vim memo.txt: 파일 생성
- i: 쓰기모드
- wq: 저장후 나가기
- cat memo.txt: 내용을 보여준다
- status: 상태를 보여준다 (연결 된거나 안된거)
	- untracked file : 추적되고 있지 않은 파일
	- add를 통해서 추가
- cd ..: 뒤로가기

## 보아즈 세션

### 브랜치
 
다른 사람이 하고있는 것을 건들고 싶지 않을 때 따로 가지를 치면 된다

- git branch branchname

만약 다른 브랜치로 이동 하여 작업하고 싶다면,

- git checkout master

### merge

다른 브랜치와 지금 내가 있는 브랜치의 작업을 합치고 싶을 때

뒤에서 앞에꺼 머지하고, 앞에서 뒤에꺼로 역으로 머지해주면 된다. (?)
