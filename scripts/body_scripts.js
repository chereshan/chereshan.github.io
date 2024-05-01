//Окружает тэгами класса кода для первого столбца со второй строки в таблицы
$(function(){
    jQuery('.first_column_code td:nth-child(1):not(tr:first-child td)').each(function () {
        $(this).html('<span class="code">' + $(this).html() + '</span>')
    })
})


//расположение пост-dom html-тегов
/*
* хедер
* автооглавление
* подсветка кода
* */
$(function(){
    $('body').prepend('<div id="header"></div>')
    $("#header").load(!(location.pathname=='/') ? "../common/header.html" : "common/header.html")
    $('h1').after('<div id="autonav"></div>')
    hljs.highlightAll();
})
//Автоооглавление
if (!location.pathname.endsWith('index.html')){
    $(function(){
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
//
        jQuery('span.backgr-col').each(function(){
            $(this).css({
                'background-color': $(this).text(),
                'mix-blend-mode':'difference'
            })
        })
    })
}





//Функция для быстрой генерации таблиц на основе списка словарей
function list_of_dicts_to_table(list, selector){
    var headers=[]
    for (let j=0; j<list.length;j++){ //сначала собираем все хедеры на случай, если их число в каждом словаре не совпадает
        let row=list[j]
        let keys=Object.keys(row)
        for (let i=0; i<keys.length; i++){
            if (!headers.includes(keys[i])){
                headers.push(keys[i])
            }
        }
    }
    $(selector).append('<table>')
    for (let j=-1; j<list.length; j++){
        if (j==-1){
            $(selector).find('table').append('<tr class="header-row">')
            for (let i=0; i<headers.length; i++){
                $(selector).find('.header-row').append(`<th class="column-${i}">${headers[i]}</th>`)
            }
        }
        else {
            $(selector).find('table').append(`<tr class="row-${j}"></tr>`)
            for (let i=0; i<headers.length; i++){
                $(selector).find(`.row-${j}`).append(`<td class="column-${i}">${list[j][headers[i]]}</td>`)
            }
        }
    }
}


//история посещений
//этот скрипт ведет историю просмотров страниц сайта
//контроль уникальности просмотров
function get_lshistory(){
    return JSON.parse(localStorage.getItem('view_history'))
}
let ls_history
$(function(){
    const expiration_date=60*60*24*21 //21 день
//этот скрипт ведет историю просмотров страниц сайта
//этот скрипт должен располагаться на выделенном сегменте страниц сайта
    var current_page={
        title: document.querySelectorAll('title')[0].innerHTML,
        ts: new Date() //отметка времени для контроля над сроком жизни
    }
    var view_history = localStorage.getItem('view_history')
    if (!view_history){
        view_history=[]
        view_history.push(current_page)
        ls_history=JSON.parse(JSON.stringify(view_history))
        localStorage.setItem('view_history', JSON.stringify([current_page]))

    }
    else {
        view_history=JSON.parse(view_history)
        view_history=checkLS_forUniqness(current_page, view_history)
        view_history=checkLS_forExpires(view_history, expiration_date)
        view_history.push(current_page)
        ls_history=JSON.parse(JSON.stringify(view_history))
        localStorage.setItem('view_history', JSON.stringify(view_history))

    }

    function checkLS_forExpires(list, expires){
        var new_list=[]

        for (let i=0; i<list.length; i++){
            d1=new Date(list[i]['ts']).getTime()
            if (!d1<(new Date()).getTime()-expires){
                new_list.push(list[i])
            }
        }
        return new_list
    }
    function checkLS_forUniqness(page, list){
        var new_list=[]
        for (let i=0; i<list.length; i++){
            if (page.title!=list[i].title){
                new_list.push(list[i])
            }
        }
        return new_list
    }
})
