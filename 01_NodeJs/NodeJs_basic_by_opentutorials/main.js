var http = require('http');
var fs = require('fs');
//url이라는 모듈을 url에 담아서 사용할 것이다.
var url = require('url');
var qs = require('querystring');

//cont는 홈에서는 수정버튼을 만들지 않기 위함이다.



var template = {
  "html" : function (title, list, body, cont){
    return   `<!doctype html>
      <html>
      <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
      </head>
      <body>

        <h1><a href="/">WEB</a></h1>

        ${list}
        ${cont}
        ${body}

      </body>
      </html>`
      ; },

      "list" : function(filelist){
        var list = '<ul>';
        for(var i = 0; i < filelist.length ;i++){
          list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        }
        list += '</ul>';
        return list;
      }

}

// 리퀘스트에 사용자가 요청한 정보, 리스폰스에 응답한 정보
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
          description = 'Hello!';

          var list = template.list(filelist);
            // 읽어온 파일을 description에 인자로 넘겨준다.
            var html = template.html(title, list, `<h2>${title}</h2>
            <p>${description}</p>`, `<a href="/create">create</a> `);

            response.writeHead(200);
            response.end(html);

      });
    }

      else {

      fs.readdir('./data', function(err, filelist){

        fs.readFile(`data/${title}`, 'utf8',function(err, description){

          var list = template.list(filelist);
          // 읽어온 파일을 description에 인자로 넘겨준다.
          var html = template.html(title, list, `<h2>${title}</h2>
          <p>${description}</p>`, `<a href="/create">create</a>
                <a href="/update?id=${title}">update</a>
                <form action="/delete_process" method = "post" style = "display : inline-block;">
                  <input type="hidden" name = "id" value = "${title}">
                  <input type="submit" value = "delete">
                </form>
                `);
                // 어느 페이지를 수정할지 알려주기 위함이다.

          response.writeHead(200);
          response.end(html);

          });
      });

      }

    }

    //글생성 pathname이면..
    else if (pathname === '/create') {

      fs.readdir('./data', function(err, filelist){

        title = 'Create - info';

        var list = template.list(filelist);
          // 읽어온 파일을 description에 인자로 넘겨준다.
          var html = template.html(title, list,
            `
            <form action = "http://localhost:3000/create_process" method = "post">
              <p>
                <input type="text" name="title" placeholder = "title">
              </p>
              <p>
                <textarea name = "description" placeholder = "description"></textarea>
              </p>
              <p>
                <input type="submit"> <!--제출-->
              </p>
            </form>

            `, ``);

          response.writeHead(200);
          response.end(html);
    });
  }

    // 제출되면 이동하는 페이지.
    // 이제 post로 넘어오면 어떡할 것인가?
    else if (pathname ==='/create_process') {

      var body = '';

      // 전송받는 데이터가 많을지도 모르니 조각조각 받는다.
      // 한 조각 받을때마다 콜백실행
      request.on('data', function(data){
        body += data;
      });

      // 더이상 들어올 것이 없으면 이거 실행
      // 정보 가져오기가 끝난 것이다.
      request.on('end', function(){
        // 객체로 담아준다. 객체화
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;

        fs.writeFile(`data/${title}`, description, 'utf8', function(err){

          // 글이 완료되면 그 페이지로 보내주자.
          // 그럴때 사용되는게 301 코드
          response.writeHead(301, {Location:`/?id=${title}`});
          response.end();
        });

      });

    }

    else if (pathname === '/update') {

      fs.readdir('./data', function(err, filelist){

        fs.readFile(`data/${title}`, 'utf8',function(err, description){

          var list = template.list(filelist);
          // 읽어온 파일을 description에 인자로 넘겨준다.
          var html = template.html(title, list,
            `
            <form action = "http://localhost:3000/update_process" method = "post">
              <p>
              <!--제목도 수정하게 해주자. 근데 타이틀이 바뀌면 원래의 것이 뭔지 모르니, 원래의 것은 id로 주자.-->
                <input type="hidden" name="id" placeholder = "title" value = "${title}">
                <input type="text" name="title" placeholder = "title" value = "${title}">
                <!--기본값이 원래있던 것으로 들어가도록 해주자.-->
              </p>
              <p>
                <textarea name = "description" placeholder = "description">${description}</textarea>
              </p>
              <p>
                <input type="submit"> <!--제출-->
              </p>
            </form>

            `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
                // 어느 페이지를 수정할지 알려주기 위함이다.

          response.writeHead(200);
          response.end(html);

          });
      });
    }

    // 받은 정보의처리
    else if (pathname === '/update_process') {

      var body = '';

      // 전송받는 데이터가 많을지도 모르니 조각조각 받는다.
      // 한 조각 받을때마다 콜백실행
      request.on('data', function(data){
        body += data;
      });

      // 더이상 들어올 것이 없으면 이거 실행
      // 정보 가져오기가 끝난 것이다.
      request.on('end', function(){
        // 객체로 담아준다. 객체화
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;

        console.log(post);
        // 타이틀이 바뀌면 파일 리네임이 필요하다.
        fs.rename(`data/${id}`, `data/${title}`, function(err){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            // 글이 완료되면 그 페이지로 보내주자.
            // 그럴때 사용되는게 301 코드
            response.writeHead(302, {Location:`/?id=${title}`});
            response.end();
        });

        });

      });
    }

    else if (pathname === '/delete_process') {

      var body = '';

      // 전송받는 데이터가 많을지도 모르니 조각조각 받는다.
      // 한 조각 받을때마다 콜백실행
      request.on('data', function(data){
        body += data;
      });

      // 더이상 들어올 것이 없으면 이거 실행
      // 정보 가져오기가 끝난 것이다.
      request.on('end', function(){
        // 객체로 담아준다. 객체화
        var post = qs.parse(body);
        var id = post.id;
        console.log(post);
        // 타이틀이 바뀌면 파일 리네임이 필요하다.
        fs.unlink(`data/${id}`, function(){
          response.writeHead(302, {Location: `/`});
          response.end();
        });

      });
    }

    // 404에러
    else {
      // 이외의 경로로 접근
      response.writeHead(404);
      response.end('Not found');
    }
  });
app.listen(3000);
