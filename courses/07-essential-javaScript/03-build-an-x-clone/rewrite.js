import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@13.0.0/+esm'

document.addEventListener('click', function (e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick()
    }
})

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--
    }
    else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]
    
    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    }
    else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick() {
    const tweetInput = document.getElementById('tweet-input')
    const tweetText = tweetInput.value

    if (tweetText) {
        const newTweet = {
            handle: '@Scrimba',
            profilePic: 'images/scrimbalogo.png',
            tweetText: tweetText,
            likes: 0,
            retweets: 0,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        }
        
        tweetsData.unshift(newTweet)
        render()
    }
    tweetInput.value = ''
}
