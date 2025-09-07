const showError = (error) => {
  const paintingSection = document.querySelector("#prehlidka-container");
  paintingSection.innerHTML = `
    <div class="error-div">
    <img class="error-img" src='../../error.svg' alt="error img">
    <h3 class="error-heading">Fotografie se nepodařilo načíst. Zkuste to znovu, nebo nás kontaktujte.</h3>
    <code>${error}</code>
    </div>
    `;
};

const loadPictures = (prehlidkaArr) => {
  const paintingSection = document.querySelector("#prehlidka-container");
  prehlidkaHTML = prehlidkaArr
    .map((prehlidka, index) => {
      let desc = prehlidka.description;
      if (prehlidka.description.length > 30) {
        desc = prehlidka.description.slice(0, 30) + "...";
      }

      console.log(prehlidka);

      console.log(
        "PREVIEW:::",
        prehlidka.photos[prehlidka.indexOfPreview || 0]
      );

      const imgHref = prehlidka.photos[prehlidka.indexOfPreview || 0].url;
      return `
    <div class="prehlidka" data-href="/prehlidky/${prehlidka.link.current}">
    <h2 class="prehlidka-heading">${prehlidka.title}</h2>
    <p class="prehlidka-year">${prehlidka.year}</p>
    <img src="${imgHref}" alt="prehlidka thumbnail" class="prehlidka-thm">
  </div>
    `;
    })
    .join("");
  //prehlidka click fn, redirect to dedicated page
  $(document).ready(() => {
    $(".prehlidka").click(function () {
      window.location.href = $(this).data("href");
    });
  });
  paintingSection.innerHTML = `
    <div class="prehlidky-container">
    ${prehlidkaHTML}
    </div>
    `;
};

fetch("/api/getPrehlidky")
  .then((response) => {
    if (!response.ok) {
      showError(response.statusText);
      throw new Error("JSON " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    loadPictures(data);
    scrollAnimation();
    changeWidthImgLoad();
  })
  .catch((error) => {
    console.error("Error fetching the JSON file:", error);
    showError(error);
  });
