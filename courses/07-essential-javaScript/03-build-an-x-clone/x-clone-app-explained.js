/*
 * X CLONE APP - DETAILED EXPLANATION
 * This file contains a fully commented version of the X (Twitter) clone application
 * to help understand every line of code and how different parts work together.
 */

// ============================================================================
// IMPORTS AND DEPENDENCIES
// ============================================================================

// Import the tweets data array from the data.js file
// This is ES6 module syntax - allows us to import specific exports from other files
import { tweetsData } from './data.js'

// Import the v4 function from the UUID library and rename it to 'uuidv4'
// This is loaded from a CDN (Content Delivery Network) - no local installation needed
// The 'esm-browser' version is specifically for use in the browser with ES modules
// UUID v4 generates random unique identifiers (e.g., '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.1/dist/esm-browser/index.js'

// ============================================================================
// DOCUMENT-WIDE EVENT LISTENER (Event Delegation Pattern)
// ============================================================================

/*
 * This is a DOCUMENT EVENT LISTENER - a best practice pattern in JavaScript
 * 
 * Why attach the listener to the document instead of individual elements?
 * 1. Performance: One listener instead of potentially hundreds (one per button/icon)
 * 2. Dynamic elements: Works for elements that don't exist yet when the page loads
 * 3. Memory efficiency: Uses less memory than multiple individual listeners
 * 4. Simplicity: Centralized event handling in one place
 * 
 * How it works:
 * - When you click anywhere on the page, this function runs
 * - We check what was clicked using e.target (the actual element clicked)
 * - We use data attributes (data-like, data-retweet, etc.) to identify actions
 * - This is called "Event Delegation" - the parent handles events for children
 */
document.addEventListener('click', function (e) {
    // Check if the clicked element has a 'data-like' attribute
    // data-like stores the tweet's UUID, allowing us to identify which tweet was liked
    if (e.target.dataset.like) {
        // Call the like handler and pass the tweet ID from the data attribute
        handleLikeClick(e.target.dataset.like)
    }
    // Check if the clicked element has a 'data-retweet' attribute
    else if (e.target.dataset.retweet) {
        // Call the retweet handler with the tweet ID
        handleRetweetClick(e.target.dataset.retweet)
    }
    // Check if the clicked element has a 'data-reply' attribute
    else if (e.target.dataset.reply) {
        // Call the reply handler with the tweet ID
        handleReplyClick(e.target.dataset.reply)
    } 
    // Check if the clicked element is the main tweet button (using its ID)
    else if (e.target.id === 'tweet-btn') {
        // Call the function to create and post a new tweet
        handleTweetBtnClick()
    }
})

// ============================================================================
// LIKE HANDLING FUNCTION
// ============================================================================

/*
 * Handles the logic when a user clicks the like button on a tweet
 * This function demonstrates several important concepts:
 * - Array filtering to find specific objects
 * - Boolean toggling with the NOT operator (!)
 * - Conditional incrementing/decrementing
 */
function handleLikeClick(tweetId) {
    // FILTER METHOD EXPLANATION:
    // filter() creates a NEW array containing elements that pass a test
    // It loops through each tweet in tweetsData and keeps only matching ones
    // 
    // Here's what happens:
    // 1. filter() checks each tweet in the array
    // 2. For each tweet, it runs the function and checks if tweet.uuid === tweetId
    // 3. If true, that tweet is included in the new array
    // 4. If false, that tweet is excluded
    // 5. [0] at the end gets the first (and only) element from the filtered array
    //
    // Why use filter()[0] instead of find()?
    // - This is one approach; find() would be more semantic here
    // - filter() returns an array, so we use [0] to get the object
    // - find() would return the object directly
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]

    // Check if the tweet is already liked
    // This determines whether we're liking or unliking
    if (targetTweetObj.isLiked) {
        // If already liked, decrease the like count
        targetTweetObj.likes--
    }
    else {
        // If not liked, increase the like count
        targetTweetObj.likes++
    }
    
    // BOOLEAN TOGGLING WITH THE NOT OPERATOR (!)
    // This is a concise way to switch a boolean value
    // If isLiked is true, !targetTweetObj.isLiked becomes false
    // If isLiked is false, !targetTweetObj.isLiked becomes true
    // This replaces the need for: isLiked = isLiked ? false : true
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    
    // Re-render the entire feed to show the updated like count and icon state
    // This updates the DOM to reflect the data changes
    render()
}

