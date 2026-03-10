const user="berosee"
const repo="repo"

let songs=[]
let names=[]
let index=0

async function loadCategory(folder){
    // 클릭한 버튼 활성화 스타일 적용
    setActiveButton(folder);

    // 아래 줄의 주소 부분을 정확히 수정했습니다.
    const api=`https://api.github.com/repos/${user}/${repo}/contents/${folder}`
    const res=await fetch(api)
    const data=await res.json()

    songs=[]
    names=[]
    let html=""

    data.forEach(file=>{
        if(file.name.endsWith(".mp3")||file.name.endsWith(".flac")){
            // 이 부분의 .net/gh 경로를 수정했습니다.
            const url=`https://cdn.jsdelivr.net/gh/${user}/${repo}@main/${folder}/${file.name}`
            songs.push(url)
            names.push(file.name)
            html+=`<div class="song" onclick="play(${songs.length-1})">${file.name}</div>`
        }
    })
    document.getElementById("playlist").innerHTML=html
}

function setActiveButton(folderId) {
    const buttons = document.querySelectorAll('.menu button');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.getElementById(folderId);
    if(activeBtn) {
        activeBtn.classList.add('active');
    }
}

function play(i){
    index=i
    const player=document.getElementById("player")
    player.src=songs[index]
    player.play()
    
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