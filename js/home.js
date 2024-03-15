import { check } from "./fetch.js";
import { fetchArtist } from "./artist.js";
import { fetchAlbum } from "./album.js";

function createClone(id) {
  const template = document.querySelector(`#${id}`);
  return template.content.cloneNode(true);
}

function appendClone(clone, id) {
  const divTarget = document.querySelector(`.${id}`);
  divTarget.append(clone);
}

function toggleDisplayNone(classe) {
  document.querySelector(`.${classe}`).classList.remove("d-none");
}

export function fillHomePage() {
    check(true)
    const albumIds = [
        75621, 756222, 756233, 756242, 75626, 75627, 75628, 75629, 7562111,
        756245, 75621062, 756284, 756238, 756225, 75622, 75623, 756235, 756220,
        756221,
    ];
    toggleDisplayNone("target-container-artist");
    toggleDisplayNone("target-container-album");
    staticPlaylists();
    for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random() * 18);
        let id = albumIds[random];
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
            .then((response) => response.json())
            .then((album) => {
                artistSection(album);
                albumSection(album);
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

// fillHomePage();

function staticPlaylists() {
  const clone = createClone("home-playlist");
  appendClone(clone, "target-container-playlist");
}

function artistSection(album) {
  const clone = createClone("home-artist");
  const card = clone.querySelector('.card')
  const artistImage = clone.querySelector(".card-img-top");
  const artistName = clone.querySelector(".card-title");
  artistImage.src = album.contributors[0].picture;
  artistName.innerText = album.contributors[0].name;
  card.addEventListener('click', function() {
    console.log(album.artist.id);
    loadArtistFetch(album.artist.id)
  })
  appendClone(clone, "target-artist");
}

function albumSection(album) {
  const clone = createClone("home-album");
  const card = clone.querySelector('.card')
  const albumImage = clone.querySelector(".card-img-top");
  const albumName = clone.querySelector(".card-title");
  const albumArtist = clone.querySelector(".card-text");
  albumImage.src = album.cover_medium;
  albumName.innerText = album.title;
  albumArtist.innerText = album.contributors[0].name;
  card.addEventListener('click', function() {
    loadAlbumFetch(album.id)
  })
  appendClone(clone, "target-album");
}

function emptyTargetDivs(classe) {
  const div = document.querySelector(`.${classe}`);
  div.innerHTML = "";
}

function addDisplayNone(classe) {
  document.querySelector(`.${classe}`).classList.add("d-none");
}

function loadArtistFetch(id) {
  emptyTargetDivs("target-container");
  emptyTargetDivs("target-container-song");
  emptyTargetDivs("target-container-playlist");
  emptyTargetDivs("target-artist");
  emptyTargetDivs("target-album");
  addDisplayNone('target-container-album')
  addDisplayNone('target-container-artist')
  fetchArtist(id);
}

function loadAlbumFetch(id) {
  emptyTargetDivs("target-container");
  emptyTargetDivs("target-container-song");
  emptyTargetDivs("target-container-playlist");
  emptyTargetDivs("target-artist");
  emptyTargetDivs("target-album");
  addDisplayNone('target-container-album')
  addDisplayNone('target-container-artist')
  fetchAlbum(id);
}


