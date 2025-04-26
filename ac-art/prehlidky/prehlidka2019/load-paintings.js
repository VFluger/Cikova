const showError = (error) => {
  const paintingSection = document.querySelector(".painting-div-container");
  paintingSection.innerHTML = `
  <div class="error-div">
  <img class="error-img" src='/error.svg' alt="error img">
  <h3 class="error-heading">Fotografie se nepodařilo načíst. Zkuste to znovu, nebo nás kontaktujte.</h3>
  <code>${error}</code>
  </div>
  `;
};

const loadPictures = (picturesArr) => {
  document.querySelector(".desc").textContent = picturesArr[2].description;
  const paintingSection = document.querySelector(".painting-div-container");
  document.querySelector("h1").textContent = picturesArr[2].title;
  paintingSection.innerHTML = picturesArr[2].photos
    .map(
      (picture) =>
        `
<div class="painting-container ${
          picture.align ? picture.align : "vert"
        } scroll-hidden">
  <div class="text-container">
    <h3 class="absolute pain-head"></h3>
    <p class="absolute pain-info"></p>
  </div>
    <img
      src="/media/ac-art/prehlidky/${picturesArr[2].link}/${picture.filename}"
      alt="prehlidka foto - ac art"
      class="painting ${picture.align}-img"
      loading="lazy"
      
    />
</div>
`
    )
    .join("");
};

fetch("/ac-art/prehlidky.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("JSON " + response.statusText);
      showError(response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    loadPictures(data);
    scrollAnimation();
    imgPopup();
    changeWidthImgLoad();
  })
  .catch((error) => {
    console.error("Error fetching the JSON file:", error);
    showError(error);
  });
