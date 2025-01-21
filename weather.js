function refreshweather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cityname");
  let descriptionElement = document.querySelector("#description");
  let humidityElememt = document.querySelector("#Humidity");
  let windElement = document.querySelector("#windspeed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

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

  return `${day} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", InputSerach);

searchCity("Johannesburg");
