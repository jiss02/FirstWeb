// 기본 필요 모듈
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

// 라우트 모듈
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var detailRouter = require('./routes/detail');


// 앱 만들기
var app = express();


// 로그인 모듈
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const con = require('./mysql');
const config = require('./info/db-config.json');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt-nodejs');


// 옵션 셋팅 : 해킹 방지를 위함이다.
const option = {
  host     : config.host,
  user     : config.user,
  password : config.password,
  database: config.database,
}
var sessionStore = new MySQLStore(option);

// 로그인 미들웨어 셋팅 : 앱이 시작될때마다 세션이 생성된다.
app.use(session({
  secret: 'akan@fj@grp!skw@ld#jqh!wk',
  store: sessionStore,
  resave: false,
  saveUninitialized: true
}));

// 필요한 미들웨어 셋칭
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// 로그인 확인 버튼시 post로 전송되며 자동 실행
// passport 설정. 로그인 전략은 로컬
// 로그인 실행에 대한 로직
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    // 앞에 req를 받기위해 true로 해준다
    session: true,
    passReqToCallback: true,
  },
  function(req, username, password, done) {
    console.log('hahaha', username, password);
    // 이메일이 존재하는지 확인하는 작업
    con.query('SELECT * FROM users WHERE email = ?', [username], function(err, rows) {
      
      if (err) { return done(err); }

      console.log(rows);
      var user = rows[0];

      if (rows.length) {

        bcrypt.compare(password, rows[0].password, function(err, res) {
          if(res){
            console.log('login sesion***', req.session);
            return done(null, user);
          }
          else {
            return done(null, false, { message: 'Incorrect password.' });
          }
          });
      }
      else {
        return done(null, false, { message: 'Incorrect username.' });
      }
      });
    }
  ));

// 로그인 성공시 딱 한번 실행된다.
// 로그인이 성공한 user의 정보중 식별자가 되는 것을 골라 세션 스토어로 넘겨준다.
passport.serializeUser(function(user, done){
  console.log('serialize');
  done(null, user.id);
});

// 다른 페이지에 방문할때마다 실행된다.
// 세션 스토어에서 식별자를 찾아 db에서 끌고온다.
passport.deserializeUser(function(id, done){
  // 식별자가 id가 사용되었다. 
  con.query('SELECT * FROM users WHERE id = ?', [id], function(err, rows){
    var user = rows[0];
    console.log('deserialize');
    done(null, user);
  });
});

///////////////////////////기존 app.js////////////////////////////
/* 라우트 추가시에만 변경 가능 */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.basedir = path.join(__dirname, 'views/');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/detail', detailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 내보내기
module.exports = app;
