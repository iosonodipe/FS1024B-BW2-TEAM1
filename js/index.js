const albumId = [75621, 756222, 756233, 756242, 75626, 75627, 75628, 75629, 7562111, 756245, 75621062, 756284, 756238, 756225, 75622, 75623, 756235, 756220, 756221];

const pillArtist = document.querySelector(".pill-artist");
const pillAlbum = document.querySelector(".pill-album");

function createClone(id) {
  const template = document.querySelector(`#${id}`);
  return template.content.cloneNode(true);
}

function appendClone(clone, id) {
  const divTarget = document.querySelector(`.${id}`);
  divTarget.append(clone);
}

function sideAlbum() {
  pillAlbum.classList.add("pill-selected");

  albumId.forEach((albumId) => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
      .then((response) => response.json())
      .then((album) => {
        albumClone(album);
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
// sideAlbum();

function sideArtist() {
  const artistId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16];
  pillArtist.classList.add("pill-selected");

  artistId.forEach((artId) => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artId}`)
      .then((response) => response.json())
      .then((artist) => {
        artistClone(artist);
      });
  });
}
sideArtist();

function albumClone(album) {
  const clone = createClone("left-menu");
  const albumImage = clone.querySelector(".playlist-image");
  const albumName = clone.querySelector(".playlist-name");
  const albumArtist = clone.querySelector(".playlist-artist");

  albumImage.src = album.cover_small;
  albumName.innerText = album.title;
  albumArtist.innerText = album.artist.name;

  appendClone(clone, "playlist");
}

function artistClone(artist) {
  const clone = createClone("left-menu");
  const artistImage = clone.querySelector(".playlist-image");
  const artistName = clone.querySelector(".playlist-name");
  const artistArtist = clone.querySelector(".playlist-artist");

  artistImage.src = artist.picture_small;
  artistName.innerText = artist.name;
  artistArtist.innerText = "";

  appendClone(clone, "playlist");
}

pillArtist.addEventListener("click", function () {
  pillArtist.classList.toggle("pill-selected");
  pillAlbum.classList.remove("pill-selected");
});

pillAlbum.addEventListener("click", function () {
  pillAlbum.classList.toggle("pill-selected");
  pillArtist.classList.remove("pill-selected");
});

function cambioPagina(id, ogg) {
  location.href = `?${ogg}` + `id=${id}`;
  const url = new URLSearchParams(location.search);
  if (url.has(`${ogg}`)) console.log(url);
}
// cambioPagina();
