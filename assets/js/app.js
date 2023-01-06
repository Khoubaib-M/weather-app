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
  