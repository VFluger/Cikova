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
    .map(
      (picture) =>
        `
<div class="painting-container hori scroll-hidden">
  <div class="text-container">
    <h3 class="absolute pain-head">${picture.heading}</h3>
    <p class="absolute pain-info">${picture.description}</p>
  </div>
    <img
      src="../../media/obrazy/filmove-klapky/${picture.filename}"
      alt="${picture.heading} - obraz"
      class="painting"
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
      console.error("JSON " + response.statusText);
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
