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
        /**
         * Challenge: get a URL for a default background image and set it here
         * 
         * 1. Change the query in the URL above back to something real ✅
         * 2. Log the image url to the console (replacing console.log(data) above) ✅
         * 3. Use that URL as the "default" background image to be used if 
         *    the promise is ever rejected.
         */
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

/**
Challenge: Get current data on a cryptocurrency from the list below
    * bitcoin
    * dogecoin
    * ethereum
    * litecoin

1. Search the API docs for an endpoint that will 
   get you the "current data for a coin"
   (https://www.coingecko.com/api/documentations/v3#/)

2. Execute a test request from the API docs and skim through 
   the data for anything that you may find interesting to use
   in the dashboard
*/
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.getElementById("crypto-icon").src = data.image.small;
        document.getElementById("crypto-name").textContent = data.name;
        document.getElementById("crypto-price").textContent = `USD Exchange rate: $${data.market_data.current_price.usd.toLocaleString()}`;
        document.getElementById("crypto-change").textContent = `Last 24h: ${data.market_data.price_change_percentage_24h.toFixed(2)}%`;
    })
    .catch(err => {
        console.error("Error fetching cryptocurrency data:", err);
        document.getElementById("crypto-name").textContent = "Error loading data";
        document.getElementById("crypto-icon").src = "";
        document.getElementById("crypto-price").textContent = "";
        document.getElementById("crypto-change").textContent = "";
    });