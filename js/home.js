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
    check(true);
    const albumIds = [
        75621062, 103376, 423368, 82107, 595243, 288437072, 66644272, 309377597,
        249673, 533925222, 502369701, 122366, 39232941, 321004297, 96636772,
        7533292, 212377, 72487842, 401032, 1434890,
    ];
    toggleDisplayNone("target-container-artist");
    toggleDisplayNone("target-container-album");
    staticPlaylists();
    for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random() * 20);
        let id = albumIds[random];
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
            .then((response) => response.json())
            .then((album) => {
                artistSection(album);
                albumSection(album);

                const mainContent = document.querySelector(".main-content");

                mainContent.addEventListener("scroll", () => {
                    const scrolled = mainContent.scrollTop;
                    const header = document.querySelector("header");
                    header.style.backgroundColor = "transparent"
                    scrolled > 48
                        ? (header.style.backgroundColor = '#282828')
                        : (header.style.backgroundColor = "transparent");
                });
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
    const card = clone.querySelector(".card");
    const artistImage = clone.querySelector(".card-img-top");
    const artistName = clone.querySelector(".card-title");
    artistImage.src = album.contributors[0].picture;
    artistName.innerText = album.contributors[0].name;
    card.addEventListener("click", function () {
        console.log(album.artist.id);
        loadArtistFetch(album.artist.id);
    });
    appendClone(clone, "target-artist");
}

function albumSection(album) {
    const clone = createClone("home-album");
    const card = clone.querySelector(".card");
    const albumImage = clone.querySelector(".card-img-top");
    const albumName = clone.querySelector(".card-title");
    const albumArtist = clone.querySelector(".card-text");
    albumImage.src = album.cover_medium;
    albumName.innerText = album.title;
    albumArtist.innerText = album.contributors[0].name;
    card.addEventListener("click", function () {
        loadAlbumFetch(album.id);
    });
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
    addDisplayNone("target-container-album");
    addDisplayNone("target-container-artist");
    fetchArtist(id);
}

function loadAlbumFetch(id) {
    emptyTargetDivs("target-container");
    emptyTargetDivs("target-container-song");
    emptyTargetDivs("target-container-playlist");
    emptyTargetDivs("target-artist");
    emptyTargetDivs("target-album");
    addDisplayNone("target-container-album");
    addDisplayNone("target-container-artist");
    fetchAlbum(id);
}
