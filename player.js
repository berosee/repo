const user="berosee"
const repo="repo"

let songs=[]
let names=[]
let index=0

async function loadCategory(folder){
    const api=`https://api.github.com/repos/${user}/${repo}/contents/${folder}`
    const res=await fetch(api)
    const data=await res.json()

    songs=[]
    names=[]
    let html=""

    data.forEach(file=>{
        if(file.name.endsWith(".mp3")||file.name.endsWith(".flac")){
            const url=`https://cdn.jsdelivr.net/gh/${user}/${repo}@main/${folder}/${file.name}`
            songs.push(url)
            names.push(file.name)
            html+=`<div class="song" onclick="play(${songs.length-1})">${file.name}</div>`
        }
    })
    document.getElementById("playlist").innerHTML=html
}

// 버튼 색상 유지 함수
function setActive(id) {
    const buttons = document.querySelectorAll('.menu button');
    buttons.forEach(btn => btn.classList.remove('active')); // 모든 버튼 파란색 제거
    
    const target = document.getElementById(id);
    if(target) {
        target.classList.add('active'); // 선택한 버튼만 파란색 추가
    }
}

function play(i){
    index=i
    const player=document.getElementById("player")
    player.src=songs[index]
    player.play()
    
    // 현재 곡 강조
    const songDivs = document.querySelectorAll('.song');
    songDivs.forEach((div, idx) => {
        if(idx === i) div.classList.add('playing');
        else div.classList.remove('playing');
    });
}

function nextSong(){
    index++;
    if(index>=songs.length) index=0;
    play(index);
}

function prevSong(){
    index--;
    if(index<0) index=songs.length-1;
    play(index);
}

function randomSong(){
    index=Math.floor(Math.random()*songs.length);
    play(index);
}

document.getElementById("player").addEventListener("ended", nextSong);