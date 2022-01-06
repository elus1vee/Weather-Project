import {
  getForecast,
  renderForecast,
  searchCity,
  setTimeBlock,
  getUrlByCity,
} from "./functions.js";

searchCity(getUrlByCity("Minsk"));
getForecast(getUrlByCity("Minsk")).then((forecast) => {
  let mainDiv = renderForecast(forecast);
  let tempDiv = document.getElementsByClassName("third_line")[0];
  tempDiv.innerHTML = "";
  tempDiv.append(mainDiv);
  console.log(mainDiv);
});
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
  getForecast(url).then((forecast) => {
    let mainDiv = renderForecast(forecast);
    let tempDiv = document.getElementsByClassName("third_line")[0];
    tempDiv.innerHTML = "";
    tempDiv.append(mainDiv);
    console.log(mainDiv);
  });
  city.value = "";
});
