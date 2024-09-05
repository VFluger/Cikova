scrollAnimation();

const changeImages = (idOfParent) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  const imagesDivs = document.querySelectorAll(
    `#${idOfParent} .img-container img`
  );
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
      }, delay - 100);
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

const portfolioTelevision = document.querySelector("#television");

const observerThreshold =
  window.innerHeight <= portfolioTelevision.offsetHeight / 2 ? 0.2 : 0.5;

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animation-start");
      }
    });
  },
  { root: null, rootMargin: "0px", threshold: observerThreshold }
);

animationObserver.observe(portfolioTelevision);

portfolioTelevision.addEventListener("click", () => {
  window.location.href = "./portfolio";
});

changeImages("television");

const acImgContent = document.querySelectorAll("#ac-art .img-container");
acImgContent.forEach((container) => {
  container.addEventListener("click", () => {
    const id = container.id;
    switch (id) {
      case "model":
        window.location.href = "./ac-art#dress";
        break;
      case "byt":
        window.location.href = "./ac-art/bytovy-design";
        break;
      case "moda":
        window.location.href = "./ac-art/modni-doplnky";
        break;
      case "barvy":
        window.location.href = "./ac-art/modely";
        break;
    }
  });
});

const publikaceImgContent = document.querySelectorAll(
  "#publikace .img-container"
);
publikaceImgContent.forEach((container) => {
  container.addEventListener("click", () => {
    const id = container.id;
    switch (id) {
      case "fashion":
        window.location.href = "./media/publikace/ac-art-fashion-katalog.pdf";
        break;
      case "cesta":
        window.location.href = "./publikace";
        break;
      case "invence":
        window.location.href = "./media/publikace/invence-katalog.pdf";
        break;
    }
  });
});
