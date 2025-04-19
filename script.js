function getEmoji(condition) {
    condition = condition.toLowerCase();
    if (condition.includes("Nublado")) return "☁️";
    if (condition.includes("Chuva")) return "🌧️";
    if (condition.includes("Céu Limpo")) return "☀️";
    if (condition.includes("Neve")) return "❄️";
    if (condition.includes("Trovoada")) return "⛈️";
    if (condition.includes("Nuvens Dispersas")) return "🌥️";
    if (condition.includes("Névoa") || condition.includes("Neblina")) return "🌫️";
    return "🌡️"; 
  }

  async function getWeather() {
    const apiKey = '7b662c83e1e0955cd03381278dd96c7b';
    const city = document.getElementById('cityInput').value.trim();
    const errorText = document.getElementById('error');
    const panel = document.getElementById('weatherPanel');
    const backgroundDefault = document.getElementById('backgroundDefault');
    const backgroundWeather = document.getElementById('backgroundWeather');

    if (!city) {
      errorText.textContent = 'Digite o nome da cidade.';
      panel.classList.add('hidden');
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      );

      if (!res.ok) throw new Error("Cidade não encontrada.");

      const data = await res.json();
      const description = data.weather[0].description;

      document.getElementById('cityName').textContent = data.name;
      document.getElementById('temperature').textContent = `${data.main.temp.toFixed(1)} °C`;
      document.getElementById('condition').textContent = description;
      document.getElementById('humidity').textContent = `${data.main.humidity}%`;
      document.getElementById('minTemp').textContent = `${data.main.temp_min.toFixed(1)} °C`;
      document.getElementById('maxTemp').textContent = `${data.main.temp_max.toFixed(1)} °C`;
      document.getElementById('wind').textContent = `${data.wind.speed} km/h`;
      document.getElementById('weatherEmoji').textContent = getEmoji(description);

      document.getElementById('cityInput').value = `${data.name}`;

      // Mudar fundo
      backgroundDefault.classList.add('hidden');
      backgroundWeather.classList.remove('hidden');

      panel.classList.remove('hidden');
      errorText.textContent = '';
    } catch (err) {
      panel.classList.add('hidden');
      errorText.textContent = err.message;
    }
  }