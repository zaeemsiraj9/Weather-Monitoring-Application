document.getElementById('searchBtn').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '0c9111ea93df40039999aff74ec61d69'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
}

function displayWeather(data) {
    const weatherDetails = document.getElementById('weatherDetails');
    weatherDetails.innerHTML = `
        <div class="weather-detail">City: ${data.name}</div>
        <div class="weather-detail">Temperature: ${data.main.temp} °C</div>
        <div class="weather-detail">Weather: ${data.weather[0].description}</div>
        <div class="weather-detail">Humidity: ${data.main.humidity}%</div>
    `;
}

function fetchCitySuggestions() {
    const input = document.getElementById('city').value;
    const suggestionsContainer = document.getElementById('suggestions');

    if (input.length < 2) {
        suggestionsContainer.innerHTML = '';
        return;
    }

    const username = 'zaeemsiraj9'; // Replace with your actual GeoNames username
    const url = `https://secure.geonames.org/searchJSON?name_startsWith=${input}&maxRows=10&username=${username}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const suggestions = data.geonames;
            suggestionsContainer.innerHTML = '';
            suggestions.forEach(city => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = `${city.name}, ${city.countryName}`;
                div.addEventListener('click', () => {
                    document.getElementById('city').value = city.name;
                    suggestionsContainer.innerHTML = '';
                    getWeather(); // Fetch the weather data for the selected city
                });
                suggestionsContainer.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error fetching city suggestions:', error);
        });
}
