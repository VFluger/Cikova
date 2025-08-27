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

async function getCollectionByName(name) {
  const query =
    encodeURIComponent(`*[_type == "collection" && title == "${name}"][0]{
    title,
    description,
    images[]{
      title,
      description,
      "url": image.asset->url
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

const importImgs = (col) => {
  const imgArr = col.images;
  const imgHTML = imgArr
    .map(
      (imgObj, i) =>
        `
      <div class="painting-container vert scroll-hidden">
          <div class="text-container">
            <h3 class="absolute pain-head">${
              imgObj.heading ? imgObj.heading : ""
            }
            </h3>
            <p class="absolute pain-info">${
              imgObj.description ? imgObj.description : ""
            }</p>
          </div>
            <img
              src="${imgObj.url}"
              alt="${col.title} - img${i} - ac art"
              class="painting vert-img"
              loading="lazy"
            />
        </div>`
    )
    .join("");

  document.querySelector(".painting-div-container").innerHTML = imgHTML;
};

const setCollectionName = (col) => {
  document.querySelector("h1").innerText = col.title;
  document.querySelector(".desc").innerText = col.description;
};

getCollectionByName("Filmové klapky")
  .then((col) => {
    setCollectionName(col);
    importImgs(col);

    scrollAnimation();
    imgPopup();
    changeWidthImgLoad();
  })
  .catch((err) => {
    console.error(err);
    showError(err);
  });
