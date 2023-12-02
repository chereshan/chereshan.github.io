// Функции - это параметризованные блоки кода JavaScript,
// которые мы можем вызывать.
function plus1(x){
    return x+1;
}
console.log(plus1(99))

let square = function(x) {
    return x*x;
}

console.log(square(plus1(10)))
// аналог лямбда-функций - стрелочные функции
const plus1 = x => x+1;
const square = x => x*x;
