export function createCloneAlbum(id) {
  const template = document.querySelector(id);
  return template.content.cloneNode(true);
}
