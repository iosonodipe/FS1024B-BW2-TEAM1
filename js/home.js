const albumIds = [
    75621, 756222, 756233, 756242, 75626, 75627, 75628, 75629, 7562111, 756245,
    75621062, 756284, 756238, 756225, 75622, 75623, 756235, 756220, 756221,
];

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

function fillHomePage() {
    toggleDisplayNone('target-container-artist')
    toggleDisplayNone('target-container-album')
    staticPlaylists();
    for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random() * 18);
        let id = albumIds[random];
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
            .then((response) => response.json())
            .then((album) => {
                artistSection(album);
                albumSection(album)
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

fillHomePage();

function staticPlaylists() {
    const clone = createClone("home-playlist");
    appendClone(clone, "target-container-playlist");
}

function artistSection(album) {
    const clone = createClone("home-artist");
    const artistImage = clone.querySelector(".card-img-top");
    const artistName = clone.querySelector(".card-title");
    artistImage.src = album.contributors[0].picture;
    artistName.innerText = album.contributors[0].name;
    appendClone(clone, "target-container-artist");
}

function albumSection(album) {
    const clone = createClone("home-album");
    const albumImage = clone.querySelector(".card-img-top");
    const albumName = clone.querySelector(".card-title");
    const albumArtist = clone.querySelector(".card-text");
    albumImage.src = album.cover_medium;
    albumName.innerText = album.title;
    albumArtist.innerText = album.contributors[0].name;
    appendClone(clone, "target-container-album");
}
