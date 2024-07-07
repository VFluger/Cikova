const changeWidth = () => {
  const containers = document.querySelectorAll(".text-container");
  containers.forEach((container, index) => {
    const img = document.querySelectorAll(".painting")[index];
    if (img.complete) {
      container.style.width = img.width + "px";
    }
  });
  setTimeout(() => {
    containers.forEach((container, index) => {
      const img = document.querySelectorAll(".painting")[index];
      if (img.complete) {
        container.style.width = img.width + "px";
      }
    });
  }, 1000);
};

const changeWidthDelayed = () => {
  setTimeout(() => {
    const containers = document.querySelectorAll(".text-container");
    containers.forEach((container, index) => {
      const img = document.querySelectorAll(".painting")[index];
      container.style.width = img.width + "px";
    });
  }, 100);
};

window.addEventListener("load", changeWidthDelayed);
window.addEventListener("resize", changeWidth);

const changeWidthImgLoad = () => {
  const imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    img.addEventListener("load", () => {
      changeWidth();
    });
  });
};
