import { tweetsData } from './data.js'

const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')
// const feedElement = document.getElementById('feed')

tweetBtn.addEventListener('click', function(){
    console.log(tweetInput.value);
})

function getFeedHtml(){
    let feedHtml = ``

    /*
Challenge:
1. Replace the for of with a forEach.
*/

    tweetsData.forEach(function(tweet){
        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            ${tweet.replies.length} 
                        </span>
                        <span class="tweet-detail">
                            ${tweet.likes} 
                        </span>
                        <span class="tweet-detail">
                            ${tweet.retweets} 
                        </span>
                    </div>   
                </div>            
            </div>
        </div>
        `
    })
    return feedHtml
}

// feedElement.innerHTML = getFeedHtml()

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
/*
Challenge:
1. Take control of the ‘feed’ div.
2. Render the HTML returned by the getFeedHtml 
   function to the 'feed' div. 
   See if you can do this with just one line of code!
*/
}
render();
// call render
