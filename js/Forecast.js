export class Forecast {
  constructor(data) {
    this.city = data.location.name;
    this.country = data.location.country;
    this.currentDataTime = data.location.localtime;

    this.currentTemp_C = data.current.temp_c;
    this.currentCondition = data.current.condition.text;
    this.currentConditionIcon = data.current.condition.icon;

    this.currentWind_kph = data.current.wind_kph;
    this.currentWind_dir = data.current.wind_dir;
    this.currentPressure_mb = data.current.pressure_mb;
    this.currentHumidity = data.current.humidity;
    this.currentCloud = data.current.cloud;
    this.currentFeelslike_c = data.current.feelslike_c;
    this.currentVis_km = data.current.vis_km;
    this.currentGust_kph = data.current.gust_kph;

    this.currentTempAllHours = data.forecast.forecastday[0].hour;
  }
}
