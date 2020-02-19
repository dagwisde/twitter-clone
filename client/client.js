/*  Select Elements */
const form = document.querySelector(".form");
const buttonSubmit = document.querySelector("#buttonSubmit");
const messageInput = document.querySelector("#messageInput");
const nameInput = document.querySelector("#nameInput");
const POST_URL = "http://localhost:3000/userpost";
const tweetList = document.querySelector(".list");

form.addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(form);
  const username = formData.get("userName");
  const userMessage = formData.get("userMessage");
  const tweet = {
    username,
    userMessage
  };

  fetch(POST_URL, {
    method: "POST",
    body: JSON.stringify(tweet),
    headers: {
      "content-type": "application/json"
    }
  });

  tweetList.insertAdjacentHTML(
    "beforeend",
    `<div class="list-item">
    <h4 class="title is-4">${username}</h4>
    <h5 class="subtitle is-5">${userMessage}</h5>
    </div>`
  );

  messageInput.value = "";
  nameInput.value = "";
});
