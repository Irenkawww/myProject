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

function formatDay(timeCode){
  let date = new Date(timeCode * 1000);
  let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
  ];
  let day = days[date.getDay()];
  return day;
}

function getForecast(response){
let apiKey = "a1cc97bd036td82dc4266fcb58afc0of";
let apiUrl= `https://api.shecodes.io/weather/v1/forecast?lon=${response.data.coordinates.longitude}&lat=${response.data.coordinates.latitude}&key=${apiKey}&units=metric`;
console.log(apiUrl);
 axios.get(apiUrl).then(showDaysWeather);
}

function showDaysWeather (response) {
  let forecast= response.data.daily;
  let daysWeather = document.querySelector("#daysWeather");
  let forecastHTML=`<div class="row">`;
let days = ["Mon", "Tue", "Wed", "Thu","Fri", "Sat"];
forecast.forEach(function (forecastDay, index) {
  if (index < 6) {
forecastHTML = forecastHTML + `
              <div class="col-2">
                ${formatDay(forecastDay.time)}
                <img src="${forecastDay.condition.icon_url}" alt="weatherIcon" width="64" />
                <span class="max"> ${Math.round(forecastDay.temperature.maximum)}° </span> <span class="min"> ${Math.round(forecastDay.temperature.minimum)}° </span>
              </div>
               `;}
})
  forecastHTML = forecastHTML + `</div>`;
  daysWeather.innerHTML = forecastHTML;
}

function showWeather(response) {
  tempCelcius = Math.round(response.data.temperature.current);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.city}`;
  let currentTempCelcius = document.querySelector("#currentTemprature");
  currentTempCelcius.innerHTML = `${tempCelcius}`;
  let explanation = document.querySelector("#explanation");
  explanation.innerHTML= response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  getForecast(response);
  }
function getPosition(position) {
  let apiKey = "a1cc97bd036td82dc4266fcb58afc0of";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`
  axios.get(url).then(showWeather);
}
function geolocation(){
navigator.geolocation.getCurrentPosition(getPosition)
}
function getCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let city = cityInput.value;
  let apiKey = "a1cc97bd036td82dc4266fcb58afc0of";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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

