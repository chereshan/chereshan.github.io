let timestamp = Date.now(); //Текущее время как отметка времени (число) .
let now = new Date(); // Текущее время как объект Date.
let ms = now.getTime(); // Преобразовать в миллисекундную
let iso = now.toISOString(); // Преобразовать в строку со стандартным
console.log(timestamp,
    now, ms, iso)