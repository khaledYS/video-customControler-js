const input = document.getElementById("input");
const video = document.getElementById("video1");
const volume = document.getElementById("volume");
const volumeImg = document.getElementById("volumeimg");
const go = document.getElementById("play");
const full = document.getElementById("fullscreen");
const durSpanall = document.getElementById("durationspanall");
const durSpancut = document.getElementById("durationspancut");
const durInput = document.getElementById("durationinput");


// function when its downloaded
video.addEventListener('loadedmetadata', function() {
    const videoDuration = video.duration;
    video.removeAttribute("controls", "");
    durInput.setAttribute("max", videoDuration);
    durInput.setAttribute("min", 0);
    durInput.setAttribute("value", 0);
    durSpanall.innerText = splitDurationAll();
    durSpancut.innerText = "00";
    volume.setAttribute('max', 1);
    volume.setAttribute('min', 0);
    volume.setAttribute('step', 0.000001);
    volume.value = 0.5;
    splitDurationAll();
});

// function to update the duration
video.ontimeupdate = function utDR(){
    const videoCurrentTime = video.currentTime;
    durInput.setAttribute('value', videoCurrentTime);
    durInput.value = videoCurrentTime;
    durSpancut.innerText = splitDurationCut();
}

// function when clickin or changing the value of the duration range
function skipAhed(event)
{
    const skipTo = event.target.value;
    video.currentTime = skipTo;
    durInput.value = skipTo;
}
durInput.addEventListener('input', skipAhed);

// fuction to play the video
go.onclick = function() {
    if(video.paused){
        video.play();
        // play action
        go.classList.add("fa-pause");
        go.classList.remove("fa-play");
    }else{
        video.pause();
        // pause ation 
        go.classList.add("fa-play");
        go.classList.remove("fa-pause");
    }   
};

// fuction to full screen the video
full.onclick = enterFull;
function enterFull() {
    if(video.parentElement.style.position == "fixed"){
        video.parentElement.style.position = "relative";
        video.parentNode.style.maxWidth = "";
        video.parentNode.style.maxHeight = "none";
        video.parentNode.style.display = "block";
        video.parentNode.style.flexDirection = "none";
        video.parentNode.style.alignContent = "none";
        video.parentNode.style.justifyContent = "none";
        video.parentNode.style.backgroundColor = "transparent";
        video.parentNode.style.height = "";
        video.style.maxWidth = "none";
        video.style.width = "";
    }else{
        video.parentElement.style.position = "fixed";
        video.parentNode.style.maxWidth = "100%";
        video.parentNode.style.maxHeight = "100vh";
        video.parentNode.style.display = "flex";
        video.parentNode.style.flexDirection = "row";
        video.parentNode.style.alignContent = "center";
        video.parentNode.style.justifyContent = "center";
        video.parentNode.style.backgroundColor = "#201e1e";
        video.parentNode.style.height = "100vh";
        video.style.maxWidth = "none";
        video.style.width = "100%";
    }   
};


document.addEventListener('keypress', function (event) {
    if(event.key == "k" || event.key == "K" && event.shiftKey == true){
        if(video.paused){
            video.play();
        }else{
            video.pause()
        }
    }
});


// a function when the volume range change change the video volume
volume.addEventListener('input', e => {
    video.volume = e.target.value;
    tochangeVolumeImg(e);
    console.log(e.target.value);
});


function tochangeVolumeImg(v){
    if(v.target.value >= 0.5){
        volumeImg.src = "two.svg";
    }else if(v.target.value < 0.5 && v.target.value > 0){
        volumeImg.src = "one.svg";
    }else{
        volumeImg.src = "https://www.svgrepo.com/show/38427/muted-speaker.svg";
    }
}
// a function that get the whole duration and split it to seconds minuts and hours
function splitDurationAll(){
    var videoDurInSec = Math.floor(video.duration);
    var min = videoDurInSec / 60;
    var restMin = videoDurInSec % 60;
    var hours = Math.floor(min / 60);
    var restHours = Math.floor(min % 60);
    var all;
    if(hours == 0 ){
        all = `${restHours}:${restMin}`;
    }else{
        all = `${hours}:${restHours}:${restMin}`;
    }
    return all;
}


// a function that gets the current time with split
function splitDurationCut(){
    var videoCur = Math.floor(video.currentTime);
    var min = Math.floor(videoCur / 60);
    var restMin = videoCur % 60;
    var hours = Math.floor(min / 60);
    var restHours = min % 60;
    var all;
    if(hours <= 0){
        all = `${restHours}:${restMin}`;
    }else{
        all = ` ${hours}:${restHours}:${restMin} `;
    }
    return all;
}


function changeVideo(event){
    if(event == 1){
        video.src = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";
    }else if (event == 2){
        video.src = "https://o5-pb8-s-1hc8.vdst.one/watch/59ed67dc1c7be912KH2YfEocizB0inHzt.EclfEOnCP45nW-YanJyLTg__.V0VzN0hHZTBucnFHdlJHdzRYUUhIQ3ErUTdpdFZHZmVoV0RieHBlT1pKNzdLRW85bTRuMkxQbDdyK0VRcjA4T3MxVjdYY1M0S2RUdUFFNWl6RklvZklyZHBPeFg5cnE2dzFvWUZkTXpHdXU2Zkw1bnRVR1ZnU1N6bk0zK1MxRlpDdTA2Nkp3Q2hUYUN1OWVmWHZmMVdObTBBKzRvaGUwdnZFQ2U5blBPMFlJRUFwa3VDZC9Sb3lYL2d4bUpJeTM4ZU5iREtVTU5sOVhwOGY1cXNKSUYzRWhkYmxlS0d3bU9RSXBrVDA2UWRRRU1HL2FGd1p1dlROQkJDcTJ3aWFkM3VZaFpxVGtySW5aZCtwdEtiRXZUNnZqRy9XM1FpZTdORkZMRXpMMTBlT0JQOUhERGZCUXFzUHlINUdNdWNRdS9QYVpQYlZrRG9wUHN2dXdsclhldks3ZmNRS245OTA5MEt0YU5MVGw1YTVDV0Q0bjJZeEl0OUJlc25LY0gxdG1rM2dQaGdVa0M1b3NEVytVVnQ4NThNM0thVytpVXY0U2xweHNsNGc9PQ__";
    }else if(event == 3){
        video.src = "VID-20210218-WA0007.mp4";
    }else{
        console.error("wrong input");
    }
}
changeVideo(3);