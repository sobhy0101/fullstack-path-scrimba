let count = 0;
let increaseCounter = document.getElementById("inc");
let decreaseCounter = document.getElementById("dec");
let resetCounter = document.getElementById("reset");
let counterDisplay = document.getElementById("count");

counterDisplay.innerText = count;

function increaseFunction() {
    count++;
    counterDisplay.innerText = count;
    console.log(count);
}

function decreaseFunction() {
    count--;
    if (count < 0) {
        count = 0;
    }
    counterDisplay.innerText = count;
    console.log(count);
}

function resetFunction() {
    count = 0;
    counterDisplay.innerText = count;
    let lightShade = "#6d6d6db9";
    document.getElementsByClassName("card")[0].style.backgroundColor = lightShade;
    console.log(count);
}

// Attach event listeners
increaseCounter.addEventListener("click", increaseFunction);
decreaseCounter.addEventListener("click", decreaseFunction);
resetCounter.addEventListener("click", resetFunction);