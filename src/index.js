var temperatureInCity;
var currentCity;
var days = [];

function showTemperatureInF() {
  units = "imperial";
  unit_symbol = "°F";
  show_weather_by_city(currentCity);
}

function showTemperatureInC() {
  units = "metric";
  unit_symbol = "°C";
  show_weather_by_city(currentCity);
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

  axios.get(apiUrl).then(function (response) {
    console.log(response);
    let current_details = extract_current_readings(response.data);
    display_current_readings(current_details);
    displayCurrentDate();
    show_weather_forcast(latitude, longitude);
  });
}

function show_default_city() {
  currentCity = default_city;
  show_weather_by_city(currentCity);
}

function weatherInThisCity(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#searched-city");
  currentCity = searchBox.value.trim();
  show_weather_by_city(currentCity);
  searchBox.value = "";
}

function show_weather_by_city(city) {
  let queryParams = `q=${city}&units=${units}&appid=${apiKey}`;
  let apiUrl = `${apiRequestCurrent}${queryParams}`;
  axios.get(apiUrl).then(function (response) {
    console.log(response);
    let current_details = extract_current_readings(response.data);
    display_current_readings(current_details);
    displayCurrentDate();
    let longitude = response.data.coord.lon;
    let latitude = response.data.coord.lat;
    show_weather_forcast(latitude, longitude);
  });
}
function extract_current_readings(data) {
  return {
    city_name: data.name,
    description: data.weather[0].description,
    icon_image: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    temp_current: Math.round(data.main.temp),
    temp_min: Math.round(data.main.temp_min),
    temp_max: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    pressure: Math.round(data.main.pressure),
    wind_speed: Math.round(data.wind.speed),
    sunrise: new Date(data.sys.sunrise * 1000),
    sunset: new Date(data.sys.sunset * 1000),
  };
}

function show_weather_forcast(lat, lon) {
  let queryParams = `lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  let apiUrl = `${apiRequestForecast}${queryParams}`;
  axios.get(apiUrl).then(function (response) {
    console.log(response);
    display_hourly_forecast(response);
    display_7days_forecast(response);
  });
}

show_default_city();

let search = document.querySelector("#search-button");
search.addEventListener("submit", weatherInThisCity);
let tempF = document.querySelector("#btn-fahrenheit");
tempF.addEventListener("click", showTemperatureInF);
let tempC = document.querySelector("#btn-celsius");
tempC.addEventListener("click", showTemperatureInC);
let locationNow = document.querySelector("#location-img-btn");
locationNow.addEventListener("click", currentLocation);

navigator.geolocation.getCurrentPosition(showLocation);
