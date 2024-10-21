//ex1
//Отыщем и разместим в таблице первые 3 элементов head
let body_tags=jQuery('head *');
let ex1=jQuery('#ex1 ol');
for (let i=0; i<3; i++){
    ex1.append("<li>"+"<span class=\"code\">"+body_tags[i].outerHTML.replace('<','&lt;')+"</span>"+"</li>")
}
//============================================================================
//ex1.1
//Применим к таблице выше CSS-стили
ex1.css('border','2px dotted black')
//============================================================================
//ex2
//Найдем первые 5 первых параграфов, следующих непосредственно после заголовков
let ex2=jQuery('#ex2')
let p_after_header=jQuery(':header + p')
for (let i=0; i<5; i++){
    ex2.append("<li>"+p_after_header[i].innerText+"</li>")
}
//============================================================================
//ex3
//Мы можем искать элементы, указав элементом уровень поиска, т.е., другими словами, искать сестринские элементы
//Найдем первые 5 первых параграфов, следующих непосредственно после заголовков
// для начала облегчим себе жизнь, написав функцию, которая
//принимает в качестве аргумента id списка на странице, а
//затем размещает в нем первые n элементов массива из
//jquery-запроса
function ol_writer(ol_id, query, n=5){
    ol_id=jQuery(ol_id)
    query=jQuery(query)
    for (let i=0; i<n; i++){
        ol_id.append('<li>'+query.eq(i).html().replace('<','&lt;')+"</li>")
    }
}
ol_writer('#ex3', '#ex3 ~ *', 3)
//============================================================================
//ex4
//Найдем и запишем в список только элементы имеющие id
jQuery('[id]').each(function(){
    jQuery('#ex4').append("<li>"+$(this).attr('id')+"</li>")
})
//============================================================================
//ex5
//Найдем и запишем в список только элементы имеющие id
jQuery('a[href^="#"]').each(function(){
    jQuery('#ex5').append("<li>"+$(this).attr('href')+"</li>")
})
//============================================================================
//ex6
$("#ex6 input:disabled").attr('placeholder',"Не доступно");
$("#ex6 input:enabled").attr('placeholder',"Доступно");
//============================================================================
//ex7
function yearsEstimate() {
    let years=0;
    $("#ex7 input:checked").each(function(){
        years+=$(this).data('years')
    });
    $("#ex7 div").text("Вероятный возраст — " + years);
}
yearsEstimate(); //вызов
$("#ex7").on('click', yearsEstimate);
//============================================================================
//ex8
$('#ex8').on('click', function(){
    $('#ex6 input').each(function(){
        $(this).is(':disabled')? $(this).removeAttr('disabled'): $(this).attr('disabled', 'true')

    })
    $('#ex6 input:enabled:eq(0)').trigger('focus')
})


//=============================================================================
//ex10
let fetch_event = new Event('fetch-data');
let user_list
async function getdata(){
    const res=await fetch('https://fakestoreapi.com/users?limit=5')
    user_list=await res.json()
    document.dispatchEvent(fetch_event)
}
getdata()
document.addEventListener("fetch-data", function() {
    user_list.map(function(l){
        l['address']=`${l['address'].city}, ${l['address'].street}, ${l['address'].number}`
        l['name']=`${l['name'].firstname
        } ${l['name'].lastname}`
        return l
    })
    $(function(){
        list_of_dicts_to_table(user_list, '#table_ex10')
        $('#table_ex10 td:nth-child(3)').css('font-family','monospace').css('background', 'cornsilk')
    })
});