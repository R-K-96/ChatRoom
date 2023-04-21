// const socket = io();

// const messages = document.getElementById("messages");
// const chatForm = document.getElementById("chat-form");
// const usernamePopup = document.getElementById("username-popup");
// const usernameForm = document.getElementById("username-form");
// const usernameInput = document.getElementById("username");
// const messageInput = document.getElementById("message");
// let username = "";

// usernameForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   if (!usernameInput.value.trim()) {
//     alert("Please enter a username.");
//     return;
//   }

//   username = usernameInput.value;
//   usernamePopup.style.display = "none";
//   document.querySelector(".chat-container").style.display = "flex";
// });

// chatForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   if (!messageInput.value.trim()) {
//     alert("Please enter a message.");
//     return;
//   }

//   const data = {
//     username: username,
//     message: messageInput.value,
//   };

//   socket.emit("chat message", data);
//   addMessage(data, true);
//   messageInput.value = "";
// });

// socket.on("chat message", (data) => {
//   if (data.username !== username) {
//     addMessage(data, false);
//   }
// });

// function addMessage(data, sent) {
//   const messageElement = document.createElement("div");
//   messageElement.classList.add("message");
//   if (sent) messageElement.classList.add("sent");
//   messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
//   messages.appendChild(messageElement);

//   // Scroll to the bottom
//   messages.scrollTop = messages.scrollHeight;
// }

// established a connection
const socket = io();

let username = "";

document.getElementById("join-btn").addEventListener("click", (event) => {
  event.preventDefault();

  username = document.getElementById("username-input").value;
  if (username.trim() != "") {
    document.querySelector(".form-username").style.display = "none";
    document.querySelector(".chatroom-container").style.display = "block";
    document.querySelector(
      ".chatroom-header"
    ).innerText = `Chatroom - ${username}`;

    socket.emit("username enter", username);
  } else {
    alert("Username cannot be empty");
  }
});

document.getElementById("send-btn").addEventListener("click", (event) => {
  event.preventDefault();

  const data = {
    username: username,
    message: document.getElementById("message-input").value,
  };
  // emission, emit
  // emit the message to the watchman -> give message to watchman
  socket.emit("message", data);
  // communicate with the watchman that a message is sent to
  addMessage(data, true);
});

// receive user enterred
socket.on("username enter", (data) => {
  if (data !== username) {
    var msgDiv = document.createElement("div");
    msgDiv.innerText = `${data} has enterred!`;
    document.querySelector("#messages-container").appendChild(msgDiv);
  }
});

// receive message
socket.on("message", (data) => {
  if (data.username !== username) {
    addMessage(data, false);
  }
});

function addMessage(data, flag) {
  var msgDiv = document.createElement("div");
  msgDiv.innerText = `${data.username}: ${data.message}`;
  if (flag) {
    msgDiv.setAttribute("class", "message sent");
  } else {
    msgDiv.setAttribute("class", "message received");
  }

  document.querySelector("#messages-container").appendChild(msgDiv);
}

// function if some sender sends a message , receive that message and append  child

document.getElementById("exit-btn").addEventListener("click", () => {
  socket.emit("username left", username);
});

// receive message
socket.on("username left", (data) => {
  if (data !== username) {
    var msgDiv = document.createElement("div");
    msgDiv.innerText = `${data} has left!`;
    document.querySelector("#messages-container").appendChild(msgDiv);
  }
});