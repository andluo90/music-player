function $(selector){
    return document.querySelector(selector);
}

// 音乐列表的展示
list_btn.addEventListener('click',()=>{
    song_list.classList.toggle('show')
})