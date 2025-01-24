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

function displayForecast() {
  let forecastWeather = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="forecast-day">
            <div class="forecast-date">${day}</div>
            <div class="forecast-icon">☀️</div>
            <div class="forecast-tempurates">
              <div class="forecast-temp">
              <strong>21°C</strong></div>
              <div class="forecast-temp">17°C</div>
            </div>
          </div>`;
  });

  forecastWeather.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", InputSerach);

searchCity("Johannesburg");
displayForecast();
