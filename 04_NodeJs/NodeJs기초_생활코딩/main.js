var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');


var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  // url을 분석하는 코. 주어진 url정보를 분석해서 쉽게 사용할 수 있도록 해준다.
  // console.log(url.parse(_url, true).pathname);
  console.log(pathname);
  if (pathname === '/') { // 경로에 있으면,,
    if (queryData.id === undefined) {
      fs.readdir('./data', function(err, filelist) {
        var title = 'welcome';
        var description = 'Hello, Node.js!'
        var list = template.list(filelist);
        // template literal
        var html = template.html(title, list, `<h2>${title}</h2><p>${description}</p>`, `<a href='/create'>create</a>`);
        response.writeHead(200);
        response.end(html);
      });
    } else {
      fs.readdir('./data', function(err, filelist) {
        var filterid = path.parse(queryData.id).base;
        var list = template.list(filelist);
        fs.readFile(`data/${filterid}`, 'utf8', function(err, description) {
          var title = queryData.id;
          // template literal
          var html = template.html(title, list, `<h2>${title}</h2><p>${description}</p>`, `<a href='/create'>create</a> <a href="/update?id=${title}">update</a>
          <form action="delete_process" method="post" onsubmit="real?">
          <input type="hidden" name="id" value="${title}">
          <input type="submit" value ="delete">
          </form>
          `);
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir('./data', function(err, filelist) {
      var title = 'Web - create';
      var list = template.list(filelist);
      // template literal
      var html = template.html(title, list, `
        <form action="/create_process" method = "post">
          <p><input type="text" name="title" placeholder="title"></p>

          <p>
            <textarea name="description" placeholder = "description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `, `<a href='/create'>create</a> <a href="/update?id=${title}">update</a>`);
      response.writeHead(200);
      response.end(html);
    });
  } else if (pathname === "/create_process") {
    var body = '';
    request.on('data', function(data) {
      body = body + data;


    }); //요청한 정보안에 포스트 정보가 있다. 조각조각의 양을 수신할떄마다 서버는 callback함수를 호출하도록약속된다. data라는 인자를 통해서 수신한 정보를 주기로 약속되어있다.
    request.on('end', function() {
      var post = qs.parse(body); // 포스트 정보
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
        response.writeHead(302, {
          Location: `/?id=${title}`
        });
        response.end();
      })
      console.log(post.title);
      console.log(post.description);
    });

  } else if (pathname === '/update') {

    fs.readdir('./data', function(err, filelist) {
      var filterid = path.parse(queryData.id).base;
      var list = template.list(filelist);
      fs.readFile(`data/${filterid}`, 'utf8', function(err, description) {

        var title = queryData.id;
        // template literal
        var html = template.html(title, list, `
          <form action="/update_process" method = "post">
          <input type = "hidden" name = 'id' value="${title}">
            <p><input type="text" name="title" placeholder="title" value = "${title}"></p>

            <p>
              <textarea name="description" placeholder = "description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `, `<a href='/create'>create</a> <a href="/update?id=${title}">update</a>

          `, `<a href='/create'>create</a> <a href="/update?id=${title}">update</a>`);
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === '/update_process') {
    var body = '';
    request.on('data', function(data) {
      body = body + data;
    }); //요청한 정보안에 포스트 정보가 있다. 조각조각의 양을 수신할떄마다 서버는 callback함수를 호출하도록약속된다. data라는 인자를 통해서 수신한 정보를 주기로 약속되어있다.
    request.on('end', function() {
      var post = qs.parse(body); // 포스트 정보
      var title = post.title;
      var id = post.id;
      var description = post.description;

      fs.rename(`data/${id}`, `data/${title}`, function(error) {

        fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
          response.writeHead(302, {
            Location: `/?id=${title}`
          });
          response.end();
        })
      })
      console.log(post);
      console.log(post.title);
      console.log(post.description);
    });

  } else if (pathname === '/delete_process') {
    var body = '';
    request.on('data', function(data) {
      body = body + data;
    }); //요청한 정보안에 포스트 정보가 있다. 조각조각의 양을 수신할떄마다 서버는 callback함수를 호출하도록약속된다. data라는 인자를 통해서 수신한 정보를 주기로 약속되어있다.
    request.on('end', function() {
      var post = qs.parse(body); // 포스트 정보
      var id = post.id;
      fs.unlink(`data/${filterid}`, function(error) {
        response.writeHead(302, {
          Location: `/`
        });
        response.end();
      })
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