// ============================================================================
// RETWEET HANDLING FUNCTION
// ============================================================================

/*
 * Handles the logic when a user clicks the retweet button
 * This follows the exact same pattern as handleLikeClick
 * The repetition shows a consistent approach to toggle-based interactions
 */
function handleRetweetClick(tweetId) {
    // Find the specific tweet object that was retweeted
    // Using the same filter()[0] pattern as in handleLikeClick
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]

    // Check if already retweeted to determine whether to increment or decrement
    if (targetTweetObj.isRetweeted) {
        // Undo the retweet - decrease count
        targetTweetObj.retweets--
    }
    else {
        // Add retweet - increase count
        targetTweetObj.retweets++
    }
    
    // Toggle the retweet state using the NOT operator
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    
    // Update the UI to reflect changes
    render()
}

// ============================================================================
// REPLY VISIBILITY TOGGLE FUNCTION
// ============================================================================

/*
 * Toggles the visibility of replies when clicking the reply icon
 * This function demonstrates DOM manipulation without modifying data
 * Unlike like/retweet, this only changes UI state, not data state
 */
function handleReplyClick(replyId) {
    // CLASSLIST.TOGGLE() METHOD EXPLANATION:
    // classList is a property that contains all CSS classes on an element
    // toggle() is a method that:
    // - Adds the class if it's not present
    // - Removes the class if it is present
    // 
    // This is cleaner than:
    // if (element.classList.contains('hidden')) {
    //     element.classList.remove('hidden')
    // } else {
    //     element.classList.add('hidden')
    // }
    //
    // Template literal `replies-${replyId}` creates an ID like 'replies-3c23454ee-c0f5-9g9g-9c4b-77835tgs2'
    // This ID matches the div containing replies for this specific tweet
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

// ============================================================================
// NEW TWEET CREATION FUNCTION
// ============================================================================

/*
 * Handles creating and posting a new tweet when the user clicks the Tweet button
 * This demonstrates object creation, array manipulation, and form handling
 */
function handleTweetBtnClick() {
    // Get reference to the textarea element where users type their tweet
    const tweetInput = document.getElementById('tweet-input')
    
    // Extract the text value from the textarea
    const tweetText = tweetInput.value

    // Check if the tweet has content (truthy check)
    // Empty strings are falsy, so this prevents posting empty tweets
    if (tweetText) {
        // Create a new tweet object with all required properties
        // This object structure matches the existing tweets in tweetsData
        const newTweet = {
            handle: '@Scrimba',  // Default user handle
            profilePic: 'images/scrimbalogo.png',  // Default profile picture
            tweetText: tweetText,  // The user's input
            likes: 0,  // New tweets start with 0 likes
            retweets: 0,  // New tweets start with 0 retweets
            replies: [],  // New tweets start with empty replies array
            isLiked: false,  // Not liked by default
            isRetweeted: false,  // Not retweeted by default
            // UUID GENERATION:
            // uuidv4() generates a unique identifier for this tweet
            // Example output: '550e8400-e29b-41d4-a716-446655440000'
            // This ensures every tweet has a unique ID for manipulation
            uuid: uuidv4()
        }

        // UNSHIFT() METHOD EXPLANATION:
        // unshift() adds one or more elements to the BEGINNING of an array
        // This is why new tweets appear at the top of the feed
        // 
        // Comparison with other array methods:
        // - push() adds to the END: [1,2,3].push(4) → [1,2,3,4]
        // - unshift() adds to the START: [1,2,3].unshift(4) → [4,1,2,3]
        // - pop() removes from the END
        // - shift() removes from the START
        //
        // In social media apps, newest content appears first, so unshift() is perfect
        tweetsData.unshift(newTweet)
        
        // Re-render the feed to show the new tweet
        render()
    }
    
    // Clear the textarea after posting (works whether tweet was posted or not)
    // This provides good UX - user can immediately type a new tweet
    tweetInput.value = ''
}

// ============================================================================
// HTML GENERATION FUNCTION
// ============================================================================

/*
 * Generates the HTML for the entire tweet feed
 * This is the core rendering logic that converts data to UI
 * Demonstrates template literals, array iteration, and conditional rendering
 */
function getFeedHtml() {
    // Initialize an empty string to accumulate HTML
    let feedHtml = ``

    // FOREACH() METHOD EXPLANATION:
    // forEach() executes a function once for each element in an array
    // Unlike map(), it doesn't return a new array - it's just for side effects
    // Perfect for building up a string of HTML from array data
    tweetsData.forEach(function (tweet) {

        // Determine the CSS class for the like icon based on state
        // This will be added to the icon's class list to change its appearance
        let likeIconClass = ''

        // If the tweet is liked, add the 'liked' class
        // This class in CSS changes the icon color to red
        if (tweet.isLiked) {
            likeIconClass = 'liked'
        }

        // Determine the CSS class for the retweet icon based on state
        let retweetIconClass = ''

        // If the tweet is retweeted, add the 'retweeted' class
        // This class in CSS changes the icon color to lime green
        if (tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        }

        // Initialize empty string for replies HTML
        let repliesHtml = ''

        // Check if this tweet has any replies
        if (tweet.replies.length > 0) {
            // Loop through each reply and build HTML for it
            tweet.replies.forEach(function (reply) {
                // TEMPLATE LITERAL EXPLANATION:
                // Template literals use backticks (`) and allow:
                // 1. Multi-line strings (no need for \n)
                // 2. Embedded expressions with ${} syntax
                // 3. Easy HTML generation
                //
                // ${reply.profilePic} gets replaced with the actual image path
                // ${reply.handle} gets replaced with the user handle
                // ${reply.tweetText} gets replaced with the reply text
                repliesHtml += `
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`
            })
        }

        // BUILD THE MAIN TWEET HTML
        // This creates the complete HTML structure for one tweet
        // Key points:
        // - Data attributes (data-reply, data-like, data-retweet) link UI to event handlers
        // - Dynamic classes (${likeIconClass}, ${retweetIconClass}) control icon appearance
        // - ID attribute uses template literal for unique reply container
        // - The 'hidden' class on replies div keeps them hidden until clicked
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>   
</div>
`
    })
    
    // Return the complete HTML string containing all tweets
    return feedHtml
}

// ============================================================================
// RENDER FUNCTION
// ============================================================================

/*
 * Updates the DOM with the latest tweet data
 * This is called whenever data changes to keep the UI in sync
 * 
 * The render pattern:
 * 1. Data changes (like, retweet, new tweet, etc.)
 * 2. render() is called
 * 3. getFeedHtml() generates fresh HTML from current data
 * 4. innerHTML replaces the old HTML with new HTML
 * 5. User sees updated UI
 */
function render() {
    // Get the feed container element and replace its contents
    // innerHTML completely replaces everything inside the element
    // This is a simple but effective way to update the UI
    document.getElementById('feed').innerHTML = getFeedHtml()
}

// ============================================================================
// INITIAL RENDER
// ============================================================================

/*
 * Call render() immediately when the script loads
 * This displays the initial tweets from tweetsData
 * Without this call, the feed would be empty on page load
 */
render()

// ============================================================================
// HOW REPLIES DISPLAY IN THE RIGHT LOCATION (UI Architecture)
// ============================================================================

/*
 * QUESTION: Why do replies appear under their parent tweet instead of at the 
 * top or bottom of all tweets?
 * 
 * ANSWER: It's a combination of HTML structure and CSS:
 * 
 * 1. HTML STRUCTURE (JavaScript's role):
 *    - Each tweet's HTML includes its own replies div: <div id="replies-${tweet.uuid}">
 *    - This div is nested INSIDE the parent tweet's HTML structure
 *    - The replies are part of the tweet's DOM tree, not separate
 *    - Example structure:
 *      <div class="tweet">              ← Parent tweet
 *        <div class="tweet-inner">...   ← Tweet content
 *        <div id="replies-xxx">         ← Replies container (inside parent)
 *          <div class="tweet-reply">... ← Reply 1
 *          <div class="tweet-reply">... ← Reply 2
 *        </div>
 *      </div>
 * 
 * 2. CSS VISIBILITY (CSS's role):
 *    - The 'hidden' class uses CSS: display: none
 *    - When hidden class is present, replies are invisible but still in position
 *    - When classList.toggle('hidden') removes the class, they appear in place
 *    - They don't move to top/bottom because they're already positioned under parent
 * 
 * 3. THE KEY INSIGHT:
 *    - Each tweet's HTML is generated with its replies already nested inside
 *    - We're not moving elements around; we're just showing/hiding them
 *    - The DOM structure maintains the parent-child relationship
 *    - This is why replies always appear directly under their parent tweet
 * 
 * This pattern is common in component-based UI design - each component 
 * contains all its child components within its own HTML structure.
 */
