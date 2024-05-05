//=================================================
//Окружает тэгами класса кода для первого столбца со второй строки в таблицы
$(function(){
    jQuery('.first_column_code td:nth-child(1):not(tr:first-child td)').each(function () {
        $(this).html('<span class="code">' + $(this).html() + '</span>')
    })
})

//=================================================
//расположение пост-dom html-тегов
/*
* хедер
* автооглавление
* подсветка кода
* подсветка для span.code
* */
$(function(){
    $('body').prepend('<div id="header"></div>')
    $("#header").load(!(
        location.pathname=='/' ||
        location.pathname=='/chereshan.github.io/index.html') ? "../common/header.html" : "common/header.html")
    if (!(location.pathname=='/' ||
        location.pathname=='/chereshan.github.io/index.html')){$('h1').after('<div id="autonav"></div>')}

    $('span.code').each(function(){
        $(this).replaceWith(`<pre class="span-code"><code class="language-javascript">${$(this).html()}</code></pre>`)
    })
    hljs.highlightAll();
    $(".span-code").replaceWith(function(){
        return this.outerHTML.replace("<pre class=\"span-code\"", "<span class=\"span-code\"").replace("</pre", "</span")
    });
    //=================================================
    //добавление кнопки раскоменчивания в окна кода
    const uncomment_button = document.createElement("img");
    uncomment_button.src = "../common/comment-button.svg";
    uncomment_button.classList=['uncomment-button']
    jQuery('pre code.hljs').prepend(uncomment_button)
    $('.uncomment-button').on('click', function(){
        $(this).parent().find('.hljs-comment').toggle()
    })
    //=================================================
    //добавление кнопки копирования в окна кода
    const copy_button = document.createElement("img");
    copy_button.src = "../common/copy-button.svg";
    copy_button.classList=['copy-button'];
    jQuery('pre code.hljs').prepend(copy_button)
    $('.copy-button').on('click', function(){
        navigator.clipboard.writeText($(this).parent().text().replace(/\x3C/,'<'));
    })
})
//=================================================

//Автоооглавление
//todo: сделать автооглавление независимым от числа уровней
//todo: починить автооглавление (оно нормально не работает и ломается после некоторого уровня)
if (!location.pathname.endsWith('index.html')){
    $(function(){
        jQuery('h1').after('<ul id="autonav"></ul>')

        h=[0,0,0,0]; pos_memory=0;
        jQuery(':header:not(h1)').each(function () {
            let pos=+($(this)[0].nodeName.slice(-1))-2
//            console.log($(this)[0].nodeName)
//             console.log(h)
            h[pos]+=1
            // console.log(h)
            if (pos_memory>pos) {
                h=h.slice(0,pos+1).concat(h.slice(pos+1).map((num)=>0));
            }
            // console.log(h)
            // h[pos]+=1
            pos_memory=pos
            $(this).attr('id','ch-'+(h.filter((n)=>n!=0).join('.')));
            //создание класса уровней списка
            let list_level=autonav_listLevel(h)
            jQuery('#autonav').append(`<li class="${list_level}"><a href=${'#'+$(this).attr('id')}>${$(this).attr('id').slice(3)}. ${$(this).text()}</a></li>`);
            // console.log($(this).attr('id'))
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

//Проект более эффективного алгоритма
//Скорее всего надо написать РиВ-алгоритм
// $(function (){
//     // jQuery('h1').after('<ul id="autonav"></ul>')
//
//     function autonav(hi){
//
//     }
//
// })



function autonav_listLevel(list){
    if (list.slice(1).every((num)=>num==0)) return 'ch0'
    else if (list.slice(2).every((num)=>num==0)) return 'ch1'
    else if (list.slice(3).every((num)=>num==0)) return 'ch2'
    else if (list.slice(4).every((num)=>num==0)) return 'ch3'
}
//=================================================

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

//=================================================
//АВТООГЛАВЛЕНИЕ УЧЕБНИКА
async function getChapterTitle(num, url){
    let x;
    let y={};
    await $.ajax({
        url:`${url}ch${num}.html`,
        type:'get',
        success: function(data){
            x=$(data)
            x.each(function(){
                if (this.localName=='title') {
                    // console.log(this.innerHTML);
                    y[this.innerHTML]=`${url}ch${num}.html`
                    return false;
                }
            })
        },
        error: function (jqXHR, exception, errorThrown){
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
        }
    });
    return y;
}

//определяем, что находимся в оглавлении учебника
if (!['/', '/index.html', '/chereshan.github.io/index.html'].includes(window.location.pathname) && window.location.pathname.endsWith('index.html')) {
    let index_root = window.location.href.search('index.html')
    index_root = window.location.href.slice(0, index_root)
    let textbookIndex;
    Promise.allSettled(Array.from(Array(20).keys()).map((num) => getChapterTitle(num, index_root))).then(ch => {
        textbookIndex = ch.filter((i) => i.status == "fulfilled").map(j => j.value)
    }).then($(function () {
        $('body ul').not('header ul').empty()
        setTimeout(function () {
            for (let i = 0; i < textbookIndex.length; i++) {
                $('body ul').not('header ul').append(`<li><a href="${Object.values(textbookIndex[i])}">${Object.keys(textbookIndex[i])}</a></li>`)
            }
        }, 500)
    }))
}

//=================================================
//футер
$(function(){
    $('body').append('<footer></footer>')
    $("footer").load(!(
        location.pathname=='/' ||
        location.pathname=='/chereshan.github.io/index.html') ? "../common/footer.html" : "common/footer.html")
})

