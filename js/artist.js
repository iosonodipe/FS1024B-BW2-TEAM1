fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/412`)
  .then((response) => response.json())
  .then((artista) => {
    console.log(artista);
    getArtistInfo(artista);
  });

fetch(
  `https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=50`
)
  .then((response) => response.json())
  .then((song) => {
    console.log(song.data[0]);
    // console.log(album.track);
    getPopular(song, 8);
  });

function createClone() {
  const template = document.querySelector("#artist");
  return template.content.cloneNode(true);
}
function createCloneSong() {
  const template = document.querySelector("#artist-song");
  return template.content.cloneNode(true);
}
function appendClone(clone) {
  const divTarget = document.querySelector(".target-container");
  divTarget.append(clone);
}
function appendCloneSong(clone) {
  const divTarget = document.querySelector(".target-container-song");
  divTarget.append(clone);
}
function getArtistInfo(artista) {
  const clone = createClone();
  const artistImage = clone.querySelector("#artist-image");
  artistImage.style.backgroundImage = `url(${artista.picture_big})`;
  const artistName = clone.querySelector("#artist-name");
  artistName.innerText = artista.name;
  const artistFans = clone.querySelector("#artist-fans");
  artistFans.innerText = `${artista.nb_fan} ascoltatori mensili`;
  appendClone(clone);
}
function getPopular(song, n) {
  for (let i = 1; i <= n; i++) {
    const clone = createCloneSong();
    const trackRank = clone.querySelector(".track-rank");
    const trackImage = clone.querySelector(".track-image");
    const trackTitle = clone.querySelector(".track-title");
    const trackReplays = clone.querySelector(".track-replays");
    const trackDuration = clone.querySelector(".track-duration");
    trackRank.innerText = i;
    trackImage.src = song.data[i].album.cover_small;
    trackTitle.innerText = song.data[i].title;
    trackReplays.innerText = song.data[i].rank;
    trackDuration.innerText = `${Math.floor(song.data[i].duration / 60)}:${
      song.data[i].duration % 60
    } min `;
    appendCloneSong(clone);
  }
}
