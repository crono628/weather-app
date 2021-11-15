const container = document.querySelector('.container');
const results = document.querySelector('.results');
const input = document.querySelector('input');
const forecast = document.querySelector('.forecast');
const form = document.forms[0];
const myRequest = () =>
  `https://api.openweathermap.org/data/2.5/weather?zip=${input.value},us&units=imperial&APPID=53dcc962829731a4fa033950e8997254`;

const moreRequest = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=53dcc962829731a4fa033950e8997254`;

async function getWeather() {
  clearAll(results);
  clearAll(forecast);
  results.innerText = 'LOADING';
  try {
    const response = await fetch(myRequest(), { mode: 'cors' });
    const andThen = await response.json();
    const weather = andThen.main.temp;
    const location = andThen.name;
    results.innerText = forecastUpdate(
      Math.round(weather) + String.fromCharCode(176),
      location
    );
    const geo = await fetch(moreRequest(andThen.coord.lat, andThen.coord.lon), {
      mode: 'cors',
    });
    const geoThen = await geo.json();
    console.log(geoThen.daily);
    for await (let el of geoThen.daily) {
      const a = new Date(el.dt * 1000).getDate();
      const forecastDate = dom(
        'p',
        { classList: 'forecast-date' },
        a,
        forecast
      );
      const b = el.temp.max;
      dom(
        'p',
        { classList: 'forecast-temp' },
        Math.round(b) + String.fromCharCode(176),
        forecastDate
      );
    }
    input.value = '';
  } catch (err) {
    console.error(err);
    results.innerText = 'Invalid Zip Code';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeather();
});

function forecastUpdate(temp, area) {
  results.innerText = '';
  return `It is currently ${temp} in ${area} `;
}

function dom(element, attributes = {}, text, parent) {
  const elem = document.createElement(element);
  if (attributes) {
    Object.assign(elem, attributes);
  }
  if (text) {
    elem.innerText = text;
  }
  if (parent) {
    parent.appendChild(elem);
  }
  return elem;
}

function clearAll(element) {
  element.innerText = '';
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
