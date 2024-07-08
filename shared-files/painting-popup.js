const imgPopup = () => {
  const imgDivs = document.querySelectorAll(".painting-container");
  const popup = document.querySelector(".painting-popup");
  const closeBtn = document.querySelector(".close-popup");
  const popupBackground = document.querySelector(".popup-bck");

  const paintingSection = document.querySelector(".painting-div-container");

  const getFileNameFromPath = (path) => {
    let parts = path.split("/");
    return parts[parts.length - 1];
  };

  async function getFileNameOfNextOrPreviousObject(img, direction) {
    return new Promise((resolve, reject) => {
      fetch("./paintings.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("JSON " + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          data.forEach((object) => {
            if (
              object.fileName ===
              decodeURIComponent(getFileNameFromPath(img.src))
            ) {
              if (direction === "next") {
                const nextIndex = data.indexOf(object) + 1;
                if (nextIndex < data.length) {
                  resolve(data[nextIndex].fileName);
                } else {
                  resolve();
                }
              }
              if (direction === "previous") {
                const previousIndex = data.indexOf(object) - 1;
                if (previousIndex >= 0) {
                  resolve(data[previousIndex].fileName);
                } else {
                  resolve();
                }
              }
            }
          });
          reject(new Error("Image not found in JSON."));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

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

  imgDivs.forEach((div) => {
    div.addEventListener("click", () => {
      const img = div.querySelector("img");
      const popupImg = popup.querySelector("img");
      popupImg.src = img.src;
      if (img.classList.contains("hori-img")) {
        setPopupDimensions("height");
        if (popupImg.width >= window.innerWidth) {
          setPopupDimensions("width");
        }
      }
      if (img.classList.contains("vert-img")) {
        setPopupDimensions("height");
        if (popupImg.height >= window.innerHeight) {
          setPopupDimensions("width");
        }
      }
      openPopup();
    });
  });
  closeBtn.addEventListener("click", closePopup);

  const changeImg = (object, currentImg) => {
    if (!object) return;
    const path = currentImg.src.replace(
      getFileNameFromPath(currentImg.src),
      encodeURIComponent(object)
    );
    currentImg.style.opacity = 0;
    setTimeout(() => {
      currentImg.src = path;
      currentImg.style.opacity = 1;
    }, 300);
  };

  const nextImgBtn = document.querySelector(".arrow-right");
  const prevImgBtn = document.querySelector(".arrow-left");
  const currentImg = popup.querySelector("img");

  nextImgBtn.addEventListener("click", () => {
    getFileNameOfNextOrPreviousObject(currentImg, "next")
      .then((object) => {
        changeImg(object, currentImg);
      })
      .catch((error) => {
        console.error("Error:", error);
        return;
      });
  });
  prevImgBtn.addEventListener("click", () => {
    getFileNameOfNextOrPreviousObject(currentImg, "previous")
      .then((object) => {
        changeImg(object, currentImg);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
};
