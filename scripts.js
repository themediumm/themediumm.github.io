function searchWeather() {
    const apiKey = '7b096067e0b66b2ff4701ef281abce27'; // Replace with your OpenWeatherMap API key
    const city = document.getElementById('search').value;

    if (city.trim() === '') {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetchWeather(apiUrl);
}
const apiKey = '7b096067e0b66b2ff4701ef281abce27';

function fetchWeather(apiUrl) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found. Please enter a valid city name.');
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    document.getElementById('city').innerText = data.name;
    document.getElementById('icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">`;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('temperature').innerText = `${data.main.temp} °C`;
}

function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
                fetchWeather(apiUrl);
            },
            error => {
                console.error('Error getting location:', error);
                alert('Unable to retrieve your location. Please enter a city name manually.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser. Please enter a city name manually.');
    }
}

// Add event listener to the search button
document.getElementById('search').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchWeather();
    }
});

// Add event listener to the auto-detect button
document.getElementById('autoDetect').addEventListener('click', getCurrentLocationWeather);
