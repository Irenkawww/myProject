let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let currentWeekDay = document.querySelector("#currentWeekDay");
currentWeekDay.innerHTML = day;

let currentTime = document.querySelector("#currentTime");
let hour = now.getHours();
let min = now.getMinutes();

if (hour > 9) {
  hour = hour.toString();
} else {
  hour = `0${hour.toString()}`;
}

if (min > 9) {
  min = min.toString();
} else {
  min = `0${min.toString()}`;
}
currentTime.innerHTML = hour + ":" + min;

function showDaysWeather () {
  let daysWeather = document.querySelector("#daysWeather");
  let forecastHTML=`<div class="row">`;
let days = ["Mon", "Tue", "Wed", "Thu","Fri", "Sat"];
days.forEach(function (day) {
forecastHTML = forecastHTML + `
              <div class="col-2">
                ${day}
                <img src="media/weather_1.jpg" alt="weatherIcon" width="64" />
                <span class="max"> 10° </span> <span class="min"> 2° </span>
              </div>
               `;
})
  forecastHTML = forecastHTML + `</div>`;
  daysWeather.innerHTML = forecastHTML;
}
showDaysWeather();
function showWeather(response) {
  tempCelcius = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let currentTempCelcius = document.querySelector("#currentTemprature");
  currentTempCelcius.innerHTML = `${tempCelcius}`;
  let explanation = document.querySelector("#explanation");
  explanation.innerHTML= response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  }
function getPosition(position) {
  let apiKey = "a0acd12f3ad56ebd573681d3c485d476";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}
function geolocation(){
navigator.geolocation.getCurrentPosition(getPosition)
}
function getCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let city = cityInput.value;
  let apiKey = "a0acd12f3ad56ebd573681d3c485d476";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
 }
function showFahrenheit(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  celcius.classList.remove("active");
  let currentTempFahrenheit = document.querySelector("#currentTemprature");
  currentTempFahrenheit.innerHTML = Math.round((tempCelcius * 9/5) + 32);
}

function showCelcius(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
  let currentTempCelcius = document.querySelector("#currentTemprature");
  currentTempCelcius.innerHTML = Math.round(tempCelcius);
}

let tempCelcius = null;

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", geolocation);

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", getCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celcius = document.querySelector("#celsius");
celcius.addEventListener("click", showCelcius);

