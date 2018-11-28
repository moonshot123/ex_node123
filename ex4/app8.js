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
    database : 'test',
    debug : false
});


app.set('port' , process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended : false}));

app.use(bodyParser.json());

app.use('/public' , static(path.join(__dirname,'public')));

app.use('/', router);



// 회원가입(query)
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

        let exec = conn.query('insert into user set ?', data, function (err,result) {
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




//사용자인증(query)
let authUser = function (id,password,callback) {
    console.log('authUser 호출됨');

    pool.getConnection(function (err,conn) {
        if(err){
            if(conn){
                conn.release();
            }
            callback(err,null);
            return;
        }//if(err)
            console.log('데이터 베이스 연결 스레드 아이디: '+ conn.threadId);
            
            let columns =['id','name','age'];
            let tablename ='user';

            
            let exec = conn.query('select ?? from ?? where id = ? and password = ?',[columns, tablename, id ,password], function(err,rows){
                conn.release();
                console.log('실행대상 sql :'+ exec.sql);


                if(rows.length > 0){
                    console.log('아이디 [%s],패스워드 [%s] 가 일치하는 사용자 찾음.',id,password);
                    callback(null,rows);
                }else{
                    console.log("일치하는 사용자를 찾지 못함");
                    callback(null,null);
                }
            });//exec
        
    })// pool.getConnection
}//authUser


//사용자 등록
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



//사용자 로그인
router.route('/process/login').post(function (req,res) {
    console.log('/process/login 호출됨');

    let paramID = req.body.id || req.query.id
    let paramPassword = req.body.password || req.query.password
    
    console.log('요청 파라미터 : '+ paramID + ', '+ paramPassword );

    if(pool){
        authUser(paramID, paramPassword, function (err,rows) {
            if(err){
                console.log('======================= login fail =======================')
                console.log('사용자 로그인 중 오류 발생 :'+err.stack);
                res.writeHead("200",{'Content-Type':'text/html;Charset=utf-8'});
                res.write('<h2> 사용자 로그인 중 오류발생 </h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }//if(err)

            if(rows){
                console.log('======================= login success =======================')
                console.log(rows);

                let username = rows[0].name;
                
                res.writeHead("200",{'Content-Type':'text/html;Charset=utf-8'});
                res.write('<h2> 사용자 로그인 성공</h2>');
                res.write('<div><p> 사용자 아이디 :' + paramID + '</p></div>');
                res.write('<div><p> 사용자 이름 :' + username + '</p></div>');
                res.write('<br><br><a href="/public/login2.html"> 다시 로그인 하기 </a>');
                //res.write('<br><br><a href="/public/login2.html/?id='+paramID+',name='+username+'"> 아이디 수정하기 </a>');
                res.end();
            }
        })//authUser
    }//if(pool)
    
})//router



//사용자 수정
//웹브라우저 클라이언트 >> express 웹서버 >> 컨트롤러(라우팅모델) >> 모델(mysql모델) >> 뷰(뷰엔진 ==== 이게 뷰템플릿) >> express 웹서버 >>>>>> 계속

// node 에서 view에 데이터를 넣기 위해서는 일단 ejs형태로 해야됨, 일반적인 방식으로는 뷰에서 데이터를 넣어줄수 없고 
// 이제껏 라우터에서 일반적으로 데이터를 바로 보여주는 방법으로만 사용하다보니 결과 응답을 

// ejs 파일을 사용하는 것이 일반적인 방법인것 같다....... 동적 페이지를 관리하기 위해서는 기존의 html만으로는 안되는것 같다







app.use('*', function (req,res) {
    res.status(404).send('<h1>ERROR- 페이지를 찾을수 없습니다.</h1>');
})




http.createServer(app).listen(3000, function () {
    console.log('express 서버가 3000번 포트에서 시작됨');    
});


