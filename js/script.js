const mainContent = document.querySelector(".main-content");

mainContent.addEventListener("scroll", () => {
  const scrolled = mainContent.scrollTop;
  const header = document.querySelector("header");
  scrolled > 48
    ? (header.style.backgroundColor = "rgb(40,40,40)")
    : (header.style.backgroundColor = "transparent");
});
