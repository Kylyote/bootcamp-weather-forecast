// Variables to connect to HTML
const APIKey = "bd5839d898578252744e24d76b5876ca";
let cityInput = document.querySelector(".city-text");
let dailyForecast = document.querySelector(".daily-forecast-content");
let lat = 38.538;
let long = -121.757;

function getLatLong() {
  // Takes cityInput and breaks it into parts to construct the URL
  //let cityName = cityInput.split(",")[0];
  let cityName = "Sacramento";
  //let stateCode = cityInput.split(",")[1];
  //let stateCode = "CA";

  //let requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateCode + ",1&limit=1&appid=" + APIKey;
  let requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + ",1&limit=1&appid=" + APIKey;

  // fetch the location data from OpenWeather
  fetch(requestUrl)
    .then(function (response) {
      // this is the promise that data will come in the form of a json
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data[0].lat;
      long = data[0].lon;
      getWeather();
      getForecast();
      console.log(lat);
      console.log(long);
    });
}
// get the present day weather 
function getWeather() {
  // construct URL to get weather data. This nesting seems messy
  let requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + APIKey + "&units=imperial";
    
  // Fetch the weather data
  fetch(requestUrl)
  .then(function (response) {
      return response.json();
    })
  .then(function(data){
      console.log("Result from getWeather", '\n',  data);
      let presentDay = [data.main.temp, data.wind.speed, data.main.humidity];
      console.log("Present day weather", '\n', presentDay);
    });
}
// get weather for the next 5 days
function getForecast() {
  // construct URL to get weather data. This nesting seems messy
  let requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=" + APIKey + "&units=imperial";
    
  // Fetch the weather data
  fetch(requestUrl)
  .then(function (response) {
      return response.json();
    })
  .then(function(data){
      console.log("Result from getWeather", '\n',  data);
      let day1 = [data.list[7].main.temp, data.list[7].wind.speed, data.list[7].main.humidity];
      let day2 = [data.list[15].main.temp, data.list[15].wind.speed, data.list[15].main.humidity];
      let day3 = [data.list[23].main.temp, data.list[23].wind.speed, data.list[23].main.humidity];
      let day4 = [data.list[31].main.temp, data.list[31].wind.speed, data.list[31].main.humidity];
      let day5 = [data.list[39].main.temp, data.list[39].wind.speed, data.list[39].main.humidity];
      console.log("Present day weather", '\n', day1, '\n', day2, '\n', day3, '\n', day4, '\n', day5);
    });
}

getLatLong();