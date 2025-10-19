const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

console.log(posts);
// Write your code here.

const postsContainer = document.getElementById("posts-container");

function renderPosts() {
    let postsHTML = "";
    posts.forEach((post, index) => {
        postsHTML += `
        <main class="post">
            <section class="post-header">
                <img src="${post.avatar}" alt="${post.username} avatar" class="avatar-img">
                <div class="post-user-info">
                    <p class="post-author">${post.name}</p>
                    <p class="post-location">${post.location}</p>
                </div>
            </section>
            <div class="post-image-container">
                <img src="${post.post}" alt="Post by ${post.name}" class="post-image" id="post-image-${index}">
            </div>
            <section class="post-actions">
                <div class="post-icons">
                    <img src="images/icon-heart.svg" alt="Like icon" class="icon icon-heart" id="like-icon-${index}">
                    <img src="images/icon-comment.svg" alt="Comment icon" class="icon icon-comment">
                    <img src="images/icon-dm.svg" alt="Share icon" class="icon icon-dm">
                </div>
                <p class="post-likes" id="post-likes-${index}">${post.likes} likes</p>
                <p class="post-caption"><strong>${post.username}</strong> ${post.comment}</p>
            </section>
        </main>
        `;
    });
    postsContainer.innerHTML = postsHTML;
}

function setupLikeFunctionality() {
    posts.forEach((post, index) => {
        const likeIcon = document.getElementById(`like-icon-${index}`);
        const postImage = document.getElementById(`post-image-${index}`);
        const postLikes = document.getElementById(`post-likes-${index}`);

        function increaseLikes() {
            post.likes += 1;
            postLikes.textContent = `${post.likes} likes`;
        }

        likeIcon.addEventListener("click", increaseLikes);
        postImage.addEventListener("click", increaseLikes);
    });
}

renderPosts();
setupLikeFunctionality();

// Instagram Clone Solo Project
// Your task is to create a simplified version of an Instagram post using HTML, CSS, and JavaScript.
// You will need to create three posts using the data provided below.

// Data for the posts
// Each post has the following properties:
// - name: The full name of the user
// - username: The username of the user
// - location: The location of the user
// - avatar: The URL of the user's avatar image
// - post: The URL of the user's post image
// - comment: The caption for the post
// - likes: The number of likes for the post

// Instructions:
// - Create a new HTML file and link to a CSS file and a JavaScript file
// - Use semantic HTML to structure the post
// - Style the post using CSS to match the Instagram style as closely as possible
// - Add hover effects to the icons using CSS

// Stretch goals:

// - Use JavaScript to render out all three posts
// - Increase the number of likes when the heart icon or image are clicked