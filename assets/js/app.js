var apiKey = '6e2c9a825d52912ed09435216f712368';
var baseUrl = 'https://api.openweathermap.org/data/2.5/';
var currentWeather = baseUrl + 'weather?&appid=' + apiKey + '&units=metric&';
var forcast = baseUrl + 'forecast?&appid=' + apiKey + '&units=metric&';

console.log('Current weather link: ', currentWeather);
console.log('Forecast current weather link: ', forcast);

function getLocalStoredItems() {
  var getStoredItem = JSON.parse(localStorage.getItem("SearchKey")) || [];
  return getStoredItem;
}

function storeItemsLocally(searchItem) {
  var saveItem = localStorage.setItem("SearchKey", JSON.stringify(searchItem));
  return saveItem;
}

function DOMCurrentWeather(searchInput) {
  var todaysDate = moment(new Date()).format("DD/MM/YYYY");
  var weatherForToday = $('#today');
  $.get(currentWeather + `q=${searchInput}`)
    .then(currData => {

      var iconcode = currData.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      var lat = currData.coord.lat;
      var lon = currData.coord.lon;
      var currDOMoutPut = `    
            <h5 class="card-title">${currData.name} (${todaysDate}) <img src='${iconurl}'></h5>
            <p>Temp: ${Math.round(currData.main.temp)}
            <span>&#176;</span>C</p>
            <p>Wind:  ${parseFloat(currData.wind.speed).toPrecision(2)} KPH</p>
            <p>Humidity: ${Math.round(currData.main.humidity)}%</p>
            `
      weatherForToday.text(" ");
      weatherForToday.append(currDOMoutPut);
      getForeCast(lat, lon);
    })
}