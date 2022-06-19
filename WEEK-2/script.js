let now = new Date();
function displayCurrentDate() {
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
    time = `0${hour}:${minute} PM`;
  } else {
    time = `0${hour}:${minute} AM`;
  }
  let CurrentDate = document.querySelector("#current-date");
  CurrentDate.innerHTML = `${month} ${date} ${day} ${time}`;
}

function weatherInThisCity(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#searched-city");
  let locateCity = searchBox.value.toUpperCase().trim();
  let location = document.querySelector("#location");
  location.innerHTML = `${locateCity}`;
  searchBox.value = "";
}

displayCurrentDate();
let search = document.querySelector("#search-button");
search.addEventListener("submit", weatherInThisCity);
