// 모듈 분리시 전형적인 코드 패턴

//  1.함수를 할당하는 경우 
//  >> 
//  모듈안에서 함수를 만들어 할당한다. 모듈을 불러온후 소괄호를 붙여 모듈을 실행합니다.

//  2.인스턴스 객체를 할당하는 경우 >> 
//  >>
//  모듈안에서 인스턴스 객체를 만들어 할당합니다.

//  3.프로토타입 객체를 할당하는 경우 >> 
//   >>
//  모듈안에서 프로토 타입 객체를 만들어 할당합니다. 모듈을 불러옪 new 연산자로 인스턴스 객체를 만들어 사용 할 수 있습니다.


const require2 = function (path) {
    const exports = {};

    exports.getUser = function() {
        return {id:'require ID', name:'require NAME'};
    }

    exports.group = {id:'require2 ID', name:'require2 NAME'};

    return exports;
};


const obj = require2('...');

function showObj() {
    return (obj.getUser().name + ", " + obj.group.id);
}

console.log('require2 확인 하기.. : '+ showObj());


