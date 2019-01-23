function $(selector){
    return document.querySelector(selector);
}

$('#list_btn').addEventListener('click',()=>{
    $('#song_list').classList.toggle('show')
})