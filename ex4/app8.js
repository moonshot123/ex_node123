let express = require('express');
let http = require('http');
let path = require('path');

let router = express.Router();
 
let bodyParser= require('body-parser');
static = require('serve-static');

const app = express();

//mysql 모듈사용
let mysql = require('mysql');

//데이터베이스 연결을 위한 커넥션풀 사용
let pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'ex_mysql',
    debug : false
});


app.set('port' , process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended : false}));

app.use(bodyParser.json());

app.use('/public' , static(path.join(__dirname,'public')));


const addUser = function (id, name, age, password,callback) {
    console.log('addUser 호출됨');

    pool.getConnection(function (err,conn) {
        if(err){
            if(conn){
                conn.release();
            }
            callback(err,null);
            return;
        }        
        console.log('데이터베이스 연결 스레드 아이디 :'+conn.threadId);

        let data = {id:id, name:name, age:age, password:password}

        let exec = conn.query('insert into test.user set ?', data, function (err,result) {
            conn.release();
            console.log('실행대상 sql :'+exec.sql);

            if(err){
                console.log('sql 실행시 오류발생함');
                console.log(err);
                callback(err, null);
                return;
            }
            callback(null,result);
        });

    })//pool.getConnection
}//addUser



router.route('/process/adduser').post(function (req, res) {
    console.log('/process/adduser 호출됨 ');

    let paramID = req.body.id || req.query.id;
    let paramPassword = req.body.password || req.query.password;
    let paramName = req.body.name || req.query.name;
    let paramAge = req.body.age || req.query.age;

    console.log('요청값 확인 : '+ paramID + paramPassword + paramName + paramAge);

    if(pool){
        addUser(paramID,paramPassword,paramName,paramAge, function(err,addedUser) {
            if(err){
                console.log('사용자 추가중 오류발생 : ' + err.stack);

                res.writeHead('200',{'Content-Type':'text/html;Charset=utf-8'});
                res.write('<h2> 사용자 추가 중 오류 발생 </h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }


            if(addedUser){
                console.dir(addedUser);

                console.log('inserted '+ addedUser.affectedRows + 'rows');

                let insertId = addedUser.insertId;
                console.log('추가된 레코드 아이디 ' + insertId);

                res.writeHead('200',{'Content-Type':'text/html;Charset=utf-8'});
                res.write('<h2>사용자 추가 성공</h2>');
                res.end();

            }else{
                res.writeHead('200',{'Conent-Type':'text/html;Charset=utf-8'});
                res.write('<h2> 사용자 추가 실패 </h2>');
                res.end();
            }

        });//addUser
    }else {
        res.writeHead('200',{'Content-Tpye':'text/html;Charset=utf-8'});
        res.write('<h2>데이터 베이스 연결 실패</h2>');
        res.end();
    }

});

//app.use('*', function (req,res) {
//    res.status(404).send('<h1>ERROR- 페이지를 찾을수 없습니다.</h1>');
//})


//app.use('/', router);

http.createServer(app).listen(3000, function () {
    console.log('express 서버가 3000번 포트에서 시작됨');    
});


