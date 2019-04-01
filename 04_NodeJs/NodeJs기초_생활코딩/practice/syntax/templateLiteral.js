var name = 'hyuns';
var letter = 'Lorem' + name + '\nipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et' + name + 'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' + name + 'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

// 위에 처럼 일일히 \n 같은 것을 쳐주는 것이 불편해 새로운 문법을 고안하게된다. 이게바로 템플릿 리터럴.

//문자 끊고 + 로 연결하기 귀찮잖아. 그래서 ${}써주는거임! 훨씬 간단해졌다.
// 변수를 넣으면 변수 치환이 되고, 식을 넣는 것도 된다.
var letter = `Dear ${name}

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et ${1+1} dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

console.log(letter);
