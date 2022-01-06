fetch(
  "http://api.weatherapi.com/v1/forecast.json?key=b42ec53b7614492ea26173900212112&q=London&days=7&aqi=yes&alerts=yes"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let block = dayWeatherPreview(data);
    document.getElementsByClassName("second_line")[0].append(block);
  });

setTimeBlock();
