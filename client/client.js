/*  Select Elements */
const form = document.querySelector(".form");
const buttonSubmit = document.querySelector("#buttonSubmit");
const messageInput = document.querySelector("#messageInput");
const nameInput = document.querySelector("#nameInput");
const POST_URL = "http://localhost:3000/userpost";
const tweetList = document.querySelector(".list");
const tweetError = document.querySelector(".tweetError");
const nameError = document.querySelector(".nameError");

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

    // Render tweet to page if inputs are not empty
    tweetList.insertAdjacentHTML(
      "beforeend",
      `<div class="list-item">
          <figure class="image is-64x64">
        <img class="is-rounded" src="https://robohash.org/${userName}.png?bgset=bg1">
      </figure>
    
          <h6 class="title is-5">${userName}</h6>
          <h5 class="subtitle is-6">${userMessage}</h5>
          </div>`
    );
    // Reset input after submit
    messageInput.value = "";
    nameInput.value = "";
  }
});
