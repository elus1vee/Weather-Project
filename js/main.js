import {
  getForecast,
  renderForecast,
  searchCity,
  setTimeBlock,
  getUrlByCity,
  renderForecastAnotherDay,
} from "./functions.js";

let url = getUrlByCity("Minsk");
searchCity(url);
getForecast(url).then((forecast) => {
  let mainDiv = renderForecast(forecast);
  let tempDiv = document.getElementsByClassName("third_line")[0];
  tempDiv.innerHTML = "";
  tempDiv.append(mainDiv);
});
setTimeBlock();

const form = document.loginForm;
let city = form.city;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let cityy = city.value;
  url = getUrlByCity(cityy);
  searchCity(url);
  getForecast(url).then((forecast) => {
    let mainDiv = renderForecast(forecast);
    let tempDiv = document.getElementsByClassName("third_line")[0];
    tempDiv.innerHTML = "";
    tempDiv.append(mainDiv);
  });
  city.value = "";
});

let d = document.getElementsByClassName("main");
let div = d[0];
div.addEventListener("click", (event) => {
  let block = document.getElementsByClassName("dayWeatherPreview__block");
  let target = event.target;
  getForecast(url).then((forecast) => {
    let mainDiv;
    let tempDiv = document.getElementsByClassName("third_line")[0];
    if (block[0].contains(target)) {
      mainDiv = renderForecast(forecast);
      tempDiv.innerHTML = "";
      tempDiv.append(mainDiv);
    }
    if (block[1].contains(target)) {
      mainDiv = renderForecastAnotherDay(forecast, "tomorrow");
      tempDiv.innerHTML = "";
      tempDiv.append(mainDiv);
    }
    if (block[2].contains(target)) {
      mainDiv = renderForecastAnotherDay(forecast, "dayAfterTomorrow");
      tempDiv.innerHTML = "";
      tempDiv.append(mainDiv);
    }
  });
});