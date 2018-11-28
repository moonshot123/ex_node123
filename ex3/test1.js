const http = require('http') // http라는 모듈사용
const fs = require('fs') //fs 는 파일시스템 모듈
const server = http.createServer(); // http 모듈안에 있는 createserver 사용하여 서버만들기


const port = 3300; // 포트번호 할당
const host = '192.168.0.14';

server.listen(port,host,50000,function () { // 
    console.log("웹서버가 실행되었습니다. : " + port+ " : " + host);
});


server.on('connection', function (socket) {
    console.log("클라이언트가 접속했습니다.")
});

server.on('request', function (req, res) {
    console.log("클라이언트 요청이 실행되었습니다.")  
})