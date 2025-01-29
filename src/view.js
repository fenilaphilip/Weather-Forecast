var days = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

function display_current_readings(details) {
  let city_name = `${details.city_name.toUpperCase()}`;
  document.querySelector("#location").innerHTML = city_name;
  document.querySelector("#tempNow").innerHTML = `${details.temp_current}${unit_symbol}`;
  let min_max = `${details.temp_max}${unit_symbol}<span> </span> / <span> </span>${details.temp_min}${unit_symbol}`;
  document.querySelector("#max_min").innerHTML = min_max;
  document.querySelector("#description").innerHTML = `${details.description}`;
  let icon_element = document.querySelector("#icon");
  icon_element.setAttribute("src", details.icon_image);
  icon_element.setAttribute("alt", `${details.description}`);
}

function display_5days_forecast(readings) {
  let weekList = document.querySelector("#forecast");
  let list = "";
  let getNumDay = new Date().getDay();
  let daysforecast = [];
  for (let i = 0; i < 5; i++) {
    const currentDay = (i + getNumDay) % 7;
    let day = `${days[currentDay]}`;
    daysforecast.push(day);
  }
  for (let i = 0; i < 5; i++) {

    list += `<div class="col">
    <div class="row">
      <h6>${daysforecast[i]}</h6>
    </div>
    <div class="row">
        <img src="${readings[i].image}"  alt="${readings[i].description}" width="30px"/>
    </div>
    <div class="row">
      <p><span>${readings[i].tempMax}${unit_symbol}</span> / <span>${readings[i].tempMin}${unit_symbol}</span></p>
    </div>
  </div>`
  }
  weekList.innerHTML = `${list}`;
}
