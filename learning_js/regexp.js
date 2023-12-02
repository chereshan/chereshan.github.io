let text = "testing: 1, 2, 3";
let pattern = /\d+/g; // Соответствует всем вхождениям одной или более цифр
pattern.test(text) // => true: есть совпадение
text.search(pattern) // => 9: позиция первого совпадения
text.match(pattern) // => ["1", "2", "3"]: массив всех совпадений
text.replace(pattern, "#")
text.split(/\D+/) // => ["","i","2","3"]