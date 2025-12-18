document.getElementById("get-activity").addEventListener("click", function() {
  fetch("https://apis.scrimba.com/bored/api/activity")
    .then(response => response.json())
    .then(data => {
        document.getElementById("title").textContent = "🦾 HappyBot🦿"
        document.getElementById("activity").textContent = data.activity
        document.querySelector("main").classList.add("fun")
    })
})