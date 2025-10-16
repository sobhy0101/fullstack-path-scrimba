import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js"
import { getDatabase,
        ref,
        set,
        push,
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://lead-tracker-6e34d-default-rtdb.europe-west1.firebasedatabase.app/",
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    } else {
        ulEl.innerHTML = `
            <li>
                No leads saved yet
            </li>
        `
    }
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        if (!leads[i].startsWith("http://") && !leads[i].startsWith("https://")) {
            leads[i] = "https://" + leads[i]
        }
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                  🔲  ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})

inputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        push(referenceInDB, inputEl.value)
        inputEl.value = ""
    }
})

// ///////////// Template Strings Quiz /////////////

// // template strings/literals

// const recipient = "James"
// const sender = "Mike"

// const email = `
// Hey ${recipient}!

// How is it going?

// Cheers ${sender}
// `

// console.log(email)

////////////////////////////////////////////////////////////////

// // If possible, use const. If not, use let.

// // Which variables below should be changed from let to const?

// // The customer wants to order some stuff. Here are the details:
// const basePrice = 520
// const discount = 120
// let shippingCost = 12
// let shippingTime = "5-12 days"

// // Whops! Turns out the shipping will be a bit more complex
// shippingCost = 15
// shippingTime = "7-14 days"

// // Calculating the full price
// const fullPrice = basePrice - discount + shippingCost

// // Finally, notifying the customer
// console.log("Total cost: " + fullPrice + ". It will arrive in " + shippingTime)



// ///////////// To edit the HTML elements using the DOM innerHTML with a single string containing the entire HTML element (opening tag, content, closing tag) and assign it to innerHTML  /////////////
// const container = document.getElementById("container")

// container.innerHTML = "<button>Buy!</button>" // adds a button inside the container div
// ////////////////////////////////////////////////////////////////

// // To maintain the previous HTML and add new HTML, use += instead of = | Otherwise, it will overwrite the previous HTML
// 
// const container = document.getElementById("container")

// container.innerHTML = "<button onclick='buy()'>Buy!</button>"

// // When clicked, render a paragraph under the button (in the container)
// // that says "Thank you for buying!"

// function buy() {
//     container.innerHTML = "<button onclick='buy()'>Buy!</button>" + "<p>Thank you for buying!</p>" // With this code, the button will remain after clicking it because we are overwriting the entire innerHTML of the container div
//     container.innerHTML += "<p>Thank you for buying!</p>" // With this code, the button will disappear after clicking it because we are adding a new paragraph to the existing innerHTML of the container div
//}

///////////////////  Local Storage ////////////////////////


// localStorage.setItem("My Leads", "www.google.com") // saves the key-value pair in localStorage
// let name = localStorage.getItem("My Leads") // retrieves the value from localStorage using the key
// console.log(name)

// localStorage.clear() // clears localStorage

///////////////////// End of Local Storage ///////////////////////////

///////////////////// Truthy and Falsy ///////////////////////////
// truthy
// falsy

///////////////////// Falsy values ///////////////////////////
// false      // The Boolean value false
// 0          // The number zero
// ""         // An empty string
// null       // Explicitly no value (developer sets)
// undefined  // Variable declared but not assigned (JS sets)
// NaN        // Not a Number (invalid numeric operation)

////////////////// Quiz on Falsy values ///////////////////////////
// console.log(  Boolean("")   ) // false
// console.log(  Boolean("0")  ) // true
// console.log(  Boolean(100)  ) // true
// console.log(  Boolean(null) ) // false
// console.log(  Boolean([0])  ) // true
// console.log(  Boolean(-0)   ) // false

///////////////////// End of Truthy and Falsy ///////////////////////////

///////////////////// Firebase Realtime Database ///////////////////////////

// To write data to the database, we use the set() function along with a reference to the location in the database where we want to store the data. The ref() function is used to create this reference.

// Example: Writing data to the database

// const testRef = ref(database, "test")
// set(testRef, {
//     message: "Hello World!",
//     message2: "Hello World Again!",
//     test: 12 / 2,
// })

// const addToDB = ref(database, "messages")
// set(addToDB, {
//     message: "Hello World!",
//     message2: "Hello World Again!",
//     test: 12 / 2,
// })
// .then(() => {
//     console.log("Data uploaded successfully!")
//     console.log("testRef key:", testRef.key) // Logs the key of the reference
// })
// .catch((error) => {
//     console.error("Upload failed:", error)
// })

// ////////////////// Turn an object into an array ///////////////////////////
// const loginCredentials = {
//     "rafidhoda": "BestPassword123",
//     "shahrukhkhan": "InBigCitiesSmallThingsHappen",
//     "jackblack": "ThisIsNotTheGreatestPasswordInTheWorld"
// }

// console.log(Object.keys(loginCredentials)) // Gets all the keys of the object and returns them as an array
// console.log(Object.values(loginCredentials)) // Gets all the values of the object and returns them as an array
// console.log(Object.entries(loginCredentials)) // Gets all the key-value pairs of the object and returns them as an array of arrays

// ///////////////////// End of turning an object into an array ///////////////////////////