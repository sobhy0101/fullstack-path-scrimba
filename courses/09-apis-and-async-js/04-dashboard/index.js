/* eslint-disable no-unused-vars */

// Fetch a random nature image from Unsplash API
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        console.log(data.urls.regular)
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        console.error("Error fetching image from Unsplash API:", err);
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1475598322381-f1b499717dda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjgzNzcxNjZ8&ixlib=rb-4.1.0&q=80&w=1080)`;
        document.getElementById("author").textContent = `By: John Towner`;
    })


// Update time and date every minute
function updateTimeAndDate() {
    const now = new Date();
    document.getElementById("time").textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("date").textContent = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

updateTimeAndDate();
setInterval(updateTimeAndDate, 60000);

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.getElementById("crypto-icon").src = data.image.small;
        document.getElementById("crypto-name").textContent = data.name;
        document.getElementById("crypto-price").textContent = `Price: $${data.market_data.current_price.usd.toLocaleString()}`;
        document.getElementById("crypto-high").textContent = `High: $${data.market_data.high_24h.usd.toLocaleString()}`;
        document.getElementById("crypto-low").textContent = `Low: $${data.market_data.low_24h.usd.toLocaleString()}`;
    })
    .catch(err => {
        console.error("Error fetching cryptocurrency data:", err);
        document.getElementById("crypto-name").textContent = "Error loading data";
        document.getElementById("crypto-icon").src = "";
        document.getElementById("crypto-price").textContent = "";
        document.getElementById("crypto-high").textContent = "";
        document.getElementById("crypto-low").textContent = "";
    });


// Get user's current position
navigator.geolocation.getCurrentPosition(position => {
    console.log(position);
    
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.getElementById("weather-temp").textContent = `${Math.round(data.main.temp)}°C`;
            const iconId = data.weather[0].icon;
            document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconId}.png`;
        })
        .catch(err => {
            console.error("Error fetching weather data:", err);
        });
});

/**
 * Challenge: Display the weather icon as an <img />
 * inside the <div id="weather">
 * 
 * This site shows an example URL for the icon:
 * https://openweathermap.org/weather-conditions
 * 
 * Note: the weather icon is found instead data.weather, which is
 * an array of weather for that area. You can just access the first
 * item in that array to get the icon ID.
 */