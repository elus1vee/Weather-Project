export class History {
    constructor(data) {
      this.city = data.location.name;
      this.country = data.location.country;
      this.historyDate = data.forecast.forecastday[0];
      this.currentTempAllHours = data.forecast.forecastday[0].hour;
    }
  }