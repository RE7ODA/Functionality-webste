const navlist = document.getElementById("nav-list");
const menu = document.getElementById("nav-toggle");
const closeMenu = document.getElementById("nav-toggle-close");


menu.addEventListener("click", (e) => {
    navlist.style.display = "none";
    menu.style.display = "none";
    closeMenu.style.display = "flex";
});

closeMenu.addEventListener("click", (e) => {
    navlist.style.display = "flex";
    menu.style.display = "flex";
    closeMenu.style.display = "none";
});

const mediaQuery = window.matchMedia('(max-width: 768px)');

function handleScreenChange(e) {
    if (e.matches) {
        closeMenu.style.display = "flex";
    } else {
        menu.style.display = "none";
        closeMenu.style.display = "none";
    }
  }

  mediaQuery.addListener(handleScreenChange)

  handleScreenChange(mediaQuery)