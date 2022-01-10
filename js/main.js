import {
  getForecast,
  renderForecast,
  searchCity,
  setTimeBlock,
  getUrlByCity,
  renderForecastAnotherDay,
  historyWeatherPreview,
  activeBlocks,
} from "./functions.js";

const form = document.loginForm;
let city = form.city;
var cityy = "Minsk";
let url = getUrlByCity(cityy);
searchCity(url);
getForecast(url).then((forecast) => {
  let mainDiv = renderForecast(forecast);
  let tempDiv = document.getElementsByClassName("third_line")[0];
  tempDiv.innerHTML = "";
  tempDiv.append(mainDiv);
});
setTimeBlock();

let activeBlock = 1;
let block1 = document.getElementById("first_line_1");
let block2 = document.getElementById("first_line_2");
block2.addEventListener("click", (event) => {
  if (activeBlock === 1) {
    activeBlocks(2);
    let mainBlock = historyWeatherPreview(cityy);
    let tempBlock = document.getElementsByClassName("second_line")[0];
    tempBlock.innerHTML = "";
    document.getElementsByClassName("second_line")[0].append(mainBlock);
  }
  activeBlock = 2;
});
block1.addEventListener("click", (event) => {
  if (activeBlock === 2) {
    activeBlocks(1);
    searchCity(getUrlByCity(cityy));
  }
  activeBlock = 1;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  activeBlocks(1);
  cityy = city.value;
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
