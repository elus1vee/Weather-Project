function getUrlByCity(city, date = "") {
  let url = "http://api.weatherapi.com/v1/forecast.json?key=b42ec53b7614492ea26173900212112&q=";
  if (date) {
    url = "http://api.weatherapi.com/v1/history.json?key=b42ec53b7614492ea26173900212112&q=";
    url = url + city + "&dt=" + date;
  } else {
    url = url + city + "&days=7&aqi=yes&alerts=yes";
  }
  return url;
}

function dayWeatherPreview(data) {
  console.log(data);
  let mainDiv = document.createElement("div");
  mainDiv.className = "dayWeatherPreview__main";
  for (let i = 0; i < 3; i++) {
    let div = document.createElement("div");
    div.className = "dayWeatherPreview__block";
    let obj = data.forecast.forecastday[i];
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
    mainDiv.append(div);
  }
  return mainDiv;
}
function historyWeatherPreview(cityyy) {
  let now = new Date();
  const dayMilliseconds = 24 * 60 * 60 * 1000;
  let mainDiv = document.createElement("div");
  mainDiv.className = "dayWeatherPreview__main";
  let timeArr = [];
  for (let i = 0; i < 7; i++) {
    now.setTime(now.getTime() - dayMilliseconds);
    timeArr[i] = now.toJSON().split("T")[0];
  }
  timeArr.forEach((item) => {
    console.log(item);
  });

  for (let i = 0; i < 7; i++) {
    let url = getUrlByCity(cityyy, timeArr[i]);
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let div = document.createElement("div");
        div.className = "dayWeatherPreview__block";
        let obj = data.forecast.forecastday[0];
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
        mainDiv.append(div);
      });
  }
  return mainDiv;
}

function setTimeBlock() {
  document.getElementsByClassName("time_block")[0].innerHTML = new Date().timeNow();
  setInterval(() => {
    document.getElementsByClassName("time_block")[0].innerHTML = new Date().timeNow();
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
//================================
import { Forecast } from "./Forecast.js";

function renderTable(allHourData) {
  let timeColumns = "";
  let iconColumns = "";
  let tempColumns = "";
  for (let i = 0; i < allHourData.length; i = i + 2) {
    timeColumns = timeColumns.concat(`<th>${allHourData[i].time.split(" ")[1]}</th>`);
    iconColumns = iconColumns.concat(`<th><img src="${allHourData[i].condition.icon}"></th>`);
    tempColumns = tempColumns.concat(`<th>${allHourData[i].temp_c}</th>`);
  }
  return `<table><tbody><tr>${timeColumns}</tr><tr>${iconColumns}</tr><tr>${tempColumns}</tr></tbody></table>`;
}

function renderForecast(forecastEntity) {
  const divMainLine = document.createElement("div");
  divMainLine.className = "main_line";
  divMainLine.innerHTML = `<p id="main_line_city"> ${forecastEntity.city}  ${
    forecastEntity.country
  }  ${forecastEntity.currentDataTime} </p> 
  <img id="main_line_icon"src='${forecastEntity.currentConditionIcon}'></img>
  <p id = "main_line_cloud"> ${forecastEntity.currentCondition} Cloud:= ${
    forecastEntity.currentCloud
  }% </p>
  <p id = "main_line_temp"> Temperature: ${forecastEntity.currentTemp_C}°С </p>
  <p id = "main_line_feelsLike"> Feels like: ${forecastEntity.currentFeelslike_c}°С </p>
  <p id = "main_line_wind"> Wind: ${forecastEntity.currentWind_kph}kph direction: ${
    forecastEntity.currentWind_dir
  } gust: ${forecastEntity.currentGust_kph}kph </p>
  <p id = "main_line_plessure"> Pressure: ${forecastEntity.currentPressure_mb} mb</p>
  <p id = "main_line_humidity"> Humidity: ${forecastEntity.currentHumidity}% </p>
  <p id = "main_line_visKm"> Visibility: ${
    forecastEntity.currentVis_km
  }km </p>                            
  ${renderTable(forecastEntity.currentTempAllHours)}`;
  return divMainLine;
}

function renderForecastAnotherDay(forecastEntity, dateValue) {
  const index = dateValue === "tomorrow" ? 1 : 2;
  const forecastday = forecastEntity.anotherDateForecast[index];
  const divMainLine = document.createElement("div");
  divMainLine.className = "main_line";
  divMainLine.innerHTML = `<p id="main_line_city"> ${forecastEntity.city}  ${
    forecastEntity.country
  }  ${forecastday.date} </p> 
  <img id="main_line_icon"src='${forecastday.day.condition.icon}'></img>
  <p id = "main_line_cloud">${forecastday.day.condition.text}; Avg. temperature: ${
    forecastday.day.avgtemp_c
  }°С </p>
  <p id = "main_line_temp"> Max. temp: ${forecastday.day.maxtemp_c}°С </p>
  <p id = "main_line_feelsLike"> Min temp: ${forecastday.day.mintemp_c}°С </p>
  <p id = "main_line_wind"> Sunrise: ${forecastday.astro.sunrise}; sunset: ${
    forecastday.astro.sunset
  }; moon phase: ${forecastday.astro.moon_phase}</p>
  <p id = "main_line_plessure"> Max. wind: ${forecastday.day.maxwind_kph} kph</p>
  <p id = "main_line_humidity"> Humidity: ${forecastday.day.avghumidity}% </p>
  <p id = "main_line_visKm">Avg. visibility: ${
    forecastday.day.avgvis_km
  }km </p>                            
  ${renderTable(forecastday.hour)}`;
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
};
