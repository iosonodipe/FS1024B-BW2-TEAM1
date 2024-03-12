fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/412`)
    .then((response) => response.json())
    .then((artista) => {
        console.log(artista);
        getArtistInfo(artista);


    });

    function createClone() {
        const template = document.querySelector('#artist');
        return template.content.cloneNode(true);
    }

    function appendClone(clone) {
        const divTarget = document.querySelector('.target-container');
        divTarget.append(clone)
    }

    function getArtistInfo(artista) {
        const clone = createClone();
        const artistName = clone.querySelector('#artist-name');
        artistName.innerText = artista.name;
        const artistFans = clone.querySelector('#artist-fans');
        artistFans.innerText = `${artista.nb_fan} ascoltatori mensili`;
        
        appendClone(clone);
    }