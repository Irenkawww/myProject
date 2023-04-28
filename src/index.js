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

function showWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let currentTempCelcius = document.querySelector("#currentTemprature");
  let tempCelcius = Math.round(response.data.main.temp);
  currentTempCelcius.innerHTML = `${tempCelcius}`;
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
let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", geolocation);

function showCityWeather(response) {
   console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let currentTempCelcius = document.querySelector("#currentTemprature");
  let tempCelcius = Math.round(response.data.main.temp);
  currentTempCelcius.innerHTML = `${tempCelcius}`;
  let explanation = document.querySelector("#explanation");
  explanation.innerHTML= response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  }

function getCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let city = cityInput.value;
  let apiKey = "a0acd12f3ad56ebd573681d3c485d476";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCityWeather);
 }
let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", getCity);

