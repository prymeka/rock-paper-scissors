// responsive navbar header

const navBrand = document.getElementById("nav-brand-link");
const defaultNavBrand = navBrand.textContent;

window.addEventListener("resize", e => {
  if (window.innerWidth < 700) {
    navBrand.textContent = "RPS";
  } else {
    navBrand.textContent = defaultNavBrand;
  }
});

