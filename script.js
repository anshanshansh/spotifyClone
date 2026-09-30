
let songIndex = 0;
let audioElement = new Audio("Zara Sa Jannat 320 Kbps.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
    {songName: "Zara Sa", filePath: "Zara Sa Jannat 320 Kbps.mp3", coverPath: "d42825861167f3fa73979bc3b168c83c.jpg", duration: "5:05"},
    {songName: "Tujhe Sochta Hoon", filePath: "Tujhe Sochta Hoon Jannat 2 Original Motion Picturetrack 320 Kbps.mp3", coverPath: "5324e52103cdfea30121d319f3819c09.jpg", duration: "4:45"},
    {songName: "Tu Hi Meri Shab Hai", filePath: "Tu Hi Meri Shab Hai Gangster 320 Kbps.mp3", coverPath: "7fe86ad9b3ec7ed4197fb654c23ef391.jpg", duration: "5:12"},
    {songName: "Mere Bina", filePath: "Mere Bina Crook 320 Kbps.mp3", coverPath: "56d0a0777a7e96277b719940a37f7c2a.jpg", duration: "4:56"},
    {songName: "Laapata", filePath: "Laapata Ek Tha Tiger 320 Kbps.mp3", coverPath: "537cb945e58a9d15cd3941afb5f4c752.jpg", duration: "4:32"},
    {songName: "Be Intehaan", filePath: "Be Intehaan Race 2 320 Kbps.mp3", coverPath: "5d080b55187380e77e6222bd95ef6597.jpg", duration: "4:18"},
    {songName: "Ajj Din Chadheya", filePath: "Ajj Din Chadheya Love Aaj Kal 320 Kbps.mp3", coverPath: "40dbfd7e995c4e1a43d3b77555bcc4be.jpg", duration: "4:39"},
    {songName: "Ajab Si", filePath: "Ajab Si Om Shanti Om 320 Kbps.mp3", coverPath: "6bf600761e3a8c0942047827aa05524e.jpg", duration: "4:42"},
    {songName: "Agar Tum Mil Jao(Female)", filePath: "Agar Tum Mil Jao Female-(Mr-Jat.in).mp3", coverPath: "37aeb50472a8f29a1242efcb7829ed90.jpg", duration: "5:27"},
    {songName: "Pehli Nazar Mein", filePath: "Pehli Nazar Mein Race 320 Kbps.mp3", coverPath: "f5c56c2e62b16dd5788486114682f060.jpg", duration: "5:13"}
];

songItems.forEach((element, i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerHTML = `${songs[i].duration}<i class="ri-play-circle-line"></i>`;
    element.addEventListener('click', ()=>{
        if (songIndex === i) {
            // Same song, toggle play/pause
            if (audioElement.paused) {
                audioElement.play();
                masterPlay.classList.remove("ri-play-circle-line");
                masterPlay.classList.add("ri-pause-circle-line");
                element.querySelector(".songListPlay i").classList.remove("ri-play-circle-line");
                element.querySelector(".songListPlay i").classList.add("ri-pause-circle-line");
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                masterPlay.classList.remove("ri-pause-circle-line");
                masterPlay.classList.add("ri-play-circle-line");
                element.querySelector(".songListPlay i").classList.remove("ri-pause-circle-line");
                element.querySelector(".songListPlay i").classList.add("ri-play-circle-line");
                gif.style.opacity = 0;
            }
        } else {
            // Different song
            playSong(i);
        }
    });
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItem")).forEach((element)=>{
        element.classList.remove("active");
        element.querySelector(".songListPlay i").classList.remove("ri-pause-circle-line");
        element.querySelector(".songListPlay i").classList.add("ri-play-circle-line");
    });
};

const playSong = (index) => {
    makeAllPlays();
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("ri-play-circle-line");
    masterPlay.classList.add("ri-pause-circle-line");
    // Update song info
    document.querySelector('.songInfo').innerHTML = `<img src="https://i.pinimg.com/originals/05/4a/a3/054aa3421c22e0c9e04ada3082066a8d.gif" id="gif" height="52px" alt="">${songs[songIndex].songName} - ${songs[songIndex].duration}`;
    gif = document.getElementById("gif");
    gif.style.opacity = 1;
    // Update active song item
    songItems[songIndex].classList.add("active");
    songItems[songIndex].querySelector(".songListPlay i").classList.remove("ri-play-circle-line");
    songItems[songIndex].querySelector(".songListPlay i").classList.add("ri-pause-circle-line");
};

 
//audioElement.play();

masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove("ri-play-circle-line");
        masterPlay.classList.add("ri-pause-circle-line");
        gif.style.opacity = 1;
        document.querySelector(".songItem.active .songListPlay i").classList.remove("ri-play-circle-line");
        document.querySelector(".songItem.active .songListPlay i").classList.add("ri-pause-circle-line");
    }else{
        audioElement.pause();
        masterPlay.classList.remove("ri-pause-circle-line");
        masterPlay.classList.add("ri-play-circle-line");
        gif.style.opacity = 0;
        document.querySelector(".songItem.active .songListPlay i").classList.remove("ri-pause-circle-line");
        document.querySelector(".songItem.active .songListPlay i").classList.add("ri-play-circle-line");
    }
});

audioElement.addEventListener("timeupdate",()=>{
    progress = ((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
});

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration)/100);
})

document.getElementById("next").addEventListener("click",()=>{
    let nextIndex = (songIndex + 1) % songs.length;
    playSong(nextIndex);
});

document.getElementById("previous").addEventListener("click",()=>{
    let prevIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(prevIndex);
});