function getUrlByCity(city, date = "") {
  let url = "http://api.weatherapi.com/v1/forecast.json?key=b42ec53b7614492ea26173900212112&q=";
  if (date) {
    url = url + city + "&dt=" + date;
  } else {
    url = url + city + "&days=7&aqi=yes&alerts=yes";
  }
  return url;
}
function dayWeatherPreview() {
  for (let i = 0; i < 7; i++) {
    let div = document.createElement("div");
    let datee = data.forecast.forecastday[i].date;
    let icon = data.forecast.forecastday[i].day.condition.icon;
  }
}
