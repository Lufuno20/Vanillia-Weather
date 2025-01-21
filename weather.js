function refreshweather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cityname");

  cityElement.innerHTML = response.data.city;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", InputSerach);

searchCity("Johannesburg");
