import { playlistArr } from './playlist.js'

/*
Challenge
1. Refactor the code below to use .map() 
   instead of the for loop.
   ⚠️ Don't worry about the commas for now.
*/

const playlistHtml = playlistArr.map(item =>
`<section class="card">
    <div class="card-start">
        <img src="./images/${item.albumArt}">
    </div>
        <div class="card-mid">
            <h4 class="card-title">${item.title}</h4>
            <p class="card-artist">${item.artist}</p>
        </div>
    <div class="card-end">
        <p class="card-menu">...</p>
    </div>
</section>
`
)
.join('')

document.getElementById('container').innerHTML = playlistHtml
