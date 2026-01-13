/**
 * Challenge part 2: Display the image's author
 * 
 * With the data you've already fetched, display the name of the 
 * image author on the page. They show up as the "user" in the data
 * returned from the API.
 * 
 * Don't worry about positioning the author in the lower-left yet.
 */

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=scifi")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
    })

// Update time and date every minute
function updateTimeAndDate() {
    const now = new Date();
    document.getElementById("time").textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("date").textContent = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

updateTimeAndDate();
setInterval(updateTimeAndDate, 60000);