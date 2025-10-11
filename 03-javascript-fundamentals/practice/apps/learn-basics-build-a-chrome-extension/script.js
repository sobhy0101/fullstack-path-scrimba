import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js"
import { getDatabase,
        ref,
        set,
        push,
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://lead-tracker-6e34d-default-rtdb.europe-west1.firebasedatabase.app/"
}

const leadsApp = initializeApp(firebaseConfig)
const myDataBase = getDatabase(leadsApp)
const referenceInDB = ref(myDataBase, "leads")

const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.querySelector("#delete-btn")

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
        if ( !leads[i].startsWith("https://") && !leads[i].startsWith("https://") ) {
            leads[i] = "https://" + leads[i]
        }
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    🏷️${leads[i]}
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