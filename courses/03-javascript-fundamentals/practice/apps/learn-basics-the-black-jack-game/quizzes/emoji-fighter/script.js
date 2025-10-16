// My answer using AI to generate random emojis for a fighting game 😒
// Failed to do it without AI help 😭
// I am a bit ashamed of it but I will try to learn from it
let fighters = ["🐉", "🐥", "🐊","💩", "🦍", "🐢", "🐩", "🦭", "🦀", "🐝", "🤖", "🐘", "🐸", "🕷","🐆", "🦕", "🦁"]

let stageEl = document.getElementById("stage")
let fightButton = document.getElementById("fightButton")

fightButton.addEventListener("click", function() {
//     // Challenge:
//     // When the user clicks on the "Pick Fighters" button, pick two random 
//     // emoji fighters and display them as i.e. "🦀 vs 🐢" in the "stage" <div>.
//     let randomIndex1 = Math.floor(Math.random() * fighters.length);
//     let randomIndex2 = Math.floor(Math.random() * fighters.length);
//     stageEl.textContent = fighters[randomIndex1] + " vs " + fighters[randomIndex2];
// });


// // The answer provided by the course
// fightButton.addEventListener("click", function() {
//     // Challenge:
//     // When the user clicks on the "Pick Fighters" button, pick two random 
//     // emoji fighters and display them as i.e. "🦀 vs 🐢" in the "stage" <div>.
//     let randomIndexOne = Math.floor( Math.random() * fighters.length )
//     let randomIndexTwo = Math.floor( Math.random() * fighters.length )
//     stageEl.textContent = fighters[randomIndexOne] + " vs " + fighters[randomIndexTwo]
// })

let mixedNumberOnes = Math.floor(Math.random() * fighters.length);
let mixedNumberTowes = Math.floor(Math.random() * fighters.length);
stageEl.textContent = fighters[mixedNumberOnes] + " VS " + fighters[mixedNumberTowes];
})