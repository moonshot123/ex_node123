let express = require('express');
let http = require('http');
let path = require('path');

let router = express.Router();
 
let bodyParser= require('body-parser');
static = require('serve-static');

const app = express();

app.set('port' , process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended : false}));

app.use(bodyParser.json());

app.use('/public' , static(path.join(__dirname,'public')));

router.route('/process/login/:name').post(function (req, res) {
    console.log('/process/login/:name 처리완료 ');

    let paramID = req.body.id || req.query.id;
    let paramPassword = req.body.password || req.query.password;
//params :
    let paramName = req.params.name;

    res.writeHead('200',{'Content-Type':'text/html;charset=utf-8'});
    res.write('<h1> express 서버에서 응답한 결과입니다. </h1>');
    res.write('<div><p> param Name : '+paramName+ '</p></div>');
    res.write('<div><p> param ID : '+paramID+ '</p></div>');
    res.write('<div><p> paramPassword : '+ paramPassword + '</p></div>');
    res.write('<br><br><a href="/public/login3.html"> 로그인 페이지로 가기</a>');
    res.end();
});

app.use('/', router);

http.createServer(app).listen(3000, function () {
    console.log('express 서버가 3000번 포트에서 시작됨');    
});


