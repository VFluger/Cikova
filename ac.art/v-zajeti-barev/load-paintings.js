const showError = (error) => {
  const paintingSection = document.querySelector(".painting-div-container");
  paintingSection.innerHTML = `
  <div class="error-div">
  <img class="error-img" src='../../error.svg' alt="error img">
  <h3 class="error-heading">Ups, fotografie se nepodařilo načíst. Zkuste to znovu, nebo nás kontaktujte.</h3>
  <code>${error}</code>
  </div>
  `;
};

const loadPictures = (picturesArr) => {
  const paintingSection = document.querySelector(".painting-div-container");
  paintingSection.innerHTML = picturesArr
    .map(
      (picture) =>
        `
<div class="painting-container ${picture.align} scroll-hidden">
  <div class="text-container">
    <h3 class="absolute pain-head"></h3>
    <p class="absolute pain-info"></p>
  </div>
    <img
      src="../../media/ac-art/v-zajeti-barev/${picture.fileName}"
      alt="V zajeti barev - ac art"
      class="painting ${picture.align}-img"
      loading="lazy"
      
    />
</div>
`
    )
    .join("");
};

fetch("./paintings.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("JSON " + response.statusText);
      showError(response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    //delaying everything that takes the paintings as they're loaded with delay
    loadPictures(data);
    scrollAnimation();
    imgPopup();
    changeWidthImgLoad();
  })
  .catch((error) => {
    console.error("Error fetching the JSON file:", error);
    showError(error);
  });
