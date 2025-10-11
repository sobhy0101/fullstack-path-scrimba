// Quiz 7: Rounding Numbers
// Challenge:
// Round the price in the button down to two decimal places.
// Don't know which method to use? Google it!

const totalPrice = "420.69235632455"
const btn = document.getElementById("purchase-btn")
// My answer:
// Math.floor(totalPrice * 100) / 100 truncates the value to two decimals,
// but may display only one decimal if the result ends with zero (e.g., 420.60 becomes 420.6).
// This is not ideal for currency, which should always show two decimals.
// btn.textContent = `Buy €${ Math.floor(totalPrice *100) /100 }`

// Instructor's answer:
// totalPrice.toFixed(2) always returns a string with exactly two decimal places,
// making it the preferred method for displaying currency values.

// Quiz 8:
// The toFixed() method doesn't work anymore. Can you make it work?
// Google the error message if you're unsure about how to do it
btn.textContent = `Buy €${ Number(totalPrice).toFixed(2) }`