//скрипт для автооформления сниппета описания html-тега
var collection=document.getElementsByClassName("html_tag_description");
// console.log(collection.textContent.split('\n'))
function add_span(x){
    x=x.trim();
    return '<span class="html_tag_description_atribute">'+x+'</span>'
}
function add_html_tags(x){
    x=x.trim();
    return "<span class=\"html_tag_description_name\">"+'&lt;'+x+'&gt'+"</span>";
}
function add_code_span(x){
    x=x.trim();
    return '<span class="code">'+x+'</span>'
}
function add_label_span(x){
    return '<span class="label">'+x+'</span>'
}


for (let i=0;i<collection.length; i++){
    console.log(collection[i].innerHTML);
    var pstring=collection[i].innerHTML.split('\n');




    //имя тега
    pstring[0]=add_html_tags(pstring[0]);



    //функция
    pstring[1]=add_label_span("Функция: ")+add_span(pstring[1]);



    //атрибуты
    pstring[2]=pstring[2].split(', ');
    for (let j=0; j<pstring[2].length; j++){
        pstring[2][j]=add_code_span(pstring[2][j]);
    }
    pstring[2]=add_label_span("Атрибуты: ")+pstring[2].join(', ');

    //закрывающий тег
    pstring[3]=pstring[3].trim()
    if (pstring[3].toLowerCase()=='нет'){
        pstring[3]="<span class='punctuated_text'>"+pstring[3]+"</span>";
    }
    else{
        pstring[3]=add_code_span((pstring[0].replace('&lt;','&lt;/')));
        if(pstring[3].toLowerCase()=='да'){
            pstring[3]=pstring[3]+", или ничего";
        }
    }
    pstring[3]=add_label_span('Закрывающий тег: ')+pstring[3]
    //содержится в
    pstring[4]=pstring[4].trim()
    if(pstring[4].toLowerCase()=='нет'){
        pstring[4]=add_span("нигде")
    }
    else {
        pstring[4]=pstring[4].split(', ')
        for (let j=0;j<pstring[4].length;j++){
            pstring[4][j]=add_code_span(pstring[4][j])
        }
        pstring[4]=pstring[4].join(', ')
    }
    pstring[4]=add_label_span('Содержится в: ')+pstring[4]


    //содержит
    pstring[5]=pstring[5].trim()
    if(pstring[5].toLowerCase()=='нет'){
         pstring[5]=add_span("нигде")
     }
    else {
        pstring[5]=pstring[5].split(', ')
        for (let j=0;j<pstring[5].length;j++){
             pstring[5][j]=add_code_span(pstring[5][j])
         }
        pstring[5]=pstring[5].join(', ')
    }
    pstring[5]=add_label_span('Содержит: ')+pstring[5]

    for (let j=6;j<pstring.length;j++){
        pstring[j]=pstring[j].trim();
        pstring[j]=pstring[j].split(' ');
        pstring[j]=add_label_span('Атрибут '+add_code_span(pstring[j][0])+': ')+pstring[j].slice(1).join(' ');
    }

    for (let j=1;j<pstring.length;j++){
        pstring[j]="<li>"+pstring[j]+"</li>"
    }
    pstring=pstring.join('\n');
    pstring='<ul>'+pstring+'</ul>';
    collection[i].innerHTML=pstring;

}




