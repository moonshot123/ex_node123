let express = require('express');
let http = require('http');
let path = require('path');

let router = express.Router();
 
let bodyParser= require('body-parser');
static = require('serve-static');

let expressErrorHandler = require('express-error-handler');

const app = express();

let errorHandler = expressErrorHandler({
    static:{
        '404':"./public/404.html"
    }
})

app.use(expressErrorHandler,httpError(404));

app.use(errorHandler);

app.set('port' , process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended : false}));

app.use(bodyParser.json());

app.use('/public' , static(path.join(__dirname,'public')));


router.route('/process/login').post(function (req, res) {
    console.log('/process/login/ 처리완료 ');

    let paramID = req.body.id || req.query.id;
    let paramPassword = req.body.password || req.query.password;

    res.writeHead('200',{'Content-Type':'text/html;charset=utf-8'});
    res.write('<h1> express 서버에서 응답한 결과입니다. </h1>');
    res.write('<div><p> param ID : '+paramID+ '</p></div>');
    res.write('<div><p> paramPassword : '+ paramPassword + '</p></div>');
    res.write('<br><br><a href="/public/login2.html"> 로그인 페이지로 가기</a>');
    res.end();
});


app.use('*', function (req,res) {
    res.status(404).send('<h1>ERROR- 페이지를 찾을수 없습니다.</h1>');
})


app.use('/', router);

http.createServer(app).listen(3000, function () {
    console.log('express 서버가 3000번 포트에서 시작됨');    
});


