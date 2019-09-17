
/*
function a() {
  console.log('A');

}
*/

var a = function() {
  console.log('A');

}

function slow(callback) {
  callback();
}

slow(a);
//실행이 끝나고 실행이 끝났으니 다음일 해라.
