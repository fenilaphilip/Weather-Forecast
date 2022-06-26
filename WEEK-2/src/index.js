var apiKey = `9f60d7631c91fefe3d27ab9b78997410`;
var units = "metric";
var temperatureInCity;

function displayCurrentDate() {
  let now = new Date();
  let months = [
    "January",
    "February",
    " March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemper",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let month = months[now.getMonth()];
  let date = now.getDate();
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  let time = ``;
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour > 12) {
    hour = hour - 12;
    if (hour < 10) {
      time = `0${hour}:${minute} PM`;
    } else {
      time = `${hour}:${minute} PM`;
    }
  } else {
    time = `0${hour}:${minute} AM`;
  }
  let CurrentDate = document.querySelector("#current-date");
  CurrentDate.innerHTML = `${month} ${date} ${day} ${time}`;
}

function weatherInThisCity(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#searched-city");
  let locateCity = searchBox.value.trim();
  let queryParams = `q=${locateCity}&units=${units}&appid=${apiKey}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${queryParams}`;
  axios.get(apiUrl).then(showTemperature);
  searchBox.value = "";
}

function getTemperature(useFahrenheit) {
  if (useFahrenheit) {
    return Math.round(temperatureInCity * 1.8 + 32.0);
  } else {
    return temperatureInCity;
  }
}

function showTemperatureInF() {
  let tempNowHeader = document.querySelector("#tempNow");
  tempNowHeader.innerHTML = getTemperature(true);
}

function showTemperatureInC() {
  let tempNowHeader = document.querySelector("#tempNow");
  tempNowHeader.innerHTML = getTemperature(false);
}

function showHourlyforecast(currentHour) {
  let forecastList = document.querySelector("#hourly-forecast");
  // forecastList.appendChild(
  //   `<li class="row">
  //        <span class="col">12:00</span>
  //        <span class="col">⛅</span>
  //        <span class="col">Partially cloudy</span>
  //        <span class="col">22°C</span>
  //      </li>`
  // );
}

function showTemperature(response) {
  console.log(response);
  temperatureInCity = Math.round(response.data.main.temp);
  let temp_min = Math.round(response.data.main.temp_min);
  let temp_max = Math.round(response.data.main.temp_max);
  let city = response.data.name;
  let humidity = response.data.main.humidity;
  let uv;
  let airPressure = Math.round(response.data.main.pressure);
  let wind = Math.round(response.data.wind.speed);
  let tempNowHeader = document.querySelector("#tempNow");
  tempNowHeader.innerHTML = temperatureInCity;
  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = `${city}`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `${humidity} %`;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `${wind} km/h`;
  let pressure = document.querySelector("#air_pressure");
  pressure.innerHTML = `${airPressure} hPa`;

  displayCurrentDate();
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let queryParams = `lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${queryParams}`;

  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

displayCurrentDate();
showHourlyforecast();

let search = document.querySelector("#search-button");
search.addEventListener("submit", weatherInThisCity);
let tempF = document.querySelector("#btn-fahrenheit");
tempF.addEventListener("click", showTemperatureInF);
let tempC = document.querySelector("#btn-celsius");
tempC.addEventListener("click", showTemperatureInC);
let locationNow = document.querySelector("#location-button");
locationNow.addEventListener("click", currentLocation);
