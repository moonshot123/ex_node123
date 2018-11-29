const coffee = require('./user2');

console.dir(coffee);

function showCoffee(){
    return coffee.getCoffee().name+', '+coffee.com.name;
}

console.log(showCoffee());