// Выводит сообщение в специальной области для отладочных сообщений внутри документа.
// Если документ не содержит такой области, она создается.
function debug(msg) {
    // Отыскать область для отладочных сообщений в документе, поиск по HTML-атрибуту id
    var log = document.getElementById("debuglog");
    // Если элемент с атрибутом id="debuglog" отсутствует, создать его.
    if (!log) {
        log = document.createElement("div"); // Создать элемент <div>
        log.id = "debuglog"; // Установить атрибут id
        log.innerHTML = "<h1>Debug Log</h1>"; // Начальное содержимое
        document.body.appendChild(log); // Добавить в конец документа
    }
    // Теперь обернуть сообщение в теги <pre> и добавить в элемент log
    var pre = document.createElement("pre"); // Создать тег <pre>
    var text = document.createTextNode(msg); // Обернуть msg в текстовый узел
    pre.appendChild(text); // Добавить текст в тег <pre>
    log.appendChild(pre); // Добавить <pre> в элемент log
}