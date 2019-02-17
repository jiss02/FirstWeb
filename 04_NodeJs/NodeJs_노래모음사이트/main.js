var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var app = http.creatServer(function(request, response){

  // 주소를 받고 데이터를 잘 처리하도록 url을 파싱한다.
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  // 경로에 있으면
  if(pathname === '/'){
    // 아무것도 들어오지 않은 경우. 홈페이지.
    if(queryData.id === undefined){
      fs.readdir('./data', function(err, filelist) {
        var title = 'Welcome';
        var description = '좋아하는 노래를 기록해 놓는 사이트';
        var list = template.list(filelist);

        //들어갈 내용
        var html = template.html(title, list, ``)


      })
    }
  }


});

app.listen(3000);
