var temperatureInCity;
var currentCity;
var days = [];

function showTemperatureInF() {
  units = "imperial";
  unit_symbol = "°F";
  apiAccess();
}

function showTemperatureInC() {
  units = "metric";
  unit_symbol = "°C";
  apiAccess();
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let queryParams = `lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  let apiUrl = `${apiRequestCurrent}${queryParams}`;

  axios.get(apiUrl).then(showTemperature);
}

function weatherInThisCity(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#searched-city");
  currentCity = searchBox.value.trim();
  apiAccess();
  searchBox.value = "";
}

function apiAccess() {
  let queryParams = `q=${currentCity}&units=${units}&appid=${apiKey}`;
  let apiUrl = `${apiRequestCurrent}${queryParams}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  display_current_readings(response);
  let longitude = response.data.coord.lon;
  let latitude = response.data.coord.lat;
  apiAccess_forcast(latitude, longitude);
  displayCurrentDate();
}

function apiAccess_forcast(lat, lon) {
  let queryParams = `lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  let apiUrl = `${apiRequestForecast}${queryParams}`;
  axios.get(apiUrl).then(display_hourly_forecast);
  axios.get(apiUrl).then(display_7days_forecast);
}

displayCurrentDate();

let search = document.querySelector("#search-button");
search.addEventListener("submit", weatherInThisCity);
let tempF = document.querySelector("#btn-fahrenheit");
tempF.addEventListener("click", showTemperatureInF);
let tempC = document.querySelector("#btn-celsius");
tempC.addEventListener("click", showTemperatureInC);
let locationNow = document.querySelector("#location-img-btn");
locationNow.addEventListener("click", currentLocation);
navigator.geolocation.getCurrentPosition(showLocation);
