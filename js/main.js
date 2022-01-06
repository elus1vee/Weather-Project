import {
  getForecast, renderForecast, searchCity, 
  setTimeBlock, getUrlByCity
} from "./functions.js"

const cityUrl = getUrlByCity("Minsk");

searchCity(cityUrl);
setTimeBlock();

const form = document.loginForm;
let city = form.city;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let cityy = city.value;
  console.log(cityy);
  console.log(cityUrl);
  searchCity(cityUrl);
  city.value = "";
});

getForecast(cityUrl).then((forecast) => renderForecast(forecast));