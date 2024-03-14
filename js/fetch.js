export default function getData(raccolta, id) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/${raccolta}/${id}`)
}

export function isPage(page) {
    const url = new URLSearchParams(location.search)
    return url.has(page)
}
