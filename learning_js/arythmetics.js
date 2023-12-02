// арифметические операции
console.log(
    3+1,5-2, 11*713,11/8
);
// со строками работает конкат
console.log(
    'раз'+'два'
);
// также справедливо для м и о
let points=[
    {x:0,y:0},
    {x:1,y:1}
];
console.log(points[1].x-points[0].x);
// есть также инкремент и декремент
let count=0;
count++;
count--;
count+=3;
count*=3
console.log(count);
// операции сравнения
let x=2, y=3;
console.log(
    x===y,
    x!==y,
    x<y,
    x<=y,
    'two'==='three',
    'two'>'three',
    false === (x>y)
);
// логические операции также представимы сл образом
console.log(
    (x===2)&&(y===3), //и
    (x>3)||(y<3), // или
    !(x===y) //аналог not
)
//