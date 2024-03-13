export default function getData(raccolta, id) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/${raccolta}/${id}`)
}
