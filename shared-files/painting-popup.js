const imgPopup = () => {
  const imgDivs = document.querySelectorAll(".painting-container");
  const popup = document.querySelector(".painting-popup");
  const closeBtn = document.querySelector(".close-popup");
  const popupBackground = document.querySelector(".popup-bck");

  const paintingSection = document.querySelector(".painting-div-container");

  const closePopup = () => {
    popup.classList.remove("show");
    paintingSection.style.filter = "blur(0px)";
    popupBackground.classList.remove("show");
    body.style.overflow = "scroll";
  };

  const openPopup = () => {
    popup.classList.add("show");
    popupBackground.classList.add("show");
    paintingSection.style.filter = "blur(10px)";
    body.style.overflow = "hidden";
  };
  imgDivs.forEach((div) => {
    div.addEventListener("click", () => {
      const img = div.querySelector("img");
      popup.querySelector("img").src = img.src;
      if (img.classList.contains("vert-img")) {
        popup.style.height = "95vh";
        popup.style.width = "auto";
        popup.style.maxWidth = window.width - 100;
        popup.querySelector("img").style.height = "100%";
        popup.querySelector("img").style.width = "auto";
      }
      if (img.classList.contains("hori-img")) {
        popup.style.width = "65vw";
        popup.style.height = "auto";
        popup.style.maxHeight = window.height - 100;
        popup.querySelector("img").style.width = "100%";
        popup.querySelector("img").style.height = "auto";
      }
      openPopup();
    });
  });
  closeBtn.addEventListener("click", closePopup);
};
