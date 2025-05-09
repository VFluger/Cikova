///INFINITE HORIZONTAL SCROLL ///
const scrollers = document.querySelectorAll(".scroller");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  HorizontalScroll();
}
//just duplicating content in scroller, the animation is css
function HorizontalScroll() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);
    const scrollerInner = scroller.querySelector(".scroller-inner");
    const scrollerItems = Array.from(scrollerInner.children);
    scrollerItems.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

const kabelkaDivs = document.querySelectorAll(".kabelka-div");
const kabelkaContainer = document.querySelectorAll("#wallets-img-container");

//Changing height for divs to make gradients work properly
const changeHeightKabelka = () => {
  kabelkaDivs.forEach((kabelkaDiv, index) => {
    const img = document.querySelectorAll(".kabelka-img")[index];
    img.addEventListener("load", () => {
      kabelkaDiv.style.height = img.height + "px";
    });
    kabelkaDiv.style.height = img.height + "px";
  });
};

changeHeightKabelka();

/////////////////////////////////////////////////////////////
//side functions for popup funcs

const popup = document.querySelector(".painting-popup");
const blurSections = document.querySelectorAll(`.blur-section`);
const popupBackground = document.querySelector(".popup-bck");

const closePopup = () => {
  document.querySelector(".arrow-right").style.visibility = "visible";
  document.querySelector(".arrow-left").style.visibility = "visible";
  popup.classList.remove("show");
  blurSections.forEach((section) => {
    section.style.filter = "blur(0px)";
  });
  popupBackground.classList.remove("show");
  body.style.overflow = "scroll";
};

const openPopup = (shouldShowArrows = true) => {
  if (!shouldShowArrows) {
    document.querySelector(".arrow-right").style.visibility = "hidden";
    document.querySelector(".arrow-left").style.visibility = "hidden";
  }
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
/////////////////////////////////////////////////////////////

const imgPopupTwo = (srcClass, idOfSectionToBlur) => {
  const srcImgDivs = document.querySelectorAll(`.${srcClass}`); //open popup on click of these elements
  const closeBtn = document.querySelector(".close-popup");

  //when image is clicked, open popup and change image
  //check if first or last, disable btns
  srcImgDivs.forEach((div) => {
    div.addEventListener("click", () => {
      const img = div.querySelector("img");
      const popupImg = popup.querySelector("img");
      popupImg.src = img.src;
      //set the correct dimensions
      setPopupDimensionsAcordingToDevice(popupImg);
      openPopup(false);
    });
  });
  closeBtn.addEventListener("click", closePopup);

  popupBackground.addEventListener("click", closePopup);
};

const quickOpenPopup = (srcOfImg, sectionToBlur) => {
  const popup = document.querySelector(".painting-popup");
  const closeBtn = document.querySelector(".close-popup");
  const popupBackground = document.querySelector(".popup-bck");

  const popupImg = popup.querySelector("img");
  popupImg.src = srcOfImg;
  setPopupDimensionsAcordingToDevice(popupImg);
  openPopup();

  closeBtn.addEventListener("click", closePopup);
  popupBackground.addEventListener("click", closePopup);
};

imgPopupTwo("kabelka-div", "wallets");

const changeImages = (idOfParent) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  const imagesDivs = document.querySelectorAll(`#${idOfParent} img`);
  let counter = 1;
  let resetCounter = 0;
  for (let i = imagesDivs.length - 1; i >= 0; i--) {
    let delay = counter * 3000;
    if (i <= 0) {
      if (resetCounter > 50) {
        continue;
      }
      resetCounter++;
      i = imagesDivs.length - 1;
      setTimeout(() => {
        imagesDivs[0].style.opacity = 0;
      }, delay + 150);
    }
    setTimeout(() => {
      imagesDivs[i].style.opacity = "0";
    }, delay - 100);
    setTimeout(() => {
      imagesDivs[i - 1].style.opacity = "1";
    }, delay);
    counter++;
  }
};
const changingImages = () => {
  document.querySelectorAll(".animate-img").forEach((img) => {
    changeImages(img.id);
  });
};

changingImages();

changeImages("f1");
changeImages("f2");
changeImages("f3");
