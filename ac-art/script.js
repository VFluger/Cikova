///TRACKING RADIUS GRADIENT///
const handleOnMouseMove = (e) => {
  const { currentTarget: target } = e;

  const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};

for (const folder of document.querySelectorAll(".folder")) {
  folder.onmousemove = (e) => handleOnMouseMove(e);
}

const pdfDivs = document.querySelectorAll(".pdf-div");
const changeHeightPdf = () => {
  pdfDivs.forEach((pdfDiv, index) => {
    const img = document.querySelectorAll(".pdf-img")[index];
    img.addEventListener("load", () => {
      pdfDiv.style.height = img.height + "px";
    });
    pdfDiv.style.height = img.height + "px";
  });
};

changeHeightPdf();
window.addEventListener("resize", changeHeightPdf);

/////////////////////////////////////////////////////////////
//side functions for popup funcs

const popup = document.querySelector(".painting-popup");
const blurSections = document.querySelectorAll(`.blur-section`);
const popupBackground = document.querySelector(".popup-bck");

const closePopup = () => {
  popup.classList.remove("show");
  blurSections.forEach((section) => {
    section.style.filter = "blur(0px)";
  });
  popupBackground.classList.remove("show");
  body.style.overflow = "scroll";
};

const openPopup = () => {
  popup.classList.add("show");
  popupBackground.classList.add("show");
  blurSections.forEach((section) => {
    section.style.filter = "blur(10px)";
  });
  body.style.overflow = "hidden";
};

const setPopupDimensionsAcordingToDevice = (popupImg) => {
  const setPopupDimensions = (setBy) => {
    if (setBy === "width") {
      popup.style.width = "95vw";
      popup.style.height = "auto";
      popup.style.maxHeight = window.height - 100;
      popup.querySelector("img").style.width = "100%";
      popup.querySelector("img").style.height = "auto";
      return;
    }
    if (setBy === "height") {
      popup.style.height = "95vh";
      popup.style.width = "auto";
      popup.style.maxWidth = window.width - 100;
      popup.querySelector("img").style.height = "100%";
      popup.querySelector("img").style.width = "auto";
      return;
    }
  };
  const isVertical = Math.floor(popupImg.width / popupImg.height)
    ? false
    : true;
  if (!isVertical) {
    setPopupDimensions("height");
    if (popupImg.width >= window.innerWidth) {
      setPopupDimensions("width");
    }
  }
  if (isVertical) {
    setPopupDimensions("height");
    if (popupImg.height >= window.innerHeight) {
      setPopupDimensions("width");
    }
  }
};
