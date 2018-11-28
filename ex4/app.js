// epxress 서버기본


const express = require('express');
const http = require('http');

const app = express();
app.set('port' , process.env.PORT || 3000) // set(naem,value) 서버설정을 위한 속성을 지정합니다. set메소드로 설정한 속성은 get 메소드로 가져올수 있습니다.  
//get(name) 서버설정을 위해 지정한 속성을 꺼내옵니다.
//use([path], function[function...]) 미들웨어 함수를 사용함
//get([path], function) 특정 패스로 욫ㅇ된 정보를 처리합니다.
http.createServer(app).listen(app.get('port'), function () { 
    console.log('익스프레스 서버를 실행하겠습니다. : ' + app.get('port'))
});

//env 서버모드를 설정합니다.
//views 뷰들이 들어있는 폴더 또는 폴더 배경을 설정합니다.
//view engine 디폴트로 사용ㅎㄹ 뷰 엔진을 설정합니다.




