const search = document.querySelector(".Search");
const apikey = "7c49ac95fc82605c796707d9c2a1af41";
let clockint;
let city;

function getWindDirection(degree) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    // Divide by 45 degrees, round it, and wrap it within the array length
    const index = Math.round(degree / 45) % 8;
    return directions[index];
}

function getVisibilityStatus(visibilityInMeters) {
    if (visibilityInMeters >= 5000) {
        return "Clear";
    } else if (visibilityInMeters >= 2000) {
        return "Moderate";
    } else if (visibilityInMeters >= 1000) {
        return "Poor";
    } else {
        return "Very Poor"; // Usually means heavy fog
    }
}

function getFeelsLikeStatus(temp) {
    if (temp >= 32) {
        return "Very Hot";
    } else if (temp >= 25) {
        return "Hot";
    } else if (temp >= 20) {
        return "Warm";
    } else if (temp >= 10) {
        return "Cool";
    } else if (temp >= 0) {
        return "Cold";
    } else {
        return "Freezing";
    }
}

function weather(url, apikey) {

    search.value = "";

    fetch(url).then((response) => response.json()).then((data) => {
        if (data.cod != 200) {
            alert("City not found")
            return;
        }
        console.log(data)
        const desc = data.weather[0].description;
        document.querySelector(".weather-disc").textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
        document.querySelector(".cel").textContent = `${Math.round(data.main.temp)}°`;
        document.querySelector(".city-name").innerHTML = `<i class="fa-solid fa-location-dot" style="color:rgb(62, 145, 177)"></i> ` + data.name + "," + data.sys.country;
        document.querySelector(".hi").textContent = `${Math.round(data.main.temp_max)}°`;
        document.querySelector(".low").textContent = `${Math.round(data.main.temp_min)}°`;
        document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
        const lon = data.coord.lon;
        const lat = data.coord.lat;
        const aqiqurl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`;
        const token = "1d9d95643863cddd57313445e5144b409d226be6";
        const aqiurl = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`;

        fetch(aqiurl).then((response) => response.json()).then((aqiData) => {
            const aqi = aqiData.data.aqi;

            document.querySelector(".aqi").textContent = aqi;
        });

        fetch(aqiqurl).then((response) => response.json()).then((aqiqData) => {
            const aqi = aqiqData.list[0].main.aqi;
            const qualities = ["", "Good", "Moderate", "Poor", "Unhealthy", "Hazardous"];
            document.querySelector(".quality").textContent = qualities[aqi];
        });

        document.querySelector(".wind").textContent = `${data.wind.speed}m/s`;
        document.querySelector(".dir").textContent = getWindDirection(data.wind.deg);
        document.querySelector(".like").textContent = `${Math.round(data.main.feels_like)}°`;
        document.querySelector(".feels").textContent = getFeelsLikeStatus(Math.round(data.main.feels_like))
        document.querySelector(".visibility").textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        document.querySelector(".visible").textContent = getVisibilityStatus(data.visibility);

        //5 days forecast
        const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
        fetch(forecasturl).then((response) => response.json()).then((forecastdata) => {
            const dailyforecast = forecastdata.list.filter(item => item.dt_txt.includes("12:00:00"))
            // const time=
            const daycards = document.querySelectorAll(".days")
            dailyforecast.forEach((day, index) => {
                const date = new Date(day.dt_txt);
                const weekday = date.toLocaleDateString("en-us", {
                    weekday: "short"
                });
                const icon = day.weather[0].icon;
                const temp = Math.round(day.main.temp)
                daycards[index].innerHTML = `
                                  <span class="weekdays">${weekday}</span>
                                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" style="height: clamp(0.4rem,7vw,4.5rem);width: clamp(0.4rem,7vw,4.5rem);">
                                  <p class="weektemp">${temp}°C</p>`;
            });
        })

        const timezone = data.timezone;
        const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;

        let cityTime = new Date(utc + timezone * 1000);

        const hour = cityTime.getHours();
        if (hour >= 5 && hour < 11) {

            document.body.style.backgroundImage =
                "url('sunrise.jpeg')";

        }
        else if (hour >= 11 && hour < 17) {

            document.body.style.backgroundImage =
                "url('wallpaper-edited.jpeg')";

        }
        else if (hour >= 17 && hour < 20) {

            document.body.style.backgroundImage =
                "url('sunset.jpeg')";

        }
        else {

            document.body.style.backgroundImage =
                "url('https://wallpaperaccess.com/full/941788.jpg')";

        }
        // let clockint;
        clearInterval(clockint);
        clockint = setInterval(() => {
            const utc = Date.now() + new Date().getTimezoneOffset() * 60000;
            cityTime = new Date(utc + timezone * 1000);
            document.querySelector(".timecon").innerHTML = `${cityTime.toLocaleTimeString()}`;
        }, 1000);
    });

}
search.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        city = search.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
        weather(url, apikey);
    }
});
window.addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url =
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;

            weather(url, apikey);

        },
        (err) => {

            alert("Location access denied");
        }
    )
})

