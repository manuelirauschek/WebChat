const chatSounds = {
    bing: new Audio("audios/bing.mp3")
}

const receiver = {
    group: "main",
    delay: 1000,
    timer: null
};

const wholeChat = {
    messages: [],
    messagesLoaded: false
}

let chat =  [];


function gotoLastMessage() {
    $(".row").last()[0].scrollIntoView({ behavior: 'smooth' });
}

function renderChatMessage(data, bgcolor) {

    $("#chat-messages").append(`
        <div class="row">
            <div class="${data.username == loginCredentials.username ? "me" : "other"}" 
                 style="${bgcolor != null ? `background-color: ${bgcolor};` : ""}">
                <div class="header">
                    <div class="name">${data.username == loginCredentials.username ? "You" : data.username}</div>
                    <div class="time">${getDateByTimestamp(data.ts)}</div>
                    </div>
                <div class="body">${data.text}</div>
            </div>
        </div>
    `);
}

function renderChatImage(data) {

    $("#chat-messages").append(`
        <div class="row">
            <div class="${data.username == loginCredentials.username ? "me" : "other"}">
                <div class="header">
                    <div class="name">${data.username == loginCredentials.username ? "You" : data.username}</div>
                    <div class="time">${getDateByTimestamp(data.ts)}</div>
                    </div>
                <div id="${data.imageUid}" class="body">${`<div class="message-image-title">${data.imageText != null ? data.imageText : ""}</div>`}</div>
            </div>
        </div>
    `);
    let chatImageWidth = 0;
    let chatImageHeight = 0;

    if(data.image.naturalWidth >= 1920) {
        chatImageWidth = data.image.naturalWidth / 15;
    } else {
        chatImageWidth = data.image.naturalWidth / 10;
    }

    if(data.image.naturalHeight >= 1080) {
        chatImageHeight = data.image.naturalHeight / 15;
    } else {
        chatImageHeight = data.image.naturalHeight / 10;
    }

    $(`#${data.imageUid}`).append($(data.image));
    $(`#${data.imageUid} img`).attr("width", chatImageWidth);
    $(`#${data.imageUid} img`).attr("height", chatImageHeight);

    $(`#${data.imageUid}`).click(function(e) {
        let imageId = `image:${$(this).attr("id")}`;
        let imageSource = document.getElementById(imageId).src;
        window.location.href = imageSource;
    });
}


function loadWholeChatMessages() {
    wholeChat.messages = [];
    wholeChat.messagesLoaded = false;

    $.getJSON(`http://localhost/chat/messaging.php?action=receive&username=${loginCredentials.username}&password=${loginCredentials.password}&group=${receiver.group}&whole=true`, function(data) {
        for(let a = 0; a < data.length; a++) {
            wholeChat.messages.push(data[a]);

            let urlsInMessage = data[a].text.match(/\bhttps?:\/\/\S+/gi);
            let messageContainsUrl = urlsInMessage != null ? true : false;

            if(messageContainsUrl) {
                let image = new Image();
                image.src = urlsInMessage[0];

                wholeChat.messages[a].isUrl = true;

                image.onload = function() {
                    wholeChat.messages[a].isUrl = false;
                    wholeChat.messages[a].isImage = true;
                    wholeChat.messages[a].image = image;
                    wholeChat.messages[a].imageUrl = image.src;
                    wholeChat.messages[a].imageUid = randId() + data[a].ts;
                    wholeChat.messages[a].imageText = data[a].text.replace(image.src, "");
                }
            }

        }
    });
    wholeChat.messagesLoaded = true;
}

function renderWholeChatMessages() {
    loadWholeChatMessages();

    let messageLoader = setInterval(function() {
        if(!wholeChat.messagesLoaded) {
            console.log("Loading chat");
        }  else {
            console.log("Chat loaded");
            for(let a = 0; a < wholeChat.messages.length; a++) {
                let message = wholeChat.messages[a];

                message.isImage ? renderChatImage(message) : renderChatMessage(message);
            }

            gotoLastMessage();
            clearInterval(messageLoader);
        }
    }, 1000);
}

function receive() {
    $.getJSON(`http://localhost/chat/messaging.php?action=receive&username=${loginCredentials.username}&password=${loginCredentials.password}&group=${receiver.group}`, function(data) {
        for(let a = 0; a < data.length; a++) {
            if(!messageAlreadyReceived(data[a])) {
                chat.push(data[a]);

                let urlsInMessage = data[a].text.match(/\bhttps?:\/\/\S+/gi);

                let containsUrl = urlsInMessage != null ? urlsInMessage.length > 0 : false;
                
                let image = null;

                if(containsUrl) {
                    /*
                    wholeChat.messages[a].isUrl = false;
                    wholeChat.messages[a].isImage = true;
                    wholeChat.messages[a].image = image;
                    wholeChat.messages[a].imageUid = randId() + data[a].ts;
                    */

                    data[a].isUrl = true;

                    image = new Image();
                    image.src = urlsInMessage[0];
                    image.onload = function() {
                        data[a].isUrl = false;
                        data[a].isImage = true;
                        data[a].image = image;
                        data[a].imageUrl = image.src;
                        data[a].imageUid = randId() + data[a].ts;
                        data[a].imageText = data[a].text.replace(image.src, "");
                        // render if it is image
                        renderChatImage(data[a]);
                        
                    }
                } else {
                    renderChatMessage(data[a]);
                }
                
                if(data[a].username != loginCredentials.username) {
                    chatSounds.bing.play();
                }

                gotoLastMessage();
            }
        }
    });
}
function send() {
    console.log(receiver);
    let messageText = $("#message").val();
    $.getJSON(`http://localhost/chat/messaging.php?action=send&username=${loginCredentials.username}&password=${loginCredentials.password}&group=${receiver.group}&text=${messageText}`, function(data) {
        $("#message").val("");
        console.log(data);
    });        
}

function messageAlreadyReceived(message) {
    for(let a = 0; a < chat.length; a++) {
        if(chat[a].ts == message.ts && chat[a].name == message.name && chat[a].group == message.group && chat[a].text == message.text) {
            return true;
        }
    }
    return false;
}

function startReceiver(group, delay) {
    if(receiver.timer != null) {
        clearInterval(receiver.timer);
    }

    $("#chat-messages").html("");
    
    receiver.group = group;
    receiver.interval = delay;

    // receive first whole messages from chat
    renderWholeChatMessages();

    chat = [];

    receiver.timer = setInterval(receive, delay);

    
    console.log(`Group: ${group}`);
}
