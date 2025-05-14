const socket = io();

let clientsCount = document.getElementById("clientCount")
socket.on('clients-connected', (data) => {
    clientsCount.textContent = `Clients: ${data}`;
})

socket.on('chat-message', (data) => {
    console.log(data);
    addMessageToUi(false, data);
})

let clientName = document.querySelector(".clientName");
let messageInput = document.querySelector("#messageInput"); 

messageInput.addEventListener('input', () => {
    username = clientName.value;
    socket.emit('typingStatus', username)
})

socket.on('showTypingStatus', (username) => {
    showTypingStatus(username);
})

function addMessageToUi(isOwnMessage, data) {
    let chatBox = document.querySelector('#chatBox');

    const element = `
        <div class="message ${isOwnMessage ? 'sender' : 'receiver'}">
            <div class="meta">${isOwnMessage ? 'You' : data.name} • ${data.time}</div>
            <span class="msg">${data.message}</span>
        </div>
    `;

    chatBox.innerHTML += element;
    chatBox.scrollTo(0, chatBox.scrollHeight);
}

function sendMessage() {

    if(messageInput.value === "") return 
    const data = {
        name: clientName.value,
        message: messageInput.value,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    socket.emit('message', data)
    addMessageToUi(true, data);
    messageInput.value = "";
}

document.querySelector("#messageInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage(event);
    }
});

let typingTimer;
function showTypingStatus(username) {
    const status = document.getElementById("typingStatus");
    status.textContent = `${username} is typing...`;
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        status.textContent = "";
    }, 1500);
}
