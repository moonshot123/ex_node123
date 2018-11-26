alert("java script good....");


//const what = '콜라스'     
//const what1 = 콜라스    콜라스 라는 객체를 못찾아서 오류가남


//변수명은 카멜표기법으로...
//처음에 소문자로 스페이스가 필요한 곳에는 대문자로
//

const mon = "mon";
const tue = "tue";
const wen = "wen";
const thu = "thu";
const fri = "fri";

console.log(mon,tue,wen,thu,fri)

const daysOfWeek = ['mon','tue','wen','thu','fri']

console.log(daysOfWeek)
console.log(daysOfWeek[1])

const info = ['name: nicol','city: seoul','sex: man']

//오브젝트를 만드는 이유는 array를 더 좋은 방법으로 가져올수 있게 도와줌  {}는 객체를 표시하는거임
const infoObject = {
    name:'jo',
    gender : 'male',
    isHansome : false,
    love : ["money",'node','java'],
    food : [
        {
            name: "kim",
            type: "food"
        },
        {
            name: "buger",
            type: "food"
        }
    ]
}

function test (){
    console.log("check 확인 :"); 
}

test();



// ``  이것은 백틱
// ''  "" 두가지와는 다름

//백틱예시

function test (name, age){
    console.log(`너의 이름은 ${name} 나이는 ${age} 입니다.`); 
    return `너의 이름은 ${name} 나이는 ${age} 입니다.`
}


const dhwlddj = test('오징어',15);

console.log(dhwlddj);




