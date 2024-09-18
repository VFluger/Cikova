scrollAnimation();

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

const container = document.querySelector(".folder-container");

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

//changing the dress img
changeImages("f1");
changeImages("f2");
changeImages("f3");
changeImages("f4");
