/*
	Made from cookiebanner.js by Juknum
*/

const alertContainer = document.querySelector(".alert-container");
const alertBtn = document.querySelector(".alert-btn");

alertBtn.addEventListener("click", () => {
  alertContainer.classList.remove("active");
});