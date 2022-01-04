function getUrlByCity(city, date = "") {
  let url =
    "http://api.weatherapi.com/v1/forecast.json?key=b42ec53b7614492ea26173900212112&q=";
  if (date) {
    url = url + city + "&dt=" + date;
  } else {
    url = url + city;
  }
  return url;
}

setTimeBlock();

function setTimeBlock() {
  document.getElementsByClassName("time_block")[0].innerHTML =
    new Date().timeNow();
  setInterval(() => {
    document.getElementsByClassName("time_block")[0].innerHTML =
      new Date().timeNow();
  }, 1000);
}
