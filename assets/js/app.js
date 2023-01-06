var apiKey = 'c3f679e39df620f3348474ac3ac50c76';
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

function getForeCast(lat, lon) {

    var forecast = $('#forecast');
    forecast.text(" ");
    $.get(forcast + `&lat=${lat}&lon=${lon}`).then(forecastData => {
      var iconurl = "http://openweathermap.org/img/w/";
      var png = ".png";
      console.log(forecastData);
      forecastData.list.forEach(element => {
        var dateTime = element.dt_txt;
        var time = dateTime.substring(10, dateTime.length - 3);
        var date = dateTime.substring(0, dateTime.length - (time.length + 2));
        var forecastCard = `<div class="card col-md-3 mr-3 mb-3">
        <div class="card-body">
          <h5 class="card-title">${date}<span class='timeStyle'>${time}</span></h5>
          <img class ='cloudIcon' src="${iconurl + element.weather[0].icon + png}" class="card-img-top" alt="${element.weather[0].icon + png}">
          <p class="card-text">Temp: ${element.main.temp} <span>&#176;</span>C</p>
          <p class="card-text">Wind: ${element.wind.speed} KPH</p>
          <p class="card-text">Humidity: ${element.main.humidity}%</p>
        </div>
      </div>`
        forecast.append(forecastCard);
      })
    })
  }

function storeHistorySearchKey(e) {
    if ($.trim($("input#search-input").val()) === "") {
      e.preventDefault();
      alert('Please enter your desired location?');
      return;
    }
    e.preventDefault();
    var clear_history = $('.list-group');
    var userSearchInput = $("input#search-input").val();
    console.log(userSearchInput);
    userSearchInput = userSearchInput.charAt(0).toUpperCase() + userSearchInput.slice(1);
    console.log(userSearchInput);
    var isTrue = userSearchInput.length > 0;
    console.log(isTrue);
    var existingLocalKey = getLocalStoredItems();
    console.log(existingLocalKey);
    if ((!existingLocalKey.includes(userSearchInput)) && isTrue) {
      existingLocalKey.push(userSearchInput);
    }
    storeItemsLocally(existingLocalKey);
    DOMCurrentWeather(userSearchInput);
    clear_history.text(' ');
    seachHistory();
    $('button.btn-histSearchKey').click(UseHisKeyToSearch);
  }
  $('#search-form').submit(storeHistorySearchKey);
  function seachHistory() {
    var history = $("#history");
    var searchHisKey = getLocalStoredItems();
    searchHisKey.forEach(keyWord => {
      if (keyWord.length < 0) return;
      var hisBtn = `<button class="btn-histSearchKey">${keyWord}</button>`
      history.append(hisBtn);
    });
  };
  seachHistory();
  var history = $("#history");
  function UseHisKeyToSearch(e) {
    e.preventDefault();
    var btnVal = $(this).text();
    DOMCurrentWeather(btnVal);
  }
  $('button.btn-histSearchKey').click(UseHisKeyToSearch);
  