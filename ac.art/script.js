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
if (!window.matchMedia("(prefers-reduced-motion: reduce").matches) {
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

//Redirect for kabelky
kabelkaDivs.forEach((kabelkaDiv) => {
  kabelkaDiv.onclick = () => {
    const imgInKabelka = kabelkaDiv.querySelector("img");
    window.location.href = imgInKabelka.src;
  };
});

//Changing height for divs to make gradients work properly
const changeHeightKabelka = () => {
  kabelkaDivs.forEach((kabelkaDiv, index) => {
    const img = document.querySelectorAll(".kabelka-img")[index];
    img.addEventListener("load", () => {
      kabelkaDiv.style.height = img.height + "px";
    });
  });
};

const pdfDivs = document.querySelectorAll(".pdf-div");
const changeHeightPdf = () => {
  pdfDivs.forEach((pdfDiv, index) => {
    const img = document.querySelectorAll(".pdf-img")[index];
    img.addEventListener("load", () => {
      pdfDiv.style.height = img.height + "px";
    });
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
    let delay = counter * 3000;
    if (i <= 0) {
      if (resetCounter > 50) {
        continue;
      }
      resetCounter++;
      i = imagesDivs.length - 1;
      setTimeout(() => {
        imagesDivs[0].style.opacity = 0;
        imagesDivs[0].style.display = "none";
      }, delay);
    }
    setTimeout(() => {
      imagesDivs[i - 1].style.display = "block";
      imagesDivs[i].style.opacity = "0";
    }, delay - 100);

    setTimeout(() => {
      imagesDivs[i - 1].style.opacity = "1";
    }, delay);

    setTimeout(() => {
      imagesDivs[i].style.display = "none";
    }, delay + 100);
    counter++;
  }
};

//changing the dress img
changeImages("container-1");
changeImages("container-2");
changeImages("container-3");
changeImages("container-4");

scrollAnimation();
