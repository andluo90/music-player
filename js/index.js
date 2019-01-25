function $(selector){
    return document.querySelector(selector);
}

let music_list
let music =  new Audio()
music.autoplay = true
let music_index = 0
        
  
//加载音乐列表json
let xhr = new XMLHttpRequest()
// xhr.open('GET','https://easy-mock.com/mock/5c3c513f83a6d6013cad2571/test/musicList')
xhr.open('GET','https://easy-mock.com/mock/5c3c513f83a6d6013cad2571/test/musicList2')

xhr.addEventListener('load',()=>{
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
        console.log("音乐加载成功.")
        console.log(xhr.responseText)
        music_list = JSON.parse(xhr.responseText)
        load_music(music_list[music_index])


        let temp ='' //加载播放列表Html
        music_list.forEach((item)=>{
            temp += 
            `<div class="item">
                <span>${item.title}</span>
                <span>播放</span>
            </div>
            `;
            
        })

        song_list.insertAdjacentHTML('beforeend',temp)
        
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
    music.addEventListener('canplay',()=>{
        music.interval = Math.floor(music.duration/100)*1000 //计算进度条更新间格
        // full_time.innerText = (music.duration/60).toFixed(2) //获取音乐时长
        
        let minute = parseInt(music.duration/60)
        let second = parseInt(music.duration%60)+''
        second = second.length === 2 ? second : '0'+second
        full_time.innerText = minute+':'+second //音乐总时长

        percent.style.width = '0%'; //重置进度条为0
    })

    cur_song_name.innerText = obj.trackName
    singer.innerText = obj.albumName
    circle.style.backgroundImage = `url('${obj.trackCoverPath}')`

    play_or_stop.href.baseVal = "#icon-bofang";

    music.addEventListener('playing',()=>{
        play_or_stop.href.baseVal = "#icon-zanting"
        circle.classList.add('active')
        dot.classList.add('active')


    })


    music.should_update = true //是否要更新进度条
    music.addEventListener('timeupdate',()=>{
        // 更新进度条和时间
        if(music.should_update){
            music.should_update = false;
            setTimeout(()=>{
                music.should_update = true;
                // console.log("更新进度条。。。")
                let p = Math.round(music.currentTime/music.duration * 100)
                let minute = parseInt(music.currentTime/60)
                let second = parseInt(music.currentTime%60)+''
                second = second.length === 2 ? second : '0'+second
                percent.style.width = p+'%' //当前播放进度
                cur_time.innerText = minute+':'+second
            },1000)
        }
    })
    
    music.addEventListener('ended',function(){
        
    })
}

//播放/暂停
play_or_stop.addEventListener('click',()=>{
    if(music.paused){
        play_or_stop.href.baseVal = "#icon-zanting"
        music.play()
        circle.classList.add('active') 
        dot.classList.add('active')
        console.log(`点击播放成功`)
    }else{
        play_or_stop.href.baseVal = "#icon-bofang"
        music.pause()
        circle.classList.remove('active')  
        dot.classList.remove('active')

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

//点击进度条事件
total.addEventListener('click',(e)=>{
    console.log("click total...")
    music.currentTime = Math.floor((e.offsetX/e.target.clientWidth)*music.duration)
    console.log(`当前播放时间为${music.currentTime}`)
    let p = Math.round(music.currentTime/music.duration * 100)
    let minute = parseInt(music.currentTime/60)
    let second = parseInt(music.currentTime%60)+''
    second = second.length === 2 ? second : '0'+second
    percent.style.width = p+'%' //当前播放进度
    cur_time.innerText = minute+':'+second
})

//播放完成事件
music.addEventListener('ended',()=>{
    if(music_index === music_list.length-1){
        music_index = 0
        load_music(music_list[music_index])
    }else{
        music_index++
        load_music(music_list[music_index])
    }
})

//







// 音乐列表的展示
list_btn.addEventListener('click',()=>{
    song_list.classList.toggle('show')
})


