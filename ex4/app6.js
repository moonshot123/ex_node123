//express 여러개 미들웨어 등록방법 

const express = require('express')
const http = require('http')

const app = express();



app.use(function (req, res, next) {
    console.log('첫번째 미들웨에서 요청을 처리함');

    const userAgent = req.header('User-Agent');
    const paramName = req.query.name;

    res.writeHead('200',{'Content-Type' : 'text/html;charset=utf-8'} );
    res.write('<h1> express 서버에서 응답한 결과입니다. </h1>');
    res.write('<div><p> User-Agent : '+ userAgent+ '</p></div>');
    res.write('<div><p>Param name : '+ paramName + '</p></div>');
    res.end();

});


app.use('/2',function (req, res, next) {
    console.log('두번째 미들웨어에서 요청을 처리함')

    req.user ='mike';
    next();
});


app.use('/3',function (req , res , next) {
    console.log('세번째 미들웨어에서 요청을 처리함');
  
    res.writeHead('200' , {'Content-Type':'text/html;charset=utf-8' }); 
    res.end('<h1> Express 서버에서 '+ req.user + ' 응답한 결과입니다. </h1>')
});


http.createServer(app).listen(3000, function () {
    console.log('express 서버가 3000번 포트에서 시작됨')
});

//http://localhost:3000/?name='jo' 접속한다면 이름을 볼수 있음


