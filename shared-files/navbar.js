const menuOverlay = document.querySelector(".menu-overlay");
const openMenuButton = document.querySelector(".menu");
const closeMenuButton = document.querySelector(".menu-x");
const navbarMain = document.querySelector("main");
const menuChilds = document.querySelectorAll(".menu-ul > *");
const menuH2 = document.querySelector(".menu-overlay h2");
const soc = document.querySelector(".soc-links");
const body = document.querySelector("body");

const openMenu = () => {
  menuOverlay.style.display = "block";
  navbarMain.style.filter = "blur(10px)";
  body.style.overflowY = "hidden";

  //menuCloseButton transition
  setTimeout(() => {
    closeMenuButton.style.opacity = "1";
    closeMenuButton.style.transform = "rotate(0deg)";
  }, 10);

  // menuLinks transition
  setTimeout(() => {
    menuChilds.forEach((child) => {
      child.style.transform = "translateX(0)";
    });
  }, 5);

  //h2 transition
  setTimeout(() => {
    menuH2.style.opacity = "1";
  }, 15);

  //Soc links transition
  setTimeout(() => {
    soc.style.transform = "translateY(0)";
  }, 20);
};

const closeMenu = () => {
  closeMenuButton.style.opacity = "0";
  body.style.overflowY = "scroll";
  closeMenuButton.style.transform = "rotate(30deg)";
  navbarMain.style.filter = "blur(0px)";
  menuChilds.forEach((child) => {
    child.style.transform = "translateX(500px)";
  });
  menuH2.style.opacity = "0";
  soc.style.transform = "translateY(100px)";
  setTimeout(() => {
    menuOverlay.style.display = "none";
  }, 150);
};

const windowTooBigMenuClose = () => {
  if (window.innerWidth >= 460) {
    closeMenu();
  }
};

openMenuButton.onclick = openMenu;
closeMenuButton.onclick = closeMenu;

window.addEventListener("resize", windowTooBigMenuClose);

const logo = document.querySelector("#logo");

const changeLogoColor = () => {
  logo.style.filter =
    "brightness(0.5) saturate(150%) invert(54%) sepia(73%) saturate(5647%) hue-rotate(337deg) brightness(91%) contrast(84%)";
};

const changeLogoColorBack = () => {
  logo.style.filter = "none";
};

logo.addEventListener("mouseover", changeLogoColor);
logo.addEventListener("mouseout", changeLogoColorBack);

////////////////////////////////////////////////////////////////
//ANIMATIONS//

const onScreenObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("scroll-visible");
    } else {
      entry.target.classList.remove("scroll-visible");
    }
  });
});

const scrollAnimation = () => {
  const scrollHiddenElements = document.querySelectorAll(".scroll-hidden");
  scrollHiddenElements.forEach((el) => {
    onScreenObserver.observe(el);
  });
};
