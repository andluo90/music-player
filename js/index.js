function $(selector){
    return document.querySelector(selector);
}

let music_list
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
        music_list = JSON.parse(xhr.responseText)
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
    play_or_stop.href.baseVal = "#icon-zanting"

}

//播放/暂停
play_or_stop.addEventListener('click',()=>{
    if(music.paused){
        play_or_stop.href.baseVal = "#icon-zanting"
        music.play()    
        console.log(`点击播放成功`)
    }else{
        play_or_stop.href.baseVal = "#icon-bofang"
        music.pause()
        console.log(`点击暂停成功`)


    }
})

//播放下一首
play_next.addEventListener('click',()=>{
    if(music_index === music_list.length-1){
        music_index = 0
        load_music(music_list[music_index])
    }else{
        music_index++
        load_music(music_list[music_index])
    }
})

//播放上一首
play_pre.addEventListener('click',()=>{
    if(music_index === 0){
        music_index = music_list.length -1
        load_music(music_list[music_index])
    }else{
        music_index--
        load_music(music_list[music_index])
    }

})
//







// 音乐列表的展示
list_btn.addEventListener('click',()=>{
    song_list.classList.toggle('show')
})