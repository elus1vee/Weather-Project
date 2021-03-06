import { EnhancedDate } from "./EnhancedDate.js";
import { Forecast } from "./Forecast.js";
import { History } from "./History.js";

function getUrlByCity(city, date = "") {
  let url = "https://api.weatherapi.com/v1/forecast.json?key=b42ec53b7614492ea26173900212112&q=";
  if (date) {
    url = "https://api.weatherapi.com/v1/history.json?key=b42ec53b7614492ea26173900212112&q=";
    url = url + city + "&dt=" + date;
  } else {
    url = url + city + "&days=7&aqi=yes&alerts=yes";
  }
  return url;
}

function dayblockPreview(obj) {
  let div = document.createElement("div");
  div.className = "dayWeatherPreview__block";
  let datee = document.createElement("div");
  datee.className = "dayWeatherPrevie__date";
  datee.innerText = obj.date;
  let img = document.createElement("img");
  let icon = obj.day.condition.icon;
  img.src = icon;
  let temp = document.createElement("div");
  temp.className = "dayWeatherPrevie__temp";
  temp.innerText = `${obj.day.avgtemp_c}°`;
  let about = document.createElement("div");
  about.className = "dayWeatherPrevie__about";
  about.innerText = obj.day.condition.text;
  div.append(datee);
  div.append(img);
  div.append(temp);
  div.append(about);
  return div;
}

function dayWeatherPreview(data) {
  let mainDiv = document.createElement("div");
  mainDiv.className = "dayWeatherPreview__main";
  for (let i = 0; i < 3; i++) {
    let obj = data.forecast.forecastday[i];
    let div = dayblockPreview(obj);
    mainDiv.append(div);
  }
  return mainDiv;
}

function getFetchRequests(cityyy) {
  let now = new Date();
  const dayMilliseconds = 24 * 60 * 60 * 1000;
  let timeArr = [];
  let urlArr = [];
  for (let i = 0; i < 7; i++) {
    now.setTime(now.getTime() - dayMilliseconds);
    timeArr[i] = now.toJSON().split("T")[0];
    urlArr[i] = getUrlByCity(cityyy, timeArr[i]);
  }
  let fetchArr = [];
  for (let i = 0; i < urlArr.length; i++) {
    fetchArr[i] = fetch(urlArr[i]).then((response) => response.json());
  }
  return fetchArr;
}

function historyWeatherPreview(cityyy) {
  let mainDiv = document.createElement("div");
  mainDiv.className = "dayWeatherPreview__main";

  Promise.all(getFetchRequests(cityyy)).then((data) => {
    for (let i = 0; i < data.length; i++) {
      let obj = data[i].forecast.forecastday[0];
      let div = dayblockPreview(obj);
      mainDiv.append(div);
    }
  });
  return mainDiv;
}

function getHistoryForecast(city) {
  return Promise.all(getFetchRequests(city)).then((data) => {
    const historyData = data.map((item) => new History(item));
    return historyData;
  });
}

function setTimeBlock() {
  const date = new EnhancedDate();
  document.getElementsByClassName("time_block")[0].innerHTML = date.timeNow();
  setInterval(() => {
    date.setSeconds(date.getSeconds() + 1);
    document.getElementsByClassName("time_block")[0].innerHTML = date.timeNow();
  }, 1000);
}

function activeBlocks(key) {
  let block1 = document.getElementById("first_line_1");
  let block2 = document.getElementById("first_line_2");
  if (key === 1) {
    block2.className = "first_line_p";
    block1.className = "first_line_p first_line__active";
  }
  if (key === 2) {
    block1.className = "first_line_p";
    block2.className = "first_line_p first_line__active";
  }
}

function searchCity(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let aboutBlock = document.getElementsByClassName("zero_line")[0];
      aboutBlock.innerText = `${data.location.name}`;
      let timeBlock = document.getElementsByClassName("zero_line_2")[0];
      timeBlock.innerText = `Сейчас ${data.location.localtime.split(" ")[1]}`;
      let block = dayWeatherPreview(data);
      let tempBlock = document.getElementsByClassName("second_line")[0];
      tempBlock.innerHTML = "";
      tempBlock.append(block);
    });
}

function renderTable(allHourData) {
  let hourBlocks = "";
  for (let i = 0; i < allHourData.length; i = i + 2) {
    hourBlocks += "<div>";
    hourBlocks += `<div>${allHourData[i].time.split(" ")[1]}</div>`;
    hourBlocks += `<div><img src="${allHourData[i].condition.icon}"></div>`;
    hourBlocks += `<div>${allHourData[i].temp_c}</div>`;
    hourBlocks += "</div>";
  }
  return `<hr/><div class="weather2hours">${hourBlocks}</div>`;
}

