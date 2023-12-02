// когда мы применяем функции к объектам, то получаем методы
let a= [];
a.push(1,2,3)
a.reverse();
console.log(a);
// объекту можно присвоить метод
let points=[
    {x:0,y:0},
    {x:1,y:1}
];
// ключевое слово ссылается на используемый объект
points.dist=function(){
    let p1 = this[0];
    let p2=this[1];
    let a = p2.x-p1.x;
    let b =p2.y-p1.y1;
    return Math.sqrt(a*a+b*b);
}
console.log(points.dist());
//классические функции
// модуль
function abs(x){
    if (x>=0){
        return x;
    }
    else{return -x;}
}
//сумма массива
function sum(array){
    let sum=0;
    for (let x of array){sum+=x;}
    return sum;
}
//факториал
function factorial(n){
    let product=1;
    while (n>1){
        product*=n;
        n--;
    }
    return product;
}

console.log(
    abs(-100),
    sum([1,2,3,4,5]),
    factorial(8)
);

