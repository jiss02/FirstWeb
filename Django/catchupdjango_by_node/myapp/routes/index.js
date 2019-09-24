var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('mysql');
var con = require('../mysql');

// 같은 유저인지 체크
router.use(['/update/:blog_id','/delete/:blog_id'], function(req, res, next){
  
  con.query('select auth_id from blogs b join users u on b.auth_id = u.id and b.id = ? ;',[req.params.blog_id], function(err, result){
    console.log('auth_id is....',result)
    var result = result[0]
    if(req.user.id === result.auth_id){
      next()
    }
    else {
      req.flash('fmsg','작성자만 수정/삭제가 가능합니다.');
      res.redirect(`/detail/${req.params.blog_id}`);
    }
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  
  // 로그인 판별
  var check = {
    msg : '',
    flag : false,
  }

  if(req.user) {
    check.msg = `환영합니다 ${req.user.nickname} 님!`;
    check.flag = true;
  }
  else {
    check.msg = '로그인후 글을 작성해보세요!';
    check.flag = false;
  }

  //var sql = `SELECT * FROM blogs;`;
  //var sql = `SELECT * from users inner join blogs on blogs.auth_id = users.id join comment on comment.auth_id = users.id`;

  var sql = `SELECT title, nickname, content, blogs.id from users inner join blogs on blogs.auth_id = users.id;`;

  con.query(sql, function(err, result){
    if (err) throw err;
    var blogs = result;
    console.log('///////////',blogs);
    res.render('index', { title: 'Express', blogs: blogs, check: check});
  });
  
});

// 글쓰기
router.get('/write', function(req,res,next){
  res.render('crud/write', { title: 'Write' });
});

router.post('/write',function(req, res, next){

  var par = req.body;
  var sql = `INSERT INTO blogs (title, content, auth_id) VALUES ('${par.title}', '${par.content}', ${req.user.id});`;
  con.query(sql, function(err, result){
    if(err) throw err;
    res.redirect(`/`);
  });
});

// 수정
router.get('/update/:blog_id', function(req, res, next){
  
  var sql = `SELECT * FROM blogs WHERE id = ${req.params.blog_id};`;
  
  con.query(sql, function(err, result){
    var blog = result[0];
         
    res.render('crud/update', {blog:blog});
  }); 
});

router.post('/update/:blog_id', function(req, res, next){

  var sql = `UPDATE blogs SET title = '${req.body.title}', content = '${req.body.content}' WHERE id = ${req.params.blog_id};`;
  
  con.query(sql, function(err, result){
    if(err) throw err;
    console.log(result);
         
    res.redirect(`/detail/${req.params.blog_id}`);
  });  
});

// 삭제
router.post('/delete/:blog_id', function(req, res, next){

  var sql = `DELETE FROM blogs WHERE id = ${req.params.blog_id};`;
  con.query(sql, function(err, result){
    if (err) throw err;       
    res.redirect('/');
  });

});

module.exports = router;
