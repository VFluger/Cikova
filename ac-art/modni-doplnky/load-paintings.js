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
    .map((picture, index) => {
      if (Array.isArray(picture)) {
        const htmlImages = picture.map((image, imgIndex) => {
          if (imgIndex === picture.length - 1) {
            return `
        <img
        src="/media/ac-art/modni-doplnky/${image.filename}"
        alt="Modni doplnky - ac art"
        class="painting ${image.align}-img"
        loading="lazy"
        />
        <img
        src="/media/ac-art/modni-doplnky/${image.filename}"
        alt="Modni doplnky - ac art"
        class="painting ${image.align}-img"
        loading="lazy"
        />
        `;
          }
          return `
        <img
        src="/media/ac-art/modni-doplnky/${image.filename}"
        alt="Modni doplnky - ac art"
        class="painting ${image.align}-img"
        loading="lazy"
        />
        `;
        });
        return `
          <div class="painting-container ${
            picture[0].align
          } scroll-hidden animate-img" id="change-img-${index}" ${
          index === 2 ? 'style="aspect-ratio: 12/16"' : ""
        }>
  <div class="text-container">
    <h3 class="absolute pain-head">${picture[0].heading}</h3>
    <p class="absolute pain-info">${picture[0].description}</p>
  </div>
    ${htmlImages}
</div>
          `;
      }
      return `
<div class="painting-container ${picture.align} scroll-hidden">
  <div class="text-container">
    <h3 class="absolute pain-head"></h3>
    <p class="absolute pain-info"></p>
  </div>
    <img
      src="/media/ac-art/modni-doplnky/${picture.filename}"
      alt="Modni doplnky - ac art"
      class="painting ${picture.align}-img"
      loading="lazy"
      
    />
</div>
`;
    })
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
    //calling funcs after loading the imgs
    loadPictures(data);
    scrollAnimation();
    imgPopup();
    changeWidthImgLoad();
    changingImages();
  })
  .catch((error) => {
    console.error("Error fetching the JSON file:", error);
    showError(error);
  });
