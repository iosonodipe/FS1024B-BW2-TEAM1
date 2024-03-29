let song = document.getElementById("song");
let playBtn = document.querySelector(".playBtn");
let playIcon = document.querySelector("#iconBtn");
let progressed = document.querySelector("#progressed");
let progressBar = document.querySelector("#progressBar");
let minutesInit = document.querySelector(".minutesInit");
let volume = document.getElementById("volumeRange");
let heart = document.querySelector('.heart')
let songIndex = 0

function changeColor() {
  heart.addEventListener('click', () => {
    if(heart.classList.contains('bi-heart')){
      heart.classList.remove('bi-heart');
      heart.classList.add('bi-heart-fill')
      heart.style.color = "green"
    } else if (heart.classList.contains('bi-heart-fill')) {
      heart.classList.remove('bi-heart-fill')
      heart.classList.add('bi-heart');
      heart.style.color = "white"
    }
  })
}

//PROGRESS BAR//
song.ontimeupdate = function () {
  progressed.style.width =
    Math.floor((song.currentTime * 100) / song.duration) + "%";
};

progressBar.addEventListener("click", (e) => {
  song.currentTime = (e.offsetX / progressBar.offsetWidth) * song.duration;
});

//VOLUME RANGE//

volumeRange.addEventListener("input", (e) => {
  song.volume = e.currentTarget.value / 100;
});

//AGGIORNAMENTO TEMPO//
let s = 0;
let m = 0;

function aggiorn(e) {
  let m = 0;
  let s = 0;
  for (let i = 0; i < e; i++) {
    s++;
    if (s >= 60) {
      m++;
      s = 0;
    }
  }
  return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}

function aggiornamento() {
  minutesInit.innerText = aggiorn(Math.floor(song.currentTime));
}

setInterval(aggiornamento, 1000);

//PLAY/PAUSE//
function playSong() {
  playIcon.classList.add("bi-pause-circle-fill");
  playIcon.classList.remove("bi-play-circle-fill");
  song.play();
}
function pauseSong() {
  playIcon.classList.remove("bi-pause-circle-fill");
  playIcon.classList.add("bi-play-circle-fill");
  song.pause();
}
playBtn.addEventListener("click", () => {
  const songProd = playIcon.classList.contains("bi-play-circle-fill");

  if (songProd) {
    playSong();
  } else {
    pauseSong();
  }
});