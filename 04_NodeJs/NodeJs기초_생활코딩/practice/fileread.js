var fs = require('fs')

fs.readFile('sample.txt', 'utf8',function(err, data){
  console.log(data);
  // 파일을 읽은 후 어떤 행위를 할지 입력해주자.
})
