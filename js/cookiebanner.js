/*
	Thanks to GTCoding
	Youtube video : https://youtu.be/R_-oGJBg3nw
	GitHub        : https://github.com/Godsont/Cookie-Consent-Banner
*/

const cookieContainer = document.querySelector(".cookie-container");
const cookieButton = document.querySelector(".cookie-btn");

cookieButton.addEventListener("click", () => {
  cookieContainer.classList.remove("active");
  localStorage.setItem("Faithful3D_cookieBannerDisplayed", "true");
});

setTimeout(() => {
  if (!localStorage.getItem("Faithful3D_cookieBannerDisplayed")) {
    cookieContainer.classList.add("active");
  }
}, 2000);