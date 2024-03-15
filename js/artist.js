import { check } from "./fetch.js";

export function fetchArtist(id) {
    check(false);
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`)
        .then((response) => response.json())
        .then((artista) => {
            console.log(artista);
            getArtistInfo(artista);
            let artistFans = document.getElementById("artist-fans");
            let parts = artistFans.innerHTML.split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            artistFans.innerHTML = parts.join(",");

            const fac = new FastAverageColor();
            fac.getColorAsync(artista.picture_xl).then((color) => {
                let a = "";
                let container = document.querySelector("header");
                container.style.backgroundColor = color.rgba;
                container.style.color = color.isDark ? "#fff" : "#000";
                a = color.rgba;

                const mainContent = document.querySelector(".main-content");

                mainContent.addEventListener("scroll", () => {
                    const scrolled = mainContent.scrollTop;
                    const header = document.querySelector("header");
                    scrolled > 48
                        ? (header.style.backgroundColor = a)
                        : (header.style.backgroundColor = "transparent");
                });
            });
        });

    fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`
    )
        .then((response) => response.json())
        .then((song) => {
            console.log(song.data[0]);
            // console.log(album.track);
            getPopular(song, 8);
            appendUnderLikedSongs();

            let replays = document.querySelectorAll(".track-replays");

            replays.forEach((el) => {
                var parts = el.innerHTML.split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                el.innerHTML = parts.join(",");
            });

            let artistFans = document.getElementById("artistFans");
            let parts = artistFans.innerHTML.split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            artistFans.innerHTML = parts.join(",");
        });
}

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
    artistImage.style.backgroundImage = `url(${artista.picture_xl})`;
    const artistName = clone.querySelector("#artist-name");
    artistName.innerText = artista.name;
    const artistFans = clone.querySelector("#artist-fans");
    artistFans.innerText = `${artista.nb_fan}`;
    appendClone(clone);
}
function getPopular(song, n) {
    const template = document.querySelector("#under-liked-song");
    const pippo = template.content.cloneNode(true);
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
        trackDuration.innerText = `${Math.floor(song.data[i].duration / 60)}:${(
            song.data[i].duration % 60
        )
            .toFixed()
            .padStart(2, "0")} min`;
        appendCloneSong(clone);
    }
}

function appendUnderLikedSongs() {
    const template = document.querySelector("#under-liked-song");
    const pippo = template.content.cloneNode(true);
    document.querySelector(".row.artist-songs").append(pippo);
}
