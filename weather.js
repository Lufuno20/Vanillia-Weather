function InputSerach(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let cityElement = document.querySelector("#cityname");
  cityElement.innerHTML = input.value;
  //add API//
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", InputSerach);
