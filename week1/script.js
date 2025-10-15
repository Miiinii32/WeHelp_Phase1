const menuIcon = document.querySelector("#menu-icon");
const closeIcon = document.querySelector("#close-icon");
const menuOffcanva = document.querySelector(".menu-offcanva");
const overlay = document.querySelector(".overlay");

menuIcon.addEventListener("click", function () {
  menuOffcanva.classList.add("show");
  overlay.classList.add("show");
});

closeIcon.addEventListener("click", function () {
  menuOffcanva.classList.remove("show");
  overlay.classList.remove("show");
});

overlay.addEventListener("click", function () {
  menuOffcanva.classList.remove("show");
  overlay.classList.remove("show");
});
