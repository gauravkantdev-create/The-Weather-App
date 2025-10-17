const apikey = "596511f85a922e76ed841c39020dacbb";

async function checkWeather() {
  const city = document.getElementById("city-input").value;

  // Construct the API URL with the city value
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`;

  try {
    const response = await fetch(apiurl);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${data.main.temp} °C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity} %`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} m/s`;

    // Set the weather icon based on the weather condition
    const weatherIcon = document.querySelector(".weathericon");
    const weatherId = data.weather[0].id;

    if (weatherId >= 200 && weatherId < 300) {
      weatherIcon.src = "download.png"; // Thunderstorm icon
    } else if (weatherId >= 300 && weatherId < 500) {
      weatherIcon.src = "download drizzle.jpeg"; // Drizzle icon
    } else if (weatherId >= 500 && weatherId < 600) {
      weatherIcon.src = "download (1) rain.png"; // Rain icon
    } else if (weatherId >= 600 && weatherId < 700) {
      weatherIcon.src = "images snow.png"; // Snow icon
    } else if (weatherId >= 700 && weatherId < 800) {
      weatherIcon.src = "download (1)  atmospheric.png"; // Atmosphere (fog, mist, etc.) icon
    } else if (weatherId === 800) {
      weatherIcon.src = "download (1) clear sky.png"; // Clear sky icon
    } else if (weatherId > 800) {
      weatherIcon.src = "download (1) clouds.png"; // Clouds icon
    }
  } catch (error) {
    console.error("Error:", error);
    alert(
      "Failed to fetch weather data. Please check the city name and try again."
    );
  }
}
