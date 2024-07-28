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
///MAKE FOLDERS CLICKABLE///
const f1 = document.querySelector("#f1");
const f2 = document.querySelector("#f2");
const f3 = document.querySelector("#f3");

f1.onclick = () => (window.location.href = "./v-zajeti-barev/");
f2.onclick = () => (window.location.href = "./bytovy-design/");
f3.onclick = () => (window.location.href = "./modni-doplnky/");

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

changeHeightKabelka();
window.addEventListener("resize", changeHeightKabelka);

changeHeightPdf();
window.addEventListener("resize", changeHeightPdf);

const container = document.querySelector(".modely-container");

const changeImages = (idOfParent) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  const imagesDivs = document.querySelectorAll(
    `#${idOfParent} .modely-img-container`
  );
  let counter = 1;
  let resetCounter = 0;
  for (let i = imagesDivs.length - 1; i >= 0; i--) {
    let delay = counter * 4000;
    if (i <= 0) {
      if (resetCounter > 50) {
        continue;
      }
      resetCounter++;
      i = imagesDivs.length - 1;
      setTimeout(() => {
        imagesDivs[0].style.opacity = "0";
      }, delay);
    }
    setTimeout(() => {
      imagesDivs[i].style.opacity = "0";
    }, delay - 100);

    setTimeout(() => {
      imagesDivs[i - 1].style.opacity = "1";
    }, delay);

    setTimeout(() => {
      imagesDivs[i].style.opacity = "0";
    }, delay + 100);
    counter++;
  }
};

const modely = document.querySelectorAll(".modely-container");
modely.forEach((model) => {
  model.addEventListener("click", () => {
    const images = document.querySelectorAll(
      `#${model.id} .modely-img-container`
    );
    images.forEach((image) => {
      if (image.style.opacity === "1") {
        quickOpenPopup(image.querySelector("img").src, "dress");
      }
    });
  });
});

//changing the dress img
changeImages("container-1");
changeImages("container-2");
changeImages("container-3");
changeImages("container-4");

scrollAnimation();

const imgPopup = (srcClass, idOfSectionToBlur) => {
  const srcImgDivs = document.querySelectorAll(`.${srcClass}`); //open popup on click of these elements
  const popup = document.querySelector(".painting-popup");
  const closeBtn = document.querySelector(".close-popup");
  const popupBackground = document.querySelector(".popup-bck");

  const blurSection = document.querySelector(`#${idOfSectionToBlur}`);

  const closePopup = () => {
    popup.classList.remove("show");
    blurSection.style.filter = "blur(0px)";
    popupBackground.classList.remove("show");
    body.style.overflow = "scroll";
  };

  const openPopup = () => {
    popup.classList.add("show");
    popupBackground.classList.add("show");
    blurSection.style.filter = "blur(10px)";
    body.style.overflow = "hidden";
  };

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
    console.error("Invalid setBy parameter. Expected 'width' or 'height'.");
  };

  const setPopupDimensionsAcordingToDevice = (popupImg) => {
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

  const nextImgBtn = document.querySelector(".arrow-right");
  const prevImgBtn = document.querySelector(".arrow-left");

  //when image is clicked, open popup and change image
  //check if first or last, disable btns
  srcImgDivs.forEach((div) => {
    div.addEventListener("click", () => {
      const img = div.querySelector("img");
      const popupImg = popup.querySelector("img");
      popupImg.src = img.src;
      //set the right dimensions
      setPopupDimensionsAcordingToDevice(popupImg);
      openPopup();
    });
  });
  closeBtn.addEventListener("click", closePopup);

  popupBackground.addEventListener("click", closePopup);
};

const quickOpenPopup = (srcOfImg, sectionToBlur) => {
  const popup = document.querySelector(".painting-popup");
  const closeBtn = document.querySelector(".close-popup");
  const popupBackground = document.querySelector(".popup-bck");
  const blurSection = document.querySelector(`#${sectionToBlur}`);

  const openPopup = () => {
    popup.classList.add("show");
    popupBackground.classList.add("show");
    blurSection.style.filter = "blur(10px)";
    body.style.overflow = "hidden";
  };

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
    console.error("Invalid setBy parameter. Expected 'width' or 'height'.");
  };

  const setPopupDimensionsAcordingToDevice = (popupImg) => {
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
  const popupImg = popup.querySelector("img");
  popupImg.src = srcOfImg;
  setPopupDimensionsAcordingToDevice(popupImg);
  openPopup();
  const closePopup = () => {
    popup.classList.remove("show");
    blurSection.style.filter = "blur(0px)";
    popupBackground.classList.remove("show");
    body.style.overflow = "scroll";
  };
  closeBtn.addEventListener("click", closePopup);
  popupBackground.addEventListener("click", closePopup);
};

imgPopup("kabelka-div", "wallets");
