var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('mysql');
var con = require('../mysql');

// 자세히보기
router.get('/:blog_id', function(req, res, next){

  var check = {
    msg : '',
    flag : false,
    sameflag : false,
  }
  
  if(req.user) {
    check.flag = true;
  }
  else {
    check.msg = '로그인후 댓글 작성이 가능합니다.';
    check.flag = false;
  }



  var blogsql = `SELECT blogs.id, title, content, nickname FROM blogs JOIN users ON blogs.auth_id = users.id AND blogs.id = ${req.params.blog_id};`;
  var commentsql = `SELECT users.id, comment.id, nickname, comment FROM comment JOIN users ON comment.auth_id = users.id;`

  con.query(blogsql, function(err, result){
    if (err) throw err;
    var blog = result[0];
    con.query(commentsql, function(err, result){
      if (err) throw err;
      var comment = result;
      res.render('crud/detail', {title: `Detail - ${blog.title}`, blog: blog, comment:comment, check:check, fmsg:req.flash()});
    });
  });
});

// 댓글등록
router.post('/:blog_id/commentcreate', function(req,res, next){
  var par = req.params;
  console.log(req.user);
  var sql = `INSERT INTO comment(comment, blog_id, auth_id) VALUES ('${req.body.comment}', '${par.blog_id}', ${req.user.id});`;

  con.query(sql, function(err, result){
    if (err) throw err;
    res.redirect(`/detail/${par.blog_id}`);
  });
});

module.exports = router;