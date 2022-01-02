const searchBtn = document.querySelector('.searchButton');
const fahrenheit = document.querySelector('#fahrenheit');
const celsius = document.querySelector('#celsius');

async function getWeather() {
  const searchBar = document.querySelector('.searchBar');
  const apiKey = '58deb4828fd1e5f32e312b0df2dcfc97';

  let search;
  if (searchBar.value) {
    search = searchBar.value;
  } else {
    search = 'london';
  }

  try {
    const response = await fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=' +
        search +
        '&appid=' +
        apiKey,
      { mode: 'cors' }
    );

    const weatherData = await response.json();
    updateData(weatherData);
  } catch (err) {
    alert(err); // TypeError: failed to fetch
  }
}

function updateData(obj) {
  const city = document.getElementById('city');
  const country = document.getElementById('country');
  const temp = document.getElementById('temperature');
  const description = document.getElementById('description');
  const weatherImage = document.getElementById('weatherImage');

  const wind = document.getElementById('wind');
  const humidity = document.getElementById('humidity');
  const sunrise = document.getElementById('sunrise');
  const sunset = document.getElementById('sunset');

  city.innerHTML = obj.name;
  country.innerHTML = obj.sys.country;
  temp.innerHTML = convertTemp(obj.main.temp);
  description.innerHTML = obj.weather[0].description;

  weatherImage.src = selectWeatherImage(obj.weather[0].id);
  wind.innerHTML = 'Wind: ' + convertWindspeedToMPH(obj.wind.speed) + ' mph';
  humidity.innerHTML = 'Humidity: ' + obj.main.humidity + '%';
  sunrise.innerHTML = 'Sunrise: ' + getTime(obj.sys.sunrise);
  sunset.innerHTML = 'Sunset: ' + getTime(obj.sys.sunset);
}

function getTime(num) {
  const date = new Date(num * 1000);
  let hour, mins;
  //   let mins = date.getMinutes();
  date.getHours() < 10
    ? (hour = '0' + date.getHours())
    : (hour = date.getHours());
  date.getMinutes() < 10
    ? (mins = '0' + date.getMinutes())
    : (mins = date.getMinutes());
  return hour + ':' + mins;
}

function convertTemp(temp) {
  if (celsius.classList == 'active') {
    console.log('celsius');
    return Math.round(temp - 273.15) + '°C';
  } else {
    console.log('fahrenheit');
    return Math.round((temp - 273.15) * 1.8 + 32) + '°F';
  }
}

function convertWindspeedToMPH(speed) {
  return Math.round(speed * 2.236936);
}

function selectWeatherImage(num) {
  var img;
  if (num >= 803) {
    img = 'images/broken_clouds.png';
  } else if (num == 802) {
    img = 'images/scattered_clouds.png';
  } else if (num == 801) {
    img = 'images/few_clouds.png';
  } else if (num == 800) {
    img = 'images/clear_sky.png';
  } else if (num >= 700) {
    img = 'images/mist.png';
  } else if (num >= 600) {
    img = 'images/snow.png';
  } else if (num >= 500) {
    img = 'images/rain.png';
  } else if (num >= 300) {
    img = 'images/shower_rain.png';
  } else if (num >= 200) {
    img = 'images/thunderstorm.png';
  }
  return img;
}

function toggleFahrenheit() {
  if (fahrenheit.classList == '') {
    fahrenheit.classList = 'active';
    celsius.classList = '';
  }
  getWeather();
}

function toggleCelsius() {
  if (celsius.classList == '') {
    celsius.classList = 'active';
    fahrenheit.classList = '';
  }
  getWeather();
}

getWeather();
searchBtn.addEventListener('click', getWeather);
fahrenheit.addEventListener('click', toggleFahrenheit);
celsius.addEventListener('click', toggleCelsius);
