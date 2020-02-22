/*  Select Elements */

// Form and inputs
const form = document.querySelector(".form");
const messageInput = document.querySelector("#messageInput");
const nameInput = document.querySelector("#nameInput");
const buttonSubmit = document.querySelector("#buttonSubmit");
const charCounter = document.querySelector(".charCounter");
// Tweets
const tweetList = document.querySelector(".list");
// error messages
const tweetError = document.querySelector(".tweetError");
const nameError = document.querySelector(".nameError");
// Paths
const POST_URL = "http://localhost:3000/userpost";

// Listen for form submit
form.addEventListener("submit", event => {
  event.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const userName = formData.get("userName");
  const userMessage = formData.get("userMessage");
  const tweet = {
    userName,
    userMessage
  };

  // Fetch form data from server
  fetch(POST_URL, {
    method: "POST",
    body: JSON.stringify(tweet),
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => res.json())
    .then(createdTweet => {
      console.log(createdTweet);
    });

  // Validate input
  if (!messageInput.value) {
    messageInput.classList.add("is-danger");
    // Display error message
    tweetError.style.display = "block";
  } else if (!nameInput.value) {
    nameInput.classList.add("is-danger");
    nameError.style.display = "block";
  } else {
    // Clear red outline & error messages
    messageInput.classList.remove("is-danger");
    nameInput.classList.remove("is-danger");
    nameError.style.display = "none";
    tweetError.style.display = "none";

    // Timestamp
    let date = new Date();

    // Render tweet to page if inputs are not empty
    tweetList.insertAdjacentHTML(
      "beforeend",
      `<div class="list-item">
          <figure class="image is-64x64">
        <img class="is-rounded" src="https://robohash.org/${userName}.png?bgset=bg1">
      </figure>
    
          <h6 class="title is-5">${userName}</h6>
          <h5 class="subtitle is-6">${userMessage}</h5>
          <p class="is-italic">${date.toUTCString()}</p>
          </div>`
    );
    // Reset input after submit
    form.reset();
  }
});

// Character count
messageInput.addEventListener("keydown", event => {
  const target = event.currentTarget;
  // Input's maxLength attribute
  const maxLength = target.getAttribute("maxLength");
  // Current char count
  const currentLength = target.value.length;

  // Render remaining characters
  charCounter.textContent = `${maxLength - currentLength} characters left`;
});
