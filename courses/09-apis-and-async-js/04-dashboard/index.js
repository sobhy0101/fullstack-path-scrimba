
// Fetch a random nature image from Unsplash API
try {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const data = await res.json()
    console.log(data.urls.regular)
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById("author").textContent = `By: ${data.user.name}`
} catch (err) {
    console.error("Error fetching image from Unsplash API:", err);
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1475598322381-f1b499717dda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjgzNzcxNjZ8&ixlib=rb-4.1.0&q=80&w=1080)`;
    document.getElementById("author").textContent = `By: John Towner`;
}


// Update time and date every minute
function updateTimeAndDate() {
    const now = new Date();
    document.getElementById("time").textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("date").textContent = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

updateTimeAndDate();
setInterval(updateTimeAndDate, 60000);

// Fetch cryptocurrency data for Dogecoin from CoinGecko API
try {
    const resCoin = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    if (!resCoin.ok) {
        throw Error("Something went wrong")
    }
    const dataCoin = await resCoin.json()
    console.log(dataCoin);
    document.getElementById("crypto-icon").src = dataCoin.image.small;
    document.getElementById("crypto-name").textContent = dataCoin.name;
    document.getElementById("crypto-price").textContent = `Price: $${dataCoin.market_data.current_price.usd.toLocaleString()}`;
    document.getElementById("crypto-high").textContent = `High: $${dataCoin.market_data.high_24h.usd.toLocaleString()}`;
    document.getElementById("crypto-low").textContent = `Low: $${dataCoin.market_data.low_24h.usd.toLocaleString()}`;
} catch (err) {
    console.error("Error fetching cryptocurrency data:", err);
    document.getElementById("crypto-name").textContent = "Error loading data";
    document.getElementById("crypto-icon").src = "";
    document.getElementById("crypto-price").textContent = "";
    document.getElementById("crypto-high").textContent = "";
    document.getElementById("crypto-low").textContent = "";
}


// Get user's current position
navigator.geolocation.getCurrentPosition(async position => {
    console.log(position);

    // Fetch weather data based on user's current position
    try {
        const resWeather = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        if (!resWeather.ok) {
            throw Error("Weather data not available")
        }
        const dataWeather = await resWeather.json()
        console.log(dataWeather);
        document.getElementById("weather-temp").textContent = `${Math.round(dataWeather.main.temp)}°C`;
        const iconId = dataWeather.weather[0].icon;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconId}.png`;
        document.getElementById("weather-city").textContent = dataWeather.name;
    } catch (err) {
        console.error("Error fetching weather data:", err);
        // Keep the placeholder icon if fetch fails
        document.getElementById("weather-temp").textContent = "--°C";
    }
});