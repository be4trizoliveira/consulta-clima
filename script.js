const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');

const apiKey = '2a181f190c354dd79a1173734252907';

async function fetchWeather(city) {
    try {
        const lowerCaseName = city.toLowerCase();
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lowerCaseName}&aqi=no&lang=pt`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Cidade '${city}' não encontrada.`);
        }

        const data = await response.json();
        renderWeatherCard(data);

    } catch (error) {
        renderError(error.message);
    }
}

function renderWeatherCard(data) {
    document.getElementById('city-name').textContent = data.location.name + ', ' + data.location.country;
    const [dataTexto, hora] = data.location.localtime.split(' ');
    const [ano, mes, dia] = dataTexto.split('-');
    document.getElementById('local-time').textContent = `Horário Local: ${hora} - ${dia}/${mes}/${ano}`;
    document.getElementById('weather-icon').src = data.current.condition.icon;
    document.getElementById('weather-icon').alt = data.current.condition.text;
    document.getElementById('temperature').textContent = data.current.temp_c + '°C';
    document.getElementById('condition').textContent = data.current.condition.text;
    document.getElementById('feels-like').textContent = data.current.feelslike_c + '°';
    document.getElementById('humidity').textContent = data.current.humidity + '%';
    document.getElementById('wind-speed').textContent = data.current.wind_kph + ' km/h';
    document.getElementById('pressure').textContent = data.current.pressure_mb + ' mb';
    document.getElementById('visibility').textContent = data.current.vis_km + ' km';
    document.getElementById('uv-index').textContent = data.current.uv;

    weatherResult.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

function renderError(message) {
    weatherResult.classList.add('hidden');
    errorMessage.classList.remove('hidden');
    errorMessage.innerHTML = `<p>${message}</p>`;
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    } else {
        renderError('Por favor, digite o nome de uma cidade.');
    }
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});
