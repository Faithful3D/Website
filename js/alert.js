/*
	Made from cookiebanner.js by Juknum
*/

const alertContainer = document.getElementById(".alert-container");
const alertBtn = document.getElementById(".alert-btn");

alertBtn.addEventListener("click", () => {
  alertContainer.classList.remove("active");
});