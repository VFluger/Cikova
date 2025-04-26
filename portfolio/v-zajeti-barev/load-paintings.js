const showError = (error) => {
  const paintingSection = document.querySelector(".painting-div-container");
  paintingSection.innerHTML = `
  <div class="error-div">
  <img class="error-img" src='../../error.svg' alt="error img">
  <h3 class="error-heading">Fotografie se nepodařilo načíst. Zkuste to znovu, nebo nás kontaktujte.</h3>
  <code>${error}</code>
  </div>
  `;
};

const loadPictures = (picturesArr) => {
  const paintingSection = document.querySelector(".painting-div-container");
  paintingSection.innerHTML = picturesArr
    .sort(
      (a, b) =>
        parseInt(b.heading.slice(b.heading.length - 4, b.heading.length)) -
        parseInt(a.heading.slice(a.heading.length - 4, a.heading.length))
    )
    .map(
      (picture) =>
        `
<div class="painting-container ${picture.align} scroll-hidden">
  <div class="text-container">
    <h3 class="absolute pain-head">${picture.heading}</h3>
    <p class="absolute pain-info">${picture.description}</p>
  </div>
    <img
      src="../../media/obrazy/v-zajeti-barev/${picture.filename}"
      alt="V zajeti barev - obraz"
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
    loadPictures(data);
    scrollAnimation();
    imgPopup();
    changeWidthImgLoad();
  })
  .catch((error) => {
    console.error("Error fetching the JSON file:", error);
    showError(error);
  });
