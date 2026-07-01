# 🌦️ WeatherNow

WeatherNow is a responsive weather web application built with **HTML, CSS, and Vanilla JavaScript**. It provides real-time weather information, air quality data, and a 5-day weather forecast using multiple public APIs. The application also supports automatic location detection through the browser's Geolocation API.

---

## ✨ Features

- 🌍 Automatic weather detection using the browser's current location
- 🔍 Search weather by city name
- 🌡️ Current temperature with high and low values
- 🌥️ Weather description with dynamic icons
- 💧 Humidity information
- 💨 Wind speed and wind direction
- 🌿 Air Quality Index (AQI)
- 👀 Visibility status
- 🥵 "Feels Like" temperature
- 📅 5-Day weather forecast
- 📱 Responsive glassmorphism UI

---

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (ES6)
- OpenWeather API
- WAQI API
- Browser Geolocation API
- Font Awesome

---

## 📸 Screenshots

> Add screenshots of:
>
> - Home Screen
> - Search by City
> - 5-Day Forecast
> - AQI Display

---

## ⚙️ APIs Used

### OpenWeather API

Used for:

- Current weather
- Wind
- Humidity
- Visibility
- Coordinates
- 5-day forecast
- Air Pollution Index

### WAQI API

Used for displaying the actual AQI value based on the user's coordinates.

---

## 📂 Project Structure

```
WeatherNow/
│
├── index.html
├── logo.png
├── README.md
└── assets/
```

---

## 🚀 How It Works

### Search by City

1. User enters a city name.
2. OpenWeather Current Weather API fetches weather data.
3. Coordinates from the response are used to request:
   - AQI data
   - 5-Day Forecast
4. The webpage updates dynamically without refreshing.

### Current Location

1. Browser requests location permission.
2. Latitude and longitude are obtained using the Geolocation API.
3. Weather information is fetched automatically for the user's location.

---

## 📚 Concepts Practiced

This project helped me learn and practice:

- Working with REST APIs
- Fetch API
- Promises
- DOM Manipulation
- Event Handling
- Browser Geolocation
- Responsive Web Design
- Array methods (`filter()`, `forEach()`)
- Dynamic HTML generation
- Code refactoring using reusable functions

---

## 🚧 Challenges

Some interesting challenges during development included:

- Understanding the difference between OpenWeather's AQI scale (1–5) and WAQI's actual AQI values.
- Learning how to extract one forecast per day from OpenWeather's 3-hour forecast data.
- Integrating multiple APIs into a single application.
- Handling browser location permissions and invalid city searches.
- Organizing the JavaScript code to reduce repetition and improve readability.

---

## 🔮 Future Improvements

- Hourly Forecast
- Weather Maps
- Dark Mode
- Sunrise & Sunset
- UV Index
- Favorite Cities
- Weather Alerts
- Progressive Web App (PWA)
- Unit Conversion (°C/°F)

---

## ▶️ Getting Started

1. Clone the repository.

```
git clone https://github.com/yourusername/WeatherNow.git
```

2. Open `index.html`.

3. Replace the API keys with your own:

- OpenWeather API Key
- WAQI API Token

4. Run using Live Server or any local server.

---

## 👨‍💻 Author

**Ayush**

This project was developed as part of my frontend learning journey to strengthen my understanding of JavaScript, API integration, asynchronous programming, and responsive UI design.
