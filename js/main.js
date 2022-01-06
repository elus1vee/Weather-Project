searchCity(getUrlByCity("Minsk"));
setTimeBlock();

const form = document.loginForm;
let city = form.city;
let url;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let cityy = city.value;
  console.log(cityy);
  url = getUrlByCity(cityy);
  console.log(url);
  searchCity(url);
  city.value = "";
});