function renderForecast(forecastEntity) {
  const divMainLine = document.createElement("div");
  divMainLine.className = "main_line";
  divMainLine.innerHTML = `<div class="main_line_left"><p id="main_line_city"> ${
    forecastEntity.city
  }  ${forecastEntity.country}</p>
  <p id="main_line_time">${forecastEntity.currentDataTime}</p> 
  <div style="margin-left: 25px;display:flex;align-items:center;">
  <p id = "main_line_temp">  ${forecastEntity.currentTemp_C}°С </p>
  <img id="main_line_icon"src='${forecastEntity.currentConditionIcon}'></img>
  </div></div>
  <div><div class="main_line_weather_info"><p id = "main_line_cloud"> ${
    forecastEntity.currentCondition
  } Cloud: ${forecastEntity.currentCloud}% </p>
  <p id = "main_line_feelsLike"> Feels like: ${forecastEntity.currentFeelslike_c}°С </p>
  <p id = "main_line_wind"> Wind: ${forecastEntity.currentWind_kph}kph direction: ${
    forecastEntity.currentWind_dir
  } gust: ${forecastEntity.currentGust_kph}kph </p>
  <p id = "main_line_plessure"> Pressure: ${forecastEntity.currentPressure_mb} mb</p>
  <p id = "main_line_humidity"> Humidity: ${forecastEntity.currentHumidity}% </p>
  <p id = "main_line_visKm"> Visibility: ${
    forecastEntity.currentVis_km
  }km </p></div>                            
  ${renderTable(forecastEntity.currentTempAllHours)}<div>`;
  return divMainLine;
}

function renderForecastAnotherDay(forecastEntity, dateValue) {
  const index = dateValue === "tomorrow" ? 1 : 2;
  const forecastday = forecastEntity.anotherDateForecast[index];
  const divMainLine = document.createElement("div");
  divMainLine.className = "main_line";
  divMainLine.innerHTML = `<div class="main_line_left"><p id="main_line_city"> ${
    forecastEntity.city
  }  ${forecastEntity.country} </p> 
  <p id="main_line_time"> ${forecastday.date} </p>
  <div style="margin-left: 25px;display:flex;align-items:center;">
  <p id = "main_line_temp">  ${forecastday.day.maxtemp_c}°С </p>
  <img id="main_line_icon"src='${forecastday.day.condition.icon}'></img>
  </div></div>
  <div><div class="main_line_weather_info">
  <p id = "main_line_cloud">${forecastday.day.condition.text}; Avg. temperature: ${
    forecastday.day.avgtemp_c
  }°С </p>
  <p id = "main_line_feelsLike"> Min temp: ${forecastday.day.mintemp_c}°С </p>
  <p id = "main_line_wind"> Sunrise: ${forecastday.astro.sunrise}; sunset: ${
    forecastday.astro.sunset
  }; moon phase: ${forecastday.astro.moon_phase}</p>
  <p id = "main_line_plessure"> Max. wind: ${forecastday.day.maxwind_kph} kph</p>
  <p id = "main_line_humidity"> Humidity: ${forecastday.day.avghumidity}% </p>
  <p id = "main_line_visKm">Avg. visibility: ${forecastday.day.avgvis_km}km </p> </div>             
  ${renderTable(forecastday.hour)}`;
  return divMainLine;
}

function renderHistoryDay(historyEntity) {
  const historyday = historyEntity.historyDate;
  const divMainLine = document.createElement("div");
  divMainLine.className = "main_line";
  divMainLine.innerHTML = `<div class="main_line_left"><p id="main_line_city"> ${
    historyEntity.city
  }  ${historyEntity.country} </p> 
  <p id="main_line_time"> ${historyday.date} </p>
  <div style="margin-left: 25px;display:flex;align-items:center;">
  <p id = "main_line_temp">  ${historyday.day.maxtemp_c}°С </p>
  <img id="main_line_icon"src='${historyday.day.condition.icon}'></img>
  </div></div>
  <div><div class="main_line_weather_info">
  <p id = "main_line_cloud">${historyday.day.condition.text}; Avg. temperature: ${
    historyday.day.avgtemp_c
  }°С </p>
  <p id = "main_line_feelsLike"> Min temp: ${historyday.day.mintemp_c}°С </p>
  <p id = "main_line_wind"> Sunrise: ${historyday.astro.sunrise}; sunset: ${
    historyday.astro.sunset
  }; moon phase: ${historyday.astro.moon_phase}</p>
  <p id = "main_line_plessure"> Max. wind: ${historyday.day.maxwind_kph} kph</p>
  <p id = "main_line_humidity"> Humidity: ${historyday.day.avghumidity}% </p>
  <p id = "main_line_visKm">Avg. visibility: ${historyday.day.avgvis_km}km </p> </div>             
  ${renderTable(historyday.hour)}`;
  return divMainLine;
}

function getForecast(url) {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const forecast = new Forecast(data);
      return forecast;
    });
}

export {
  renderForecast,
  getForecast,
  searchCity,
  setTimeBlock,
  getUrlByCity,
  renderForecastAnotherDay,
  historyWeatherPreview,
  activeBlocks,
  renderHistoryDay,
  getHistoryForecast,
};
