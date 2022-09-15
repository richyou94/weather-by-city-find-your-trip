//jquery var for Search cities
var cityNameInput = $('#cityNameInput');
var searchBtn = $('#button-search');
var cityHistContainer = $('#city-history')

// jquery variables for today's weather
var todayCity = $('#today-city-name');
var todayTemp = $('#today-temp');
var todayWind = $('#today-wind');
var todayHumid = $('#today-humidity');
var todayUV = $('#today-UV-index');

//forecast container variables
var forcastContainer = $('#forecast-container');

// moment js variables
var todayDate = moment().format("MM-DD-YYYY");

//api keys
var APIKey = "d729cb3acec026c9b365ba8ff6fc07c5"

var city = "Los Angeles"
var unit = "imperial"
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + APIKey;

var cityName = "Los Angeles";
var stateCode = "CA";
var countryCode = "US";
var lat = "";
var lon = "";

// var queryURL = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;


var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&appid=${APIKey}`

var geoStored = {
  city: cityName,
  state: stateCode,
  country: countryCode,
  lat: lat,
  lon: lon
}

function getCoordinate() {
  fetch(geoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lat = data[0].lat
      lon = data[0].lon
      geoStored = {
        city: cityName,
        state: stateCode,
        country: countryCode,
        lat: lat,
        lon: lon
      };
      localStorage.setItem('geoData', JSON.stringify(geoStored));
    })
}
function readLocalStorage () {
  var geoDataLog = JSON.parse(localStorage.getItem('geoData'));
  // console.log(geoDataLog);
  cityName = geoDataLog.city;
  stateCode = geoDataLog.state;
  countryCode = geoDataLog.country;
  lat = geoDataLog.lat;
  lon = geoDataLog.lon;
  var queryURL = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
}


// Get api from openweather
function getApi() {
  getCoordinate();
  readLocalStorage();
  console.log(lat)
  console.log(lon)
  console.log(cityName);
  queryURL = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclulde=minutely,hourly,alerts&units=" + unit +"&appid=" + APIKey;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      appendTodayData(data);
    })
}
getApi();
function appendTodayData(data) {
  todayCity.text(`${cityName} (${todayDate})`);
  todayTemp.text(`Temp: ${data.current.temp}˚F`);
  todayWind.text(`Wind: ${data.current.wind_speed} mph`);
  todayHumid.text(`Humidity: ${data.current.humidity}%`);
  var testingVar = data.current.humidity;
  var uvStatus = "";
  if (testingVar < 3) {
    todayUV.css('color', 'green')
    uvStatus = "Low"
  } else if (testingVar < 6) {
    todayUV.css('color', 'yellow')
    uvStatus = "Moderate"
    todayUV.css('background-color', 'grey');
  } else if (testingVar < 8) {
    todayUV.css('color', 'orange')
    uvStatus = "HIGH"
  } else {
    todayUV.css('color', 'red')
    uvStatus = "VERY HIGH"
  };
  todayUV.text(`UV Index: ${data.current.uvi} (${uvStatus})`);
  
  
}

