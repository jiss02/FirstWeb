// 필요 모듈 불러오기
var express = require('express');
var router = express.Router();
var con = require('../mysql');
var bcrypt = require('bcrypt-nodejs')
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

/////////// 로그인 ////////////
router.get('/login', function(req, res, next){
  var fmsg = req.flash();
  var feed = '';
  if(fmsg.error){
    feed = fmsg.error[0];
  }
  res.render('login/login', {fmsg:feed})
});

router.post('/login',
// 로그인이 되면, 리퀘스트의 유저로 자동 전달 된다.
// 패스포트를 사용함으로서 리퀘스트의 유저객체를 사용할 수 있게됨.
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/users/login',
                                   failureFlash: true })
);

/////////// 로그아웃 ////////////
router.get('/logout', function(req, res){
  req.logout()

  // 현재 상태를 저장하고 고고
  req.session.destroy(function(err){
    res.redirect('/');
  });
});

////////// 회원가입 ////////////
router.get('/signup', function(req, res, next){
  res.render('login/signup');
});

router.post('/signup', function(req, res, next){

  var one = req.body;

  console.log('new user access',one);

  var email = one.email;
  var pwd1 = one.password1;
  var pwd2 = one.password2;
  var nickname = one.nickname;
  var time = new Date();

  con.query('SELECT * FROM users WHERE email = ?', [email], function(err, rows) {
    console.log('already rows check', rows);
    var alreadyuser = rows;

    if( pwd1 !== pwd2 ) {
      console.log('비밀번호가 다릅니다.');
      return res.redirect('/users/signup');
    } 
  
    else if (alreadyuser.length !== 0) {
      console.log('이미존재하는 사용자입니다');
      return res.redirect('/users/signup');
    }

    else if (alreadyuser.nickname == nickname) {
      console.log('닉네임은 하나만');
      return res.redirect('/users/signup');
    }
  
    else {

      bcrypt.hash(pwd1, null, null, function(err, hash){
        con.query(`INSERT INTO users(email, password, nickname, created, modified) VALUES ('${email}', '${hash}', '${nickname}', now(), now());`, function(err, rows){
          if(err) throw err;
          console.log('성공');
          return res.redirect('/');
        });
      });

    }
  });

});

//////////// 탈퇴 /////////////
router.post('/bye', function(req, res, next){

  var id = req.user.id;

  con.query(`DELETE FROM users WHERE id = ${id}`, function(err, result){
    
    req.logout()
    // 현재 상태를 저장하고 고고
    req.session.destroy(function(err){
      res.redirect('/');
    });
    
  });

  

  

});

module.exports = router;
