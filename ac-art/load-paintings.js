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

const loadPictures = (prehlidkaArr) => {
  const paintingSection = document.querySelector(".painting-div-container");
  prehlidkaHTML = prehlidkaArr
    .map((prehlidka, index) => {
      let desc = prehlidka.description;
      if (prehlidka.description.length > 30) {
        desc = prehlidka.description.slice(0, 30) + "...";
      }
      const imgHref =
        `/media/ac-art/prehlidky/${prehlidka.link}/` +
        prehlidka.photos[prehlidka.indexOfPreview].filename;
      return `
    <tr class="clickable-row" data-href="/ac-art/prehlidky/${prehlidka.link}">
    
      <th class='prehlidka-title'>${prehlidka.title}</th>
      <td class='prehlidka-year'>${prehlidka.year}</td>
      <td class='prehlidka-description'>${desc}</td>
    </tr>
    `;
    })
    .join("");
  //<td class='prehlidka-preview'><img class="prehlidka-img" src="${imgHref}" alt="${prehlidka.title} - nahled"></td>
  $(document).ready(() => {
    $(".clickable-row").click(function () {
      window.location.href = $(this).data("href");
    });
  });
  paintingSection.innerHTML = `
    <table>
    <tbody>
    ${prehlidkaHTML}
    </tbody>
    </table>
    `;
};

fetch("./prehlidky.json")
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
    changeWidthImgLoad();
  })
  .catch((error) => {
    console.error("Error fetching the JSON file:", error);
    showError(error);
  });

/*`
  <div class="painting-container ${picture.align} scroll-hidden">
  <div class="text-container">
    <h3 class="absolute pain-head"></h3>
    <p class="absolute pain-info"></p>
  </div>
    <img
      src="../../media/ac-art/prehlidka/${picture.filename}"
      alt="${picture.alt}"
      class="painting ${picture.align}-img"
      loading="lazy"
      
    />
</div>
`*/
