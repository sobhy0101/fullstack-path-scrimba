const jobHunter = {
    // name: 'Tom Chant',
    username: 'TChant44',
    workLocation: 'Europe',
    }
    
/*
Challenge:
1. Make it so that if the jobHunter object does not have 
   a name property, the username is used instead.
*/


    
// Complete this line of code 👇
// const jobHunterName = jobHunter.name || jobHunter.username

// In fact, you don't need a const declaration for this challenge,
// you can put the expression directly inside the console.log() 👇

console.log(`Hey ${jobHunter.name || jobHunter.username}!`)