console.log("안녕하세요.")


console.log("숫자입니다. %d", 10)
console.log("글자입니다. %s", "아이고")


const person = {
    name : '아이고',
    age: 20
}

console.log("객체 콘솔1 :" + person)
console.log("객체 콘솔2 :" + person.age)
console.log("객체 콘솔3 :" + person.name)

let result = 0;
for(i = 0 ; i < 10 ; i++){
    result += i
}

console.log("1부터9까지 합 :"+result)

console.log("파일이름 : %s",__filename)
console.log("폴더이름 : %s",__dirname)



