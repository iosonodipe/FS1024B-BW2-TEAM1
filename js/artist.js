fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/412`)
    .then((response) => response.json())
    .then((artista) => {
        console.log(artista);
        getArtistInfo(artista);
    });

fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/75621062`)
    .then((response) => response.json())
    .then((album) => {
        console.log(album);
        // console.log(album.track);
        const clone = createClone();
        getPopularSongs(album, 6)
        appendClone(clone);
    });

function createClone() {
    const template = document.querySelector("#artist");
    return template.content.cloneNode(true);
}

function appendClone(clone) {
    const divTarget = document.querySelector(".target-container");
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
}

function getPopularSongs(album, n) {
    const clone = createClone();
    const trackRank = clone.querySelector('.track-rank');
    const trackImage = clone.querySelector('.track-image');
    const trackTitle = clone.querySelector('.track-title');
    const trackReplays = clone.querySelector('.track-replays');
    const trackDuration = clone.querySelector('.track-duration');
    for (let i = 1; i < n; i++) {
        trackRank.innerText = i;
        trackImage.src = album.cover_small;
        trackTitle.innerText = album.tracks.data[i].title;
        trackReplays.innerText = album.tracks.data[i].rank;
        trackDuration.innerText = album.tracks.data[i].duration;
    }
}