function scrollTransition(b = "rgb(40,40,40)") {
  const mainContent = document.querySelector(".main-content");

  mainContent.addEventListener("scroll", () => {
    const scrolled = mainContent.scrollTop;
    const header = document.querySelector("header");
    scrolled > 48 ? (header.style.backgroundColor = b) : (header.style.backgroundColor = "transparent");
  });
}

document.onload = scrollTransition();

let a = "";

fetch("https://striveschool-api.herokuapp.com/api/deezer/album/7565656")
  .then((response) => response.json())
  .then((album) => {
    console.log(album.tracks.data[0].preview);
    console.log(album.tracks.data[0].title);
    console.log(document.querySelector(".target-container-song"));
    getAlbumInfo(album);
    getAlbumSong(album);

    const track = document.querySelectorAll(".track-source");
    console.log(track);

    const fac = new FastAverageColor();
    fac
      .getColorAsync(album.cover_medium)
      .then((color) => {
        let container = document.querySelector(".container-info-album");
        container.style.backgroundColor = color.rgba;
        container.style.color = color.isDark ? "#fff" : "#000";
        a = color.rgba;
        scrollTransition(a);
        console.log("Average color", color.rgba);
      })
      .catch((e) => {
        console.log(e);
      });
  });

function createCloneAlbum() {
  const template = document.querySelector("#album");
  return template.content.cloneNode(true);
}
function createCloneAlbumSong() {
  const template = document.querySelector("#album-brani");
  return template.content.cloneNode(true);
}
function appendCloneAlbumInfo(clone) {
  const divTarget = document.querySelector(".target-container");
  divTarget.append(clone);
}
function appendCloneAlbumSong(clone) {
  const divTarget = document.querySelector(".target-container-song");
  divTarget.append(clone);
}
function getAlbumSong(album) {
  for (let i = 0; i < album.nb_tracks; i++) {
    const clone = createCloneAlbumSong();
    const track = clone.querySelector(".track-source");
    const titoloCanzone = clone.querySelector(".titolo-canzone");
    const nomeArtista = clone.querySelector(".artista-nome");
    const duration = clone.querySelector(".lunghezza-brano");
    const numeroBrano = clone.querySelector(".n-brano");

    numeroBrano.textContent = i + 1;
    track.textContent = album.tracks.data[i].preview;

    titoloCanzone.textContent = album.tracks.data[i].title;
    nomeArtista.textContent = album.tracks.data[i].artist.name;
    duration.textContent = `${Math.floor(album.tracks.data[i].duration / 60)}:${(album.tracks.data[i].duration % 60).toFixed()} min`;

    appendCloneAlbumSong(clone);
  }
}
function getAlbumInfo(album) {
  const clone = createCloneAlbum();
  const imageAlbum = clone.querySelector(".album-img");
  const nomeAlbum = clone.querySelector(".album-name");
  const nomeArtista = clone.querySelector(".nome-artista");
  const annoAlbum = clone.querySelector(".anno-album");
  const numeroBrani = clone.querySelector(".numero-brani");
  const totaleAscolto = clone.querySelector(".totale-ascolto");

  imageAlbum.src = album.cover_medium;
  nomeAlbum.textContent = album.title;
  nomeArtista.textContent = album.contributors[0].name;
  annoAlbum.textContent = album.release_date;
  numeroBrani.textContent = `${album.nb_tracks} Brani in Totale`;
  totaleAscolto.textContent = `Totale ascolto: ${(Math.floor(album.duration) / 60 / 60).toFixed()}:${album.duration % 60} Ore `;
  appendCloneAlbumInfo(clone);
}
