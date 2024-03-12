
let song = document.getElementById('song');
let playBtn = document.querySelector('.playBtn');
let playIcon = document.querySelector('#iconBtn');
let progressBar = document.querySelector('#progressed')

//PROGRESS BAR//
song.ontimeupdate = function () {
    progressBar.style.width = Math.floor(song.currentTime * 100 / song.duration) + "%"
}

//PLAY/PAUSE//
function playSong() {
    playIcon.classList.add('bi-pause-circle-fill')
    playIcon.classList.remove('bi-play-circle-fill')
    song.play()
}
function pauseSong() {
    playIcon.classList.remove('bi-pause-circle-fill')
    playIcon.classList.add('bi-play-circle-fill')
    song.pause()
}
playBtn.addEventListener('click', () => {

    const songProd = playIcon.classList.contains('bi-play-circle-fill')

    if (songProd) {
        playSong()
    } else {
        pauseSong()
    }
})