let valueInput = document.getElementById("valueInput");
let convertBtn = document.getElementById("convertBtn");
let lengthResult1 = document.getElementById("lengthResult1");
let lengthResult2 = document.getElementById("lengthResult2");
let volumeResult1 = document.getElementById("volumeResult1");
let volumeResult2 = document.getElementById("volumeResult2");
let massResult1 = document.getElementById("massResult1");
let massResult2 = document.getElementById("massResult2");
let resetBtn = document.getElementById("resetBtn");


resetBtn.addEventListener("click", function() {
    valueInput.value = "";
    lengthResult1.textContent = "";
    volumeResult1.textContent = "";
    massResult1.textContent = "";
    lengthResult1.textContent = "";
    volumeResult1.textContent = "";
    massResult1.textContent = "";
});

function convertUnits() {
    let inputValue = parseFloat(valueInput.value);
    if (isNaN(inputValue)) {
        alert("Please enter a valid number");
        return;
    }

    // Length conversion (meters to feet)
    let lengthInFeet = inputValue * 3.28084;
    lengthResult1.textContent = `${inputValue} meters = ${lengthInFeet.toFixed(2)} feet`;

    // Volume conversion (liters to gallons)
    let volumeInGallons = inputValue * 0.264172;
    volumeResult1.textContent = `${inputValue} liters = ${volumeInGallons.toFixed(2)} gallons`;

    // Mass conversion (kilograms to pounds)
    let massInPounds = inputValue * 2.20462;
    massResult1.textContent = `${inputValue} kilograms = ${massInPounds.toFixed(2)} pounds`;
}

convertBtn.addEventListener("click", convertUnits);
