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
              object.filename ===
              decodeURIComponent(getFileNameFromPath(img.src))
            ) {
              const nextIndex = data.indexOf(object) + 1;
              const previousIndex = data.indexOf(object) - 1;
              switch (direction) {
                case "next":
                  if (nextIndex < data.length) {
                    resolve(data[nextIndex].filename);
                  } else {
                    resolve();
                  }
                  break;
                case "previous":
                  if (previousIndex >= 0) {
                    resolve(data[previousIndex].filename);
                  } else {
                    resolve();
                  }
                  break;
                case "check":
                  const index = data.indexOf(object);
                  if (index === 0) {
                    resolve("first");
                  }
                  if (index === data.length - 1) {
                    resolve("last");
                  }
                  resolve(null);
                  break;
                case "checkNext":
                  if (nextIndex === 0) {
                    resolve("first");
                  }
                  if (nextIndex === data.length - 1) {
                    resolve("last");
                  }
                  resolve(null);
                  break;
                case "checkPrevious":
                  if (previousIndex === 0) {
                    resolve("first");
                  }
                  if (previousIndex === data.length - 1) {
                    resolve("last");
                  }
                  resolve(null);
                  break;
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
  imgDivs.forEach((div) => {
    div.addEventListener("click", () => {
      const img = div.querySelector("img");
      const popupImg = popup.querySelector("img");
      popupImg.src = img.src;
      getFileNameOfNextOrPreviousObject(img, "check")
        .then((answer) => {
          if (answer === "first") {
            prevImgBtn.style.display = "none";
          }
          if (answer === "last") {
            nextImgBtn.style.display = "none";
          }
          if (!answer) {
            prevImgBtn.style.display = "block";
            nextImgBtn.style.display = "block";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      //set the right dimensions
      setPopupDimensionsAcordingToDevice(popupImg);
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
      setPopupDimensionsAcordingToDevice(currentImg);
      currentImg.style.opacity = 1;
    }, 300);
  };

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
    getFileNameOfNextOrPreviousObject(currentImg, "checkNext").then(
      (answer) => {
        if (answer === "last") {
          nextImgBtn.style.display = "none";
        }
        if (!answer) {
          nextImgBtn.style.display = "block";
          prevImgBtn.style.display = "block";
        }
      }
    );
  });
  prevImgBtn.addEventListener("click", () => {
    getFileNameOfNextOrPreviousObject(currentImg, "previous")
      .then((object) => {
        changeImg(object, currentImg);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    getFileNameOfNextOrPreviousObject(currentImg, "checkPrevious").then(
      (answer) => {
        if (answer === "first") {
          prevImgBtn.style.display = "none";
        }
        if (!answer) {
          prevImgBtn.style.display = "block";
          nextImgBtn.style.display = "block";
        }
      }
    );
  });

  popupBackground.addEventListener("click", closePopup);
};
