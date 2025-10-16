const user = {
    name: "Mike",
    age: 16,
    weight: 65,
    city: ["Cairo, Egypt", "Manila, Philippines", "Dubai, UAE"],
    greet: function() {
        console.log("Hello, my name is " + user.name + " 😁");
    }
};

// console.log(user.name);  // Output: Mike
// console.log(user.age);  // Output: 16
// // console.log(user.city[0]);  // Output: Cairo, Egypt
// // console.log(user.city[1]);  // Output: Manila, Philippines
// // console.log(user.city[2]);  // Output: Dubai, UAE
// user.greet();  // Output: Hello, my name is Mike 😁

for ( let i = 0; i < user.city.length; i++ ) {
    // console.log(user.city[i]);
}

// if ( user.age >= 18 ) {
//     console.log("You're an adult 💪🏻")
// } else {
//     console.log("You're are not yet an adult 👶🏻")
// }

// if ( user.weight >= 70) {
//     console.log("You're overweight")
// } else {
//     console.log("Your weight is average")
// }

for ( let i = 0; i < user.city.length; i++ ) {
    if ( user.city[i].includes("Egypt") ) {
        console.log( user.city[i] + " is in Africa" );
    } else {
        console.log(user.city[i]);
    }
}

function greetUser(name) {
    console.log( "Hello, " + name + "!" + " Welcome to quiz tasks with Grok AI" )
}

greetUser("Mike Sobhy")

user.city.push("London, UK")
console.log(user.city)