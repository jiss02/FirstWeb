var http = require('http');
var fs = require('fs');
//url이라는 모듈을 url에 담아서 사용할 것이다.
var url = require('url');

function templateHTML(title, list, body){
  return   `<!doctype html>
    <html>
    <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>

      <h1><a href="/">WEB</a></h1>

      ${list}
      ${body}

    </body>
    </html>`
    ;
}

function templateList(filelist){
  var list = '<ul>';
  for(var i = 0; i < filelist.length ;i++){
    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  }
  list += '</ul>';
  return list;
}

var app = http.createServer(function(request,response){

    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    console.log(title);
    var pathname = url.parse(_url, true).pathname; // path와 다르기 때문에 쿼리스트링은 없다.

    // 사용자가 루트로 접근했는가? (path가 없는 상태)
    if(pathname === '/'){

      //홈으로 접근했을 때를 구분하기 위한 조건문
      if (title === undefined){

        fs.readdir('./data', function(err, filelist){

          title = 'Home';
          description = 'Hello Node.js !';

          var list = templateList(filelist);
            // 읽어온 파일을 description에 인자로 넘겨준다.
            var template = templateHTML(title, list, `<h2>${title}</h2>
            <p>${description}</p>`);

            response.writeHead(200);
            response.end(template);

      });

    } else {

      fs.readdir('./data', function(err, filelist){

        fs.readFile(`data/${title}`, 'utf8',function(err, description){

          var list = templateList(filelist);
          // 읽어온 파일을 description에 인자로 넘겨준다.
          var template = templateHTML(title, list, `<h2>${title}</h2>
          <p>${description}</p>`);

          response.writeHead(200);
          response.end(template);

          });
      });

      }

    }

    else {
      // 이외의 경로로 접근
      response.writeHead(404);
      response.end('Not found');
    }

  });
app.listen(3000);
