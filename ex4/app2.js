//expess 서버 미들웨어사용
//use 를 이용한 미들웨어
//미들웨어란 => 하나의 독립된 함수 => 웹 응답과 요청에 관한  
//라우터란 => 

const express = require('express');
const http = require('http')

const app = express();

app.use(function (req, res, next) {
    console.log('첫번째 미들웨어에서 요청을 처리함');

    res.writeHead('200',{'Content-Type':'text/html;charset=utf-8'});
    res.end('<h1> express 서버에서 응답한 결과입니다. </h1>');

});

http.createServer(app).listen(3000, function () {
    console.log('express 서버가 3000번 포트에서 시작됨')
});

