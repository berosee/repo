const user="YOUR_GITHUB_ID"
const repo="music-server"

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

function play(i){

index=i
const player=document.getElementById("player")

player.src=songs[index]
player.play()

}

function nextSong(){

index++

if(index>=songs.length)
index=0

play(index)

}

function prevSong(){

index--

if(index<0)
index=songs.length-1

play(index)

}

function randomSong(){

index=Math.floor(Math.random()*songs.length)

play(index)

}

function searchSong(){

let input=document.getElementById("search").value.toLowerCase()

let html=""

names.forEach((name,i)=>{

if(name.toLowerCase().includes(input)){

html+=`<div class="song" onclick="play(${i})">${name}</div>`

}

})

document.getElementById("playlist").innerHTML=html

}

document.getElementById("player").addEventListener("ended",nextSong)