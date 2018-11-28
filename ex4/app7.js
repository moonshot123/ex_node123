let express = require('express');
let http = require('http');
let path = require('path');

//bodyParser => 
//use => 
//path =>
//join =>

let bodyParser= require('body-parser');
static = require('serve-static');

const app = express();

app.set('port' , process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended : false}));

app.use(bodyParser.json());

app.use('/public' , static(path.join(__dirname,'public')));

app.use(function (req, res, next) {
    console.log('첫번째 미들웨에서 요청을 처리함');
   
    let paramID = req.body.id || req.query.id;
    let paramPassword = req.body.password || req.query.password;

    res.writeHead('200',{'Content-Type':'text/html;charset=utf-8'} );
    res.write('<h1> express 서버에서 응답한 결과입니다. </h1>');
    res.write('<div><p> param ID : '+ paramID + '</p></div>');
    res.write('<div><p> paramPassword : '+ paramPassword + '</p></div>');
    res.end();
    
});

http.createServer(app).listen(3000, function () {
    console.log('express 서버가 3000번 포트에서 시작됨');   
});

//http://localhost:3000/public/login.html 확인 필요....