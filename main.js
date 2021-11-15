/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
const container = document.querySelector('.container');
const results = document.querySelector('.results');
const input = document.querySelector('input');
const form = document.forms[0];

async function getWeather(zip) {
  const response = await fetch(
    'api.openweathermap.org/data/2.5/weather?zip=' +
      zip +
      ',us&appid=53dcc962829731a4fa033950e8997254',
    { mode: 'cors' }
  );
  const weatherData = await response.json();
  console.log(weatherData);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeather(`${input.value}`);
});

/******/ })()
;