function refreshweather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cityname");
  let descriptionElement = document.querySelector("#description");
  let humidityElememt = document.querySelector("#Humidity");
  let windElement = document.querySelector("#windspeed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon"/>`;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElememt.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  getForecast(response.data.city);
}

function searchCity(city) {
  //make api call and update the interface//
  let APIkey = "b08b4acf0t6108d50e30fa0b396od66f";
  let APIurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${APIkey}&units=metric`;
  axios.get(APIurl).then(refreshweather);
}
function InputSerach(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");

  //add API//
  searchCity(input.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestomp) {
  let date = new Date(timestomp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="forecast-day">
            <div class="forecast-date">${formatDay(day.time)}</div>
            <div>
            <img src="${day.condition.icon_url}" class="forecast-icon"/>
            </div>
            <div class="forecast-tempurates">
              <div class="forecast-temp">
              <strong>${Math.round(day.temperature.maximum)}°C</strong></div>
              <div class="forecast-temp">${Math.round(
                day.temperature.minimum
              )}°C</div>
            </div>
          </div>`;
    }
  });

  let forecastWeather = document.querySelector("#forecast");

  forecastWeather.innerHTML = forecastHTML;
}

function getForecast(city) {
  let key = "b08b4acf0t6108d50e30fa0b396od66f";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=metric`;
  axios(url).then(displayForecast);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", InputSerach);

searchCity("Johannesburg");
