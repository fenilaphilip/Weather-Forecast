var temperatureInCity;
var currentCity;

function current_location(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(show_location);
}

function show_location(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let queryParams = `lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  let apiUrl = `${apiRequestCurrent}${queryParams}`;

  axios.get(apiUrl).then(function (response) {
    let current_details = extract_current_readings(response.data);
    display_current_readings(current_details);
    show_weather_forcast(latitude, longitude);
  });
}

function show_default_city() {
  currentCity = default_city;
  show_weather_by_city(currentCity);
}

function weather_in_this_city(event) {
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
    let current_details = extract_current_readings(response.data);
    display_current_readings(current_details);
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
  };
}

function show_weather_forcast(lat, lon) {
  let queryParams = `lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  let apiUrl = `${apiRequestForecast}${queryParams}`;
  axios.get(apiUrl).then(function (response) {
    let daily_readings = extract_5days_readings(response.data);
    display_5days_forecast(daily_readings);
  });
}

function extract_5days_readings(data) {
  let readings = [];
  for (let i = 0; i < 5; i++) {
    let icon = data.list[i].weather[0].icon;
    let reading = {
      image: `https://openweathermap.org/img/wn/${icon}@2x.png`,
      description: data.list[i].weather[0].description,
      tempMax: Math.round(data.list[i].main.temp_max),
      tempMin: Math.round(data.list[i].main.temp_min),
    };
    readings.push(reading);
  }
  return readings;
}

show_default_city();

let search = document.querySelector("#search-button");
search.addEventListener("submit", weather_in_this_city);
let locationNow = document.querySelector("#location-img-btn");
locationNow.addEventListener("click", current_location);

navigator.geolocation.getCurrentPosition(show_location);
