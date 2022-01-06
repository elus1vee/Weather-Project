function getUrlByCity(city, date = "") {
  let url = "http://api.weatherapi.com/v1/forecast.json?key=b42ec53b7614492ea26173900212112&q=";
  if (date) {
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

function setTimeBlock() {
  document.getElementsByClassName("time_block")[0].innerHTML = new Date().timeNow();
  setInterval(() => {
    document.getElementsByClassName("time_block")[0].innerHTML = new Date().timeNow();
  }, 1000);
}

function searchCity(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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
  divMainLine.innerText = "";
  divMainLine.className = "main_line";
  divMainLine.innerHTML = `<p id="main_line_city"> ${forecastEntity.city}  ${forecastEntity.country}  ${forecastEntity.currentDataTime} </p> 
                            <img id="main_line_icon"src='${forecastEntity.currentConditionIcon}'></img>
                            <p id = "main_line_cloud"> ${forecastEntity.currentCondition} Cloud:= ${forecastEntity.currentCloud}% </p>
                            <p id = "main_line_temp"> t: ${forecastEntity.currentTemp_C}°С </p>
                            <p id = "main_line_feelsLike"> Feels like: ${forecastEntity.currentFeelslike_c}°С </p>
                            <p id = "main_line_wind"> Wind: ${forecastEntity.currentWind_kph}kph direction: ${forecastEntity.currentWind_dir} gust: ${forecastEntity.currentGust_kph}kph </p>
                            <p id = "main_line_plessure"> Pressure: ${forecastEntity.currentPressure_mb} mb</p>
                            <p id = "main_line_humidity"> Humidity: ${forecastEntity.currentHumidity}% </p>
                            <p id = "main_line_visKm"> Visibility: ${forecastEntity.currentVis_km}km </p>                            
                            ${forecastEntity.currentTempAllHours}`;
  return divMainLine;
}

function getForecast(url) {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const forecast = new Forecast(data);
      return forecast;
    });
}
export { renderForecast, getForecast, searchCity, setTimeBlock, getUrlByCity };
