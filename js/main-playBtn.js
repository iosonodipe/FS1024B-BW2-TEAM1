function getId() {
    const url = new URLSearchParams(location.search);
    const id = url.get("id");
    return id;
}

function mainPlayBtn () {
    const source = document.querySelector('source');
    const id = getId();
    
}