import {
  getForecast,
  renderForecast,
  searchCity,
  setTimeBlock,
  getUrlByCity,
  renderForecastAnotherDay,
  historyWeatherPreview,
  activeBlocks,
  renderHistoryDay,
  getHistoryForecast,
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
form.addEventListener("submit", (event) => {
  event.preventDefault();
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
  activeBlock = 1;
  activeBlocks(1);
});
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

let d = document.getElementsByClassName("main");
let div = d[0];
div.addEventListener("click", (event) => {
  let block = document.getElementsByClassName("dayWeatherPreview__block");
  let target = event.target;
  if (activeBlock === 1) {
    getForecast(url).then((forecast) => {
      let mainDiv;
      let tempDiv = document.getElementsByClassName("third_line")[0];
      if (block[0].contains(target)) {
        scroll(0, 500);
        mainDiv = renderForecast(forecast);
        tempDiv.innerHTML = "";
        tempDiv.append(mainDiv);
      }
      if (block[1].contains(target)) {
        scroll(0, 500);
        mainDiv = renderForecastAnotherDay(forecast, "tomorrow");
        tempDiv.innerHTML = "";
        tempDiv.append(mainDiv);
      }
      if (block[2].contains(target)) {
        scroll(0, 500);
        mainDiv = renderForecastAnotherDay(forecast, "dayAfterTomorrow");
        tempDiv.innerHTML = "";
        tempDiv.append(mainDiv);
      }
    });
  }
  if (activeBlock === 2) {
    getHistoryForecast(cityy).then((arrayHistoryData) => {
      let mainDiv;
      let tempDiv = document.getElementsByClassName("third_line")[0];
      scroll(0, 500);
      mainDiv = renderHistoryDay(arrayHistoryData[0]);
      tempDiv.innerHTML = "";
      tempDiv.append(mainDiv);
      if (block[1].contains(target)) {
        scroll(0, 500);
        mainDiv = renderHistoryDay(arrayHistoryData[1]);
        tempDiv.innerHTML = "";
        tempDiv.append(mainDiv);
      }
      if (block[2].contains(target)) {
        scroll(0, 500);
        mainDiv = renderHistoryDay(arrayHistoryData[2]);
        tempDiv.innerHTML = "";
        tempDiv.append(mainDiv);
      }
      if (block[3].contains(target)) {
        scroll(0, 500);
        mainDiv = renderHistoryDay(arrayHistoryData[3]);
        tempDiv.innerHTML = "";
        tempDiv.append(mainDiv);
      }
      if (block[4].contains(target)) {
        scroll(0, 500);
        mainDiv = renderHistoryDay(arrayHistoryData[4]);
        tempDiv.innerHTML = "";
        tempDiv.append(mainDiv);
      }
      if (block[5].contains(target)) {
        scroll(0, 500);
        mainDiv = renderHistoryDay(arrayHistoryData[5]);
        tempDiv.innerHTML = "";
        tempDiv.append(mainDiv);
      }
      if (block[6].contains(target)) {
        scroll(0, 500);
        mainDiv = renderHistoryDay(arrayHistoryData[6]);
        tempDiv.innerHTML = "";
        tempDiv.append(mainDiv);
      }
    });
  }
});
