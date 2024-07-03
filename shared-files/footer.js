const footerPathFacebook = document.querySelector("#soc-link-path-facebook");
const footerPathYoutube = document.querySelector("#soc-link-path-youtube");
const footerPathInstagram = document.querySelector("#soc-link-path-instagram");
const footerLinkFacebook = document.querySelector("#facebook");
const footerLinkYoutube = document.querySelector("#youtube");
const footerLinkInstagram = document.querySelector("#instagram");

footerLinkFacebook.addEventListener("mouseover", () => {
  footerPathFacebook.style.fill = "#1066ff";
});
footerLinkFacebook.addEventListener("mouseout", () => {
  footerPathFacebook.style.fill = "#ffffff";
});

footerLinkYoutube.addEventListener("mouseover", () => {
  footerPathYoutube.style.fill = "#ff0000";
});
footerLinkYoutube.addEventListener("mouseout", () => {
  footerPathYoutube.style.fill = "#ffffff";
});

footerLinkInstagram.addEventListener("mouseover", () => {
  footerPathInstagram.style.fill = "#fd087a";
});
footerLinkInstagram.addEventListener("mouseout", () => {
  footerPathInstagram.style.fill = "#ffffff";
});
