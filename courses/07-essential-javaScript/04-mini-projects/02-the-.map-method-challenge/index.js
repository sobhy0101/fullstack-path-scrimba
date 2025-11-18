import { playlistArr } from './playlist.js'



// const playlistHtml = playlistArr.map(function (track) {
//     return `
// <section class="card">
//     <div class="card-start">
//         <img src="images/${track.albumArt}">
//     </div>
//         <div class="card-mid">
//             <h4 class="card-title">${track.title}</h4>
//             <p class="card-artist">${track.artist}</p>
//         </div>
//     <div class="card-end">
//         <p class="card-menu">...</p>
//     </div>
// </section>
// `
// })
// .join('')

// Using the old for each loop
// 
// const playlistHtml = []
// for (let i = 0; i < playlistArr.length; i++) {
//     playlistHtml.push(
// `<section class="card">
//     <div class="card-start">
//         <img src="/images/${playlistArr[i].albumArt}">
//     </div>
//         <div class="card-mid">
//             <h4 class="card-title">${playlistArr[i].title}</h4>
//             <p class="card-artist">${playlistArr[i].artist}</p>
//         </div>
//     <div class="card-end">
//         <p class="card-menu">...</p>
//     </div>
// </section>
//     `
//     )
// }


// Create the playlist using forEach loop
const playlistHtml = []

playlistArr.forEach(function (track) {
    playlistHtml.push(
`<section class="card">
    <div class="card-start">
        <img src="/images/${track.albumArt}">
    </div>
        <div class="card-mid">
            <h4 class="card-title">${track.title}</h4>
            <p class="card-artist">${track.artist}</p>
        </div>
    <div class="card-end">
        <p class="card-menu">...</p>
    </div>
</section>
    `
    )
})

document.getElementById('container').innerHTML = playlistHtml.join('')


// Use .map() if you want to return a new array based on an existing array
// Use .forEach() if you just want to loop through an array without returning a new array
