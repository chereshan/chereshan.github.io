function hide(e, reflow) { // Скрывает элемент e, изменяя его стиль
    if (reflow) { // Если 2-й аргумент true,
        e.style.display = "none" // скрыть элемент и использовать
    } // занимаемое им место
    else { // Иначе
        e.style.visibility = "hidden"; // сделать e невидимым, но оставить
    } // занимаемое им место пустым
}
function highlight(e) { // Выделяет e, устанавливая класс CSS
    // Просто добавляет или переопределяет HTML-атрибут class.
    // Предполагается, что таблица стилей CSS уже содержит определение класса "hilite"
    if (!e.className) e.className = "hilite";
    else e.className += " hilite";
}