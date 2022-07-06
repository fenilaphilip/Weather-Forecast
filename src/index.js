var apiKey = `9f60d7631c91fefe3d27ab9b78997410`;
var units = "metric";
var unit_symbol = "°C";
var temperatureInCity;
var currentCity;
var apiRequest = `https://api.openweathermap.org/data/2.5/weather?`;

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
  let ordinal = "";
  if (date === 1 || date === 21 || date === 31) {
    ordinal = "st";
  } else {
    if (date === 2 || date === 22) {
      ordinal = "nd";
    } else {
      if (date === 3 || date === 23) {
        ordinal = "rd";
      } else {
        ordinal = "th";
      }
    }
  }
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  let time = ``;
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour > 12) {
    let hourIn12Format = hour - 12;
    if (hourIn12Format < 10) {
      time = `0${hourIn12Format}:${minute} PM`;
    } else {
      time = `${hourIn12Format}:${minute} PM`;
    }
  } else {
    if (hourIn12Format < 10) {
      time = `0${hourIn12Format}:${minute} AM`;
    } else {
      time = `${hourIn12Format}:${minute} AM`;
    }
  }
  let CurrentDate = document.querySelector("#current-date");
  CurrentDate.innerHTML = `${day} ${date}${ordinal} ${month} ${time}`;
  showHourlyforecast(hour);
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
  let apiUrl = `${apiRequest}${queryParams}`;
  axios.get(apiUrl).then(showTemperature);
}

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

function showHourlyforecast(currentHour) {
  let forecastList = document.querySelector("#hourly-forecast");
  let listitem = "";
  for (let i = 0; currentHour < 25; i++) {
    listitem += `<li class="row mt-4">
         <span class="col">${currentHour}:00</span>
         <span class="col">⛅</span>
         <span class="col-4">Partially cloudy</span>
         <span class="col">22°C</span>
       </li>`;
    currentHour += 1;
  }
  forecastList.innerHTML = `${listitem}`;
}

function showTemperature(response) {
  console.log(response);
  temperatureInCity = Math.round(response.data.main.temp);
  let tempNowHeader = document.querySelector("#tempNow");
  tempNowHeader.innerHTML = temperatureInCity;

  let temp_min = Math.round(response.data.main.temp_min);
  let temp_max = Math.round(response.data.main.temp_max);
  let temp_max_min = document.querySelector("#max_min");
  temp_max_min.innerHTML = `${temp_max}${unit_symbol} / ${temp_min}${unit_symbol}`;

  currentCity = response.data.name;
  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = `${currentCity.toUpperCase()}`;

  let wtDescription = response.data.weather[0].description;
  let weather_details = document.querySelector("#description");
  weather_details.innerHTML = `${wtDescription}`;

  let wt_icon = response.data.weather[0].icon;
  let icon_element = document.querySelector("#icon");
  icon_element.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${wt_icon}@2x.png`
  );
  icon_element.setAttribute("alt", `${wtDescription}`);

  let humidity = response.data.main.humidity;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `${humidity} %`;

  let airPressure = Math.round(response.data.main.pressure);
  let pressure = document.querySelector("#air_pressure");
  pressure.innerHTML = `${airPressure} hPa`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `${wind} km/h`;

  let sunrise =
    new Date(response.data.sys.sunrise * 1000).getHours() +
    `:` +
    new Date(response.data.sys.sunrise * 1000).getMinutes();
  let sun_rise = document.querySelector("#sunrise");
  sun_rise.innerHTML = `${sunrise}`;

  let sunset =
    new Date(response.data.sys.sunset * 1000).getHours() +
    `:` +
    new Date(response.data.sys.sunset * 1000).getMinutes();
  let sun_set = document.querySelector("#sunset");
  sun_set.innerHTML = `${sunset}`;

  displayCurrentDate();
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let queryParams = `lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  let apiUrl = `${apiRequest}${queryParams}`;

  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

displayCurrentDate();

let search = document.querySelector("#search-button");
search.addEventListener("submit", weatherInThisCity);
let tempF = document.querySelector("#btn-fahrenheit");
tempF.addEventListener("click", showTemperatureInF);
let tempC = document.querySelector("#btn-celsius");
tempC.addEventListener("click", showTemperatureInC);
let locationNow = document.querySelector("#location-button");
locationNow.addEventListener("click", currentLocation);
navigator.geolocation.getCurrentPosition(showLocation);
