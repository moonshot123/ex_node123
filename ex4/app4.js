//express 여러개 미들웨어 등록방법 

const express = require('express')
const http = require('http')

const app = express();



app.use(function (req, res, next) {
    console.log('첫번째 미들웨에서 요청을 처리함');

// send 클라이언트에 응답 데이터를 보냅니다. 전달할수 있는 데이터는 HTML문자열, buffer객체, json객체, json배열 
    res.send({name: '이름이다', age:20});
})


app.use('/2',function (req, res, next) {
    console.log('두번째 미들웨어에서 요청을 처리함')

    req.user ='mike';
    next();
})


app.use('/3',function (req , res , next) {
    console.log('세번째 미들웨어에서 요청을 처리함');
  
    res.writeHead('200' , {'Content-Type':'text/html;charset=utf-8' }); 
    res.end('<h1> Express 서버에서 '+ req.user + ' 응답한 결과입니다. </h1>')
});


http.createServer(app).listen(3000, function () {
    console.log('express 서버가 3000번 포트에서 시작됨')
});


