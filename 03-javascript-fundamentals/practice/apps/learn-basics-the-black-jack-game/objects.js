// // Objects - store data in-depth - composite / complex data type
// // key-value pairs

// let course = {
//     title: "Learn CSS Grid for free",
//     lessons: 16,
//     creator: "Per Harald Borgen",
//     length: 63,
//     level: 2,
//     isFree: true,
//     tags: ["html", "css", "grid" ],
// }

 
// console.log( course.isFree ); // dot notation
// console.log( course["length"] ); // bracket notation
// console.log( course.title ); // dot notation
// console.log( course.tags[0] ); // bracket notation for array inside object
// console.log( course.tags[1] ); // bracket notation for array inside object
// console.log( course.tags[2] ); // bracket notation for array inside object
// console.log( course.tags ); // dot notation


///////////////////////////////////////////////////////////////////
// Quiz:
// Create an object that represents an airbnb castle listing.
// It should contain at least one boolean, one string, one number, and one array
// Log out at least two of the keys using the dot notation

let castleListing = {
        title: "Live like a King in my Castle",
        guestrooms: 4,
        bathrooms: 1,
        isavailable: true,
        tags: ["castles", "UK", "Europe", ],
        images: ["images/img1.jpg", "images/img2.jpg", "images/img3.jpg", ]
}

console.log("Castle Listing");

console.log( castleListing.title );

console.log( castleListing.guestrooms );

console.log( castleListing.isavailable );

console.log( castleListing.tags )

console.log( castleListing.images )