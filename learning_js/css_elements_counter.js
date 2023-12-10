// Создание нового HTML-элемента
let element = document.createElement("div");

let p = 0; // Создание счетчика
for (index in element.style) {p++;}

// Выводит 522 в Chrome по состоянию на 21 декабря 2018 года
console.log( p );