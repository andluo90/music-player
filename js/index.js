function $(selector){
    return document.querySelector(selector);
}

let music =  new Audio()
music.autoplay = true
let music_index = 0
        
  
//加载音乐列表json
let xhr = new XMLHttpRequest()
xhr.open('GET','https://easy-mock.com/mock/5c3c513f83a6d6013cad2571/test/musicList')
xhr.addEventListener('load',()=>{
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
        console.log("音乐加载成功.")
        console.log(xhr.responseText)
        let music_list = JSON.parse(xhr.responseText)
        load_music(music_list[music_index])
        
    }else{
        console.log(`音乐加载失败 ${xhr.status} ${xhr.responseText}`)
    }
})

xhr.addEventListener('error',()=>{
    console.log(`网络异常 ${xhr.status}`)
})
xhr.send()

//加载音乐，并且默认播放
function load_music(obj){
    music.src = obj.src
    cur_song_name.innerText = obj.title
    singer.innerText = obj.auther
}


play_or_stop.addEventListener('click',()=>{
    if(music.paused){
        play_or_stop.href.baseVal = "#icon-zanting"
        music.play()    
    }else{
        play_or_stop.href.baseVal = "#icon-bofang"
        music.pause()

    }
})







// 音乐列表的展示
list_btn.addEventListener('click',()=>{
    song_list.classList.toggle('show')
})