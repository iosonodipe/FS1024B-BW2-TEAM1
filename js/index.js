import { isPage } from "./fetch.js";
import { fetchArtist } from "./artist.js";
import { fetchAlbum } from "./album.js";
import { fillHomePage } from "./home.js";
import { isHomePage } from "./fetch.js";

const pillArtist = document.querySelector(".pill-artist");
const pillAlbum = document.querySelector(".pill-album");

const homeButton = document.querySelector('.home');
homeButton.addEventListener('click', function(e) {
  e.preventDefault()
  if (!isHomePage) {
    emptyTargetDivs("target-container");
    emptyTargetDivs("target-container-song");
    emptyTargetDivs("target-container-playlist");
    // emptyTargetDivs("target-container-artist");
    // emptyTargetDivs("target-container-album");
    fillHomePage();
  }
})


if (!isHomePage) {
  fillHomePage()
}

function createClone(id) {
    const template = document.querySelector(`#${id}`);
    return template.content.cloneNode(true);
}

function appendClone(clone, id) {
    const divTarget = document.querySelector(`.${id}`);
    divTarget.append(clone);
}

function emptyTargetDivs(classe) {
    const div = document.querySelector(`.${classe}`);
    div.innerHTML = "";
}

function sideAlbum() {
    const albumId = [
        75621, 756222, 756233, 756242, 75626, 75627, 75628, 75629, 7562111,
        756245, 75621062, 756284, 756238, 756225, 75622, 75623, 756235, 756220,
        756221,
    ];
    pillAlbum.classList.add("pill-selected");

    albumId.forEach((albumId) => {
        fetch(
            `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`
        )
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
        fetch(
            `https://striveschool-api.herokuapp.com/api/deezer/artist/${artId}`
        )
            .then((response) => response.json())
            .then((artist) => {
                artistClone(artist);
            });
    });
}

sideArtist();

function albumClone(album) {
    const clone = createClone("left-menu");
    const element = clone.querySelector(".element");
    const albumImage = clone.querySelector(".playlist-image");
    const albumName = clone.querySelector(".playlist-name");
    const albumArtist = clone.querySelector(".playlist-artist");

    element.addEventListener("click", function () {
        loadAlbumFetch(album.id);
    });

    albumImage.src = album.cover_small;
    albumName.innerText = album.title;
    albumArtist.innerText = album.artist.name;

    appendClone(clone, "playlist");
}

function artistClone(artist) {
    const clone = createClone("left-menu");
    const element = clone.querySelector(".element");
    const artistImage = clone.querySelector(".playlist-image");
    const artistName = clone.querySelector(".playlist-name");
    const artistArtist = clone.querySelector(".playlist-artist");

    element.addEventListener("click", function () {
        loadArtistFetch(artist.id);
    });
    artistImage.src = artist.picture_small;
    artistName.innerText = artist.name;
    artistArtist.innerText = "";

    appendClone(clone, "playlist");
}

pillArtist.addEventListener("click", function () {
    pillArtist.classList.toggle("pill-selected");
    pillAlbum.classList.remove("pill-selected");
    if (pillArtist.classList.contains("pill-selected")) {
        emptyTargetDivs("playlist");
        sideArtist();
    }
});

pillAlbum.addEventListener("click", function () {
    pillAlbum.classList.toggle("pill-selected");
    pillArtist.classList.remove("pill-selected");
    if (pillAlbum.classList.contains("pill-selected")) {
        emptyTargetDivs("playlist");
        sideAlbum();
    }
});

function loadArtistFetch(id) {
    emptyTargetDivs("target-container");
    emptyTargetDivs("target-container-song");
    emptyTargetDivs("target-container-playlist");
    emptyTargetDivs("target-artist");
    emptyTargetDivs("target-album");
    toggleDisplayNone('target-container-album')
    toggleDisplayNone('target-container-artist')
    fetchArtist(id);
}

function loadAlbumFetch(id) {
    emptyTargetDivs("target-container");
    emptyTargetDivs("target-container-song");
    emptyTargetDivs("target-container-playlist");
    emptyTargetDivs("target-artist");
    emptyTargetDivs("target-album");
    toggleDisplayNone('target-container-album')
    toggleDisplayNone('target-container-artist')
    fetchAlbum(id);
}

function toggleDisplayNone(classe) {
  document.querySelector(`.${classe}`).classList.add("d-none");
}