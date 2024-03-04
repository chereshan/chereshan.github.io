//Окружает тэгами класса кода для первого столбца со второй строки в таблицы
$(document).ready(function(){
    jQuery('.first_column_code td:nth-child(1):not(tr:first-child td)').each(function () {
        $(this).html('<span class="code">' + $(this).html() + '</span>')
    })
})
//Автоооглавление
jQuery('h1').after('<ul id="autonav"><ul>')
h=[0,0,0,0,0];pos_memory=0;
jQuery(':header:not(h1)').each(function () {
    pos=+($(this)[0].nodeName.slice(-1))-2
    h[pos]+=1
    if (pos_memory>pos) h[pos_memory]=0
    pos_memory=pos
    $(this).attr('id','ch-'+(h.filter((n)=>n!=0).join('.')));
    jQuery('#autonav').append(`<li><a href=${'#'+$(this).attr('id')}>${$(this).attr('id').slice(3)}. ${$(this).text()}</a></li>`);
    $(this).html($(this).attr('id').slice(3)+'. '+$(this).html())
})