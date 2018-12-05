//기본 모듈
//let express = require('express');
//const path = require('path');
//const http = require('http');

let express = require('express');
let http = require('http');
let path = require('path');


const router = express.Router();
//const bodyParser =  require('body-parser');
//const static = require('serve-static');

const app = express();

app.set('port',process.env.port || 3000);

//http.createServer(app).listen(3000,function () {
//    console.log("3000번 포트에 접속하였습니다.");
//});

/**
router.route('/main/router').post(function (req,res) {
    console.log('router 확인');
    res.writeHead('200',{'Conent-Type':'text/html;Charset=utf-8'});
    res.write('<h2> 라우터 기능확인 </h2>');
    res.end();
})

app.use('/',router);
 */

app.get('/',function (req,res) {
    res.writeHead('200',{'Content-Type':'text/html;charset=utf-8'});
    res.write("<h1> express 기본페이지</h1>");
    res.end();
})

app.use('/user',function (req,res) {
    res.writeHead('200',{'Content-Type':'text/html;charset=utf-8'});
    res.write("<div> user 확인 </div>");
    res.end();
})

app.use('/main',function (req,res) {
    res.writeHead('200',{'Content-Type':'text/html;charset=utf-8'});
    res.write("<h1> main 확인 <h1>");
    res.end();
})



http.createServer(app).listen(app.get('port'), function () { 
    console.log('익스프레스 서버를 실행하겠습니다. : ' + app.get('port'))
});