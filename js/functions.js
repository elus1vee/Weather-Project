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
