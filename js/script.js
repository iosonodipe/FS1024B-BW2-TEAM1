const mainContent = document.querySelector(".main-content");

mainContent.addEventListener("scroll", () => {
  const scrolled = mainContent.scrollTop;
  const header = document.querySelector("header");
  scrolled > 48
    ? (header.style.backgroundColor = "grey")
    : (header.style.backgroundColor = "transparent");
});
