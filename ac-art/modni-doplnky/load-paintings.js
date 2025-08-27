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

const projectId = "djr0842l";
const dataset = "production";

const loadPictures = (picturesArr) => {
  const paintingSection = document.querySelector(".painting-div-container");
  paintingSection.innerHTML = picturesArr
    .map((item, index) => {
      if (!item.photos || !item.photos.length) return "";

      const htmlImages = item.photos
        .map(
          (slide) => `<img
            src="${slide.url}"
            alt="${item.title || ""}"
            class="painting vert-img"
            loading="lazy"
          />`
        )
        .join("");

      return `
        <div class="painting-container vert scroll-hidden animate-img" id="change-img-${index}" ${
        index === 2 ? 'style="aspect-ratio: 12/16"' : ""
      }>
          <div class="text-container">
            <h3 class="absolute pain-head">${item.title || ""}</h3>
            <p class="absolute pain-info">${item.description || ""}</p>
          </div>
          ${htmlImages}
        </div>
      `;
    })
    .join("");
};

async function getCollectionByName(name) {
  const query =
    encodeURIComponent(`*[_type == "collectionMoreImg" && title == "${name}"][0]{
    title,
    description,
    images[]{
      title,
      description,
      photos[] {
        "url": asset->url
      }
    }
  }`);

  // Pass the param via URL
  console.log(name);
  const params = encodeURIComponent(JSON.stringify({ name }));
  const url = `https://${projectId}.api.sanity.io/v2025-08-01/data/query/${dataset}?query=${query}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.result; // will be a single object instead of an array
}

const setCollectionName = (col) => {
  document.querySelector("h1").innerText = col.title;
  document.querySelector(".desc").innerText = col.description;
};

getCollectionByName("Modní doplňky")
  .then((col) => {
    console.log(col);
    setCollectionName(col);
    loadPictures(col.images);
    scrollAnimation();
    imgPopup();
    changeWidthImgLoad();
    changingImages();
  })
  .catch((err) => {
    console.error(err);
    showError(err);
  });
