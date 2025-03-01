const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "5fab712cfa30ec360b7a1217146ba0c0";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.getElementById("js-card");


async function checkWhether(city) {
    if (!city) {
        setTimeout(() => {
            alert("Please enter your city name");
        }, 1000);
        return;
    }
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "weatherImages/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "weatherImages/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "weatherImages/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "weatherImages/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "weatherImages/mist.png";
        }
        const weatherType = data.weather[0].main;

        if (weatherType == "Clouds") {
            card.style.backgroundImage = "url('weatherImages/clouds-img.jpg')";
        }
        else if (weatherType == "Clear") {
            card.style.backgroundImage = "url('weatherImages/clear-img.jpg')";
        }
        else if (weatherType == "Rain") {
            card.style.backgroundImage = "url('weatherImages/rain-img.webp')";
            card.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
            card.style.backgroundBlendMode = "overlay";
        }
        else if (weatherType == "Haze") {
            card.style.backgroundImage = "url('weatherImages/haze-img.jpg')";
        }
        else if (weatherType == "Drizzle") {
            card.style.backgroundImage = "url('weatherImages/drizzle-img.jpg')";
        }
        else if (weatherType == "Snow") {
            card.style.backgroundImage = "url('weatherImages/snow-img.webp')";
        }
        else if (weatherType == "Mist") {
            card.style.backgroundImage = "url('weatherImages/mist-img.jpg')";
        }
        else {
            card.style.background = "linear-gradient(135deg, #cc0000 0%, #990000 50%, #cc0000 100%)";
        }
    } catch (error) {
        console.log("Error:", error.message);
        setTimeout(() => {
            alert("Invalid City Name or Network Error");
        }, 1000)
    }


    document.querySelector(".weather-img").style.display = "block";
    document.querySelector(".weather-img").style.transition = "0.3s ease-in-out";
}

checkWhether();

searchBtn.addEventListener("click", () => {
    checkWhether(searchBox.value);
    searchBox.style.backgroundColor = "rgba(255, 223, 186, 0.3)";
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
        searchBtn.style.backgroundColor = "rgba(255, 223, 186, 0.4)";
    }
});


