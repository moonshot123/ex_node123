//express 여러개 미들웨어 등록방법 

const express = require('express')
const http = require('http')

const app = express();

app.use(function (req, res, next) {
    
    console.log('첫번째 미들웨어에서 요청을 처리함')

    req.user ='mike';

    next();

})


app.use('/',function (req , res , next) {
    console.log('두번째 미들웨어에서 요청을 처리함');
    
    res.writeHead('200' , {'Content-Type':'text/html;charset=utf-8' }); 
    res.end('<h1> Express 서버에서 '+ req.user + ' 응답한 결과입니다. </h1>')
});


http.createServer(app).listen(3000, function () {
    console.log('express 서버가 3000번 포트에서 시작됨')
});
