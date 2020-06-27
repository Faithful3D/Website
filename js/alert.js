/*
	Made from cookiebanner.js by Juknum
*/

const alert = document.querySelector(".alert-container");
const alertBtn = document.querySelector(".alert-btn");

alertBtn.addEventListener("click", () => {
  alert.classList.remove("active");
});