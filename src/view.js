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
  days = [
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
  let hourIn12Format = "";
  if (hour > 12) {
    hourIn12Format = hour - 12;
    if (hourIn12Format < 10) {
      time = `0${hourIn12Format}:${minute} PM`;
    } else {
      time = `${hourIn12Format}:${minute} PM`;
    }
  } else {
    hourIn12Format = hour;
    if (hourIn12Format < 10) {
      time = `0${hourIn12Format}:${minute} AM`;
    } else {
      time = `${hourIn12Format}:${minute} AM`;
    }
  }
  let CurrentDate = document.querySelector("#current-date");
  CurrentDate.innerHTML = `${day} ${date}${ordinal} ${month} ${time}`;
}

function display_current_readings(details) {
  let city_name = `${details.city_name.toUpperCase()}`;
  document.querySelector("#location").innerHTML = city_name;
  document.querySelector("#tempNow").innerHTML = details.temp_current;
  let min_max = `${details.temp_max}${unit_symbol} / ${details.temp_min}${unit_symbol}`;
  document.querySelector("#max_min").innerHTML = min_max;
  document.querySelector("#description").innerHTML = `${details.description}`;
  document.querySelector("#humidity").innerHTML = `${details.humidity} %`;
  document.querySelector("#air_pressure").innerHTML = `${details.pressure} hPa`;
  document.querySelector("#windSpeed").innerHTML = `${details.wind_speed} km/h`;
  let sunrise = details.sunrise.getHours() + `:` + details.sunrise.getMinutes();
  document.querySelector("#sunrise").innerHTML = `${sunrise}`;
  let sunset = details.sunset.getHours() + `:` + details.sunset.getMinutes();
  document.querySelector("#sunset").innerHTML = `${sunset}`;
  let icon_element = document.querySelector("#icon");
  icon_element.setAttribute("src", details.icon_image);
  icon_element.setAttribute("alt", `${details.description}`);
}

function display_hourly_forecast(response) {
  let currentHour = new Date(response.data.current.dt * 1000).getHours();
  let forecastList = document.querySelector("#hourly-forecast");
  let listitem = "";
  for (let i = 1; i < 24; i++) {
    const hour = (i + currentHour) % 24;
    const image = response.data.hourly[i].weather[0].icon;
    const img_means = response.data.hourly[i].weather[0].description;
    const temp = Math.round(response.data.hourly[i].temp);
    listitem += `<li class="row mt-2">
        <span class="col p-2">${hour}:00</span>
        <span class="col wt-img">
         <img src="https://openweathermap.org/img/wn/${image}@2x.png" width="40px"/>
        </span>
        <span class="col-4 p-2">${img_means}</span>
        <span class="col p-2">${temp}${unit_symbol}</span>
       </li>`;
  }
  forecastList.innerHTML = `${listitem}`;
}

function display_7days_forecast(response) {
  let weekList = document.querySelector("#oneWeekForecast");
  let list = "";
  let getNumDay = new Date().getDay();
  for (var i = 0; i < 7; i++) {
    const currentDay = (i + getNumDay) % 7;
    const image = response.data.daily[i].weather[0].icon;
    const img_means = response.data.daily[i].weather[0].description;
    const tempMax = Math.round(response.data.daily[i].temp.max);
    const tempMin = Math.round(response.data.daily[i].temp.min);
    list += `<li class="row mt-2">
        <span class="col p-2"> ${days[currentDay]}</span>
        <span class="col-2 wt-img">
          <img src="https://openweathermap.org/img/wn/${image}@2x.png" width="40px"/>
        </span>
        <span class="col-4 p-2">${img_means}</span>
        <div class="col-sm-3 p-2">
         <strong>${tempMax}${unit_symbol} </strong>/ ${tempMin}${unit_symbol}
        </div>
       </li>`;
  }
  weekList.innerHTML = `${list}`;
}
