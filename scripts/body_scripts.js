//Окружает тэгами класса кода для первого столбца со второй строки в таблицы
$(document).ready(function(){
    jQuery('.first_column_code td:nth-child(1):not(tr:first-child td)').each(function () {
        $(this).html('<span class="code">' + $(this).html() + '</span>')
    })
})
