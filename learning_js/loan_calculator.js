"use strict"; // Использовать строгий режим ECMAScript 5, если броузер поддерживает его
/*
* Этот сценарий определяет функцию calculate(), вызываемую обработчиками событий
* в разметке HTML выше. Функция читает значения из элементов <input>, вычисляет размеры
* платежей по ссуде, отображает результаты в элементах <span>. Кроме того, она сохраняет
* пользовательские данные, отображает ссылки на кредитные учреждения и рисует диаграмму.
*/
function calculate() {
    // Отыскать элементы ввода и вывода в документе
    var amount = document.getElementById("amount");
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    var zipcode = document.getElementById("zipcode");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");
    // Получить ввод пользователя из элементов ввода. Предполагается, что все данные
    // являются корректными. Преобразовать процентную ставку из процентов
    // в десятичное число и преобразовать годовую ставку в месячную ставку.
    // Преобразовать период платежей в годах в количество месячных платежей.
    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value) / 100 / 12;
    var payments = parseFloat(years.value) * 12;
    // Теперь вычислить сумму ежемесячного платежа.
    var x = Math.pow(1 + interest, payments); // Math.pow() вычисляет степень
    var monthly = (principal*x*interest)/(x-1);
    // Если результатом является конечное число, следовательно, пользователь
    // указал корректные данные и результаты можно отобразить
    if (isFinite(monthly)) {
        // Заполнить поля вывода, округлив результаты до 2 десятичных знаков
        payment.innerHTML = monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly*payments)-principal).toFixed(2);
        // Сохранить ввод пользователя, чтобы можно было восстановить данные
        // при следующем открытии страницы
        save(amount.value, apr.value, years.value, zipcode.value);
        // Реклама: отыскать и отобразить ссылки на сайты местных
        // кредитных учреждений, но игнорировать сетевые ошибки
        try { // Перехватывать все ошибки, возникающие в этих фигурных скобках
            getLenders(amount.value, apr.value, years.value, zipcode.value);
        }
        catch(e) { /* И игнорировать эти ошибки */ }
        // В заключение вывести график изменения остатка по кредиту, а также
        // графики сумм, выплачиваемых в погашение кредита и по процентам
        chart(principal, interest, monthly, payments);
    }
    else {
        // Результат не является числом или имеет бесконечное значение,
        // что означает, что были получены неполные или некорректные данные.
        // Очистить все результаты, выведенные ранее.
        payment.innerHTML = ""; // Стереть содержимое этих элементов
        total.innerHTML = ""
        totalinterest.innerHTML = "";
        chart(); // При вызове без аргументов очищает диаграмму
    }
}
// Сохранить ввод пользователя в свойствах объекта localStorage. Значения этих свойств
// будут доступны при повторном посещении страницы. В некоторых броузерах (например,
// в Firefox) возможность сохранения не поддерживается, если страница открывается
// с адресом URL вида file://. Однако она поддерживается при открытии страницы через HTTP.
function save(amount, apr, years, zipcode) {
    if (window.localStorage) { // Выполнить сохранение, если поддерживается
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
        localStorage.loan_zipcode = zipcode;
    }
}
// Автоматически восстановить поля ввода при загрузке документа.
window.onload = function() {
    // Если броузер поддерживает localStorage и имеются сохраненные данные
    if (window.localStorage && localStorage.loan_amount) {
        document.getElementById("amount").value = localStorage.loan_amount;
        document.getElementById("apr").value = localStorage.loan_apr;
        document.getElementById("years").value = localStorage.loan_years;
        document.getElementById("zipcode").value = localStorage.loan_zipcode;
    }
};
// Передать ввод пользователя серверному сценарию, который может (теоретически) возвращать
// список ссылок на сайты местных кредитных учреждений, готовых предоставить кредит.
// Данный пример не включает фактическую реализацию такого сценария поиска кредитных
// учреждений. Но если такой сценарий уже имеется, данная функция могла бы работать с ним.
function getLenders(amount, apr, years, zipcode) {
    // Если броузер не поддерживает объект XMLHttpRequest, не делать ничего
    if (!window.XMLHttpRequest) return;
    // Отыскать элемент для отображения списка кредитных учреждений
    var ad = document.getElementById("lenders");
    if (!ad) return; // Выйти, если элемент отсутствует
    // Преобразовать ввод пользователя в параметры запроса в строке URL
    var url = "getLenders.php" + // Адрес URL службы плюс
        "?amt=" + encodeURIComponent(amount) + // данные пользователя
        "&apr=" + encodeURIComponent(apr) + // в строке запроса
        "&yrs=" + encodeURIComponent(years) +
        "&zip=" + encodeURIComponent(zipcode);
    // Получить содержимое по заданному адресу URL с помощью XMLHttpRequest
    var req = new XMLHttpRequest(); // Создать новый запрос
    req.open("GET", url); // Указать тип запроса HTTP GET для url
    req.send(null); // Отправить запрос без тела
    // Перед возвратом зарегистрировать обработчик события, который будет вызываться
    // при получении HTTP-ответа от сервера. Такой прием асинхронного программирования
    // является довольно обычным в клиентском JavaScript.
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            // Если мы попали сюда, следовательно, был получен корректный HTTP-ответ
            var response = req.responseText; // HTTP-ответ в виде строки
            var lenders = JSON.parse(response); // Преобразовать в JS-массив
            // Преобразовать массив объектов lender в HTML-строку
            var list = "";
            for(var i = 0; i < lenders.length; i++) {
                list += "<li><a href='" + lenders[i].url + "'>" +
                    lenders[i].name + "</a>";
            }
            // Отобразить полученную HTML-строку в элементе,
            // ссылка на который была получена выше.
            ad.innerHTML = "<ul>" + list + "</ul>";
        }
    }
}
// График помесячного изменения остатка по кредиту, а также графики сумм,
// выплачиваемых в погашение кредита и по процентам в HTML-элементе <canvas>.
// Если вызывается без аргументов, просто очищает ранее нарисованные графики.
function chart(principal, interest, monthly, payments) {
    var graph = document.getElementById("graph"); // Ссылка на тег <canvas>
    graph.width = graph.width; // Магия очистки элемента canvas
    // Если функция вызвана без аргументов или броузер не поддерживает
    // элемент <canvas>, то просто вернуть управление.
    if (arguments.length == 0 || !graph.getContext) return;
    // Получить объект "контекста" для элемента <canvas>,
    // который определяет набор методов рисования
    var g = graph.getContext("2d"); // Рисование выполняется с помощью этого объекта
    var width = graph.width, height = graph.height; // Получить размер холста
    // Следующие функции преобразуют количество месячных платежей
    // и денежные суммы в пикселы
    function paymentToX(n) { return n * width/payments; }
    function amountToY(a) { return height-(a*height/(monthly*payments*1.05));}
    // Платежи - прямая линия из точки (0,0) в точку (payments,monthly*payments)
    g.moveTo(paymentToX(0), amountToY(0)); // Из нижнего левого угла
    g.lineTo(paymentToX(payments), // В правый верхний
        amountToY(monthly*payments));
    g.lineTo(paymentToX(payments), amountToY(0)); // В правый нижний
    g.closePath(); // И обратно в начало
    g.fillStyle = "#f88"; // Светло-красный
    g.fill(); // Залить треугольник
    g.font = "bold 12px sans-serif"; // Определить шрифт
    g.fillText("Total Interest Payments", 20,20); // Вывести текст в легенде
// Кривая накопленной суммы погашения кредита не является линейной
// и вывод ее реализуется немного сложнее
    var equity = 0;
    g.beginPath(); // Новая фигура
    g.moveTo(paymentToX(0), amountToY(0)); // из левого нижнего угла
    for(var p = 1; p <= payments; p++) {
        // Для каждого платежа выяснить долю выплат по процентам
        var thisMonthsInterest = (principal-equity)*interest;
        equity += (monthly - thisMonthsInterest); // Остаток - погашение кред.
        g.lineTo(paymentToX(p),amountToY(equity)); // Линию до этой точки
    }
    g.lineTo(paymentToX(payments), amountToY(0)); // Линию до оси X
    g.closePath(); // И опять в нач. точку
    g.fillStyle = "green"; // Зеленый цвет
    g.fill(); // Залить обл. под кривой
    g.fillText("Total Equity", 20,35); // Надпись зеленым цветом
    // Повторить цикл, как выше, но нарисовать график остатка по кредиту
    var bal = principal;
    g.beginPath();
    g.moveTo(paymentToX(0),amountToY(bal));
    for(var p = 1; p <= payments; p++) {
        var thisMonthsInterest = bal*interest;
        bal -= (monthly - thisMonthsInterest); // Остаток от погаш. по кредиту
        g.lineTo(paymentToX(p),amountToY(bal)); // Линию до этой точки
    }
    g.lineWidth = 3; // Жирная линия
    g.stroke(); // Нарисовать кривую графика
    g.fillStyle = "black"; // Черный цвет для текста
    g.fillText("Loan Balance", 20,50); // Элемент легенды
    // Нарисовать отметки лет на оси X
    g.textAlign="center"; // Текст меток по центру
    var y = amountToY(0); // Координата Y на оси X
    for(var year=1; year*12 <= payments; year++) { // Для каждого года
        var x = paymentToX(year*12); // Вычислить позицию метки
        g.fillRect(x-0.5,y-3,1,3); // Нарисовать метку
        if (year == 1) g.fillText("Year", x, y-5); // Подписать ось
        if (year % 5 == 0 && year*12 !== payments) // Числа через каждые 5 лет
            g.fillText(String(year), x, y-5);
    }
    // Суммы платежей у правой границы
    g.textAlign = "right"; // Текст по правому краю
    g.textBaseline = "middle"; // Центрировать по вертикали
    var ticks = [monthly*payments, principal]; // Вывести две суммы
    var rightEdge = paymentToX(payments); // Координата X на оси Y
    for(var i = 0; i < ticks.length; i++) { // Для каждой из 2 сумм
        var y = amountToY(ticks[i]); // Определить координату Y
        g.fillRect(rightEdge-3, y-0.5, 3,1); // Нарисовать метку
        g.fillText(String(ticks[i].toFixed(0)), // И вывести рядом сумму.
            rightEdge-5, y);
    }
}