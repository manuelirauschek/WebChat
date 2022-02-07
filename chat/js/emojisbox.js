const emojis = {
    recent: {
        icon: "images/clock.png",
        emojis: []
    },
    smileys: {
        icon: "images/emojis.png",
        emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃"]
    },
    animals: {
        icon: "images/animals.png",
        emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊","😆", "😅", "😂", "🤣", "😊"]
    },
    flags: {
        icon: "images/flags.png",
        emojis: ["🇦🇫", "🇦🇽", "🇦🇱", "🇩🇿", "🇦🇸", "🇦🇩", "🇦🇴", "🇦🇮", "🇦🇶", "🇦🇬", "🇦🇷", "🇦🇲", "🇦🇼", "🇦🇺", "🇦🇹", "🇦🇿", "🇧🇸", "🇧🇭", "🇧🇩", "🇧🇧", "🇧🇾", "🇧🇪", "🇧🇿", "🇧🇯", "🇧🇲", "🇧🇹", "🇧🇴", "🇧🇦", "🇧🇼", "🇧🇷", "🇮🇴", "🇻🇬", "🇧🇳", "🇧🇬", "🇧🇫", "🇧🇮", "🇰🇭", "🇨🇲", "🇨🇦", "🇮🇨", "🇨🇻", "🇧🇶", "🇰🇾", "🇨🇫", "🇹🇩", "🇨🇱", "🇨🇳", "🇨🇽", "🇨🇨", "🇨🇴", "🇰🇲", "🇨🇬", "🇨🇩", "🇨🇰", "🇨🇷", "🇨🇮", "🇭🇷", "🇨🇺", "🇨🇼", "🇨🇾", "🇨🇿", "🇩🇰", "🇩🇯", "🇩🇲", "🇩🇴", "🇪🇨", "🇪🇬", "🇸🇻", "🇬🇶", "🇪🇷", "🇪🇪", "🇪🇹", "🇪🇺", "🇫🇰", "🇫🇴", "🇫🇯", "🇫🇮", "🇫🇷", "🇬🇫", "🇵🇫", "🇹🇫", "🇬🇦", "🇬🇲"]
    },
    items: {
        icon: "images/items.png",
        emojis: ["😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳"]
    },
    functions: {}
};

emojis.functions.renderList = function(e) {
    let emojiCategory = $(e).attr("emoji-category");
    $("#emojis-list").html("");

    if(emojiCategory != "recent") {
        for(let a = 0; a < emojis[emojiCategory].emojis.length; a++) {
            let emoji = emojis[emojiCategory].emojis[a];
            $("#emojis-list").append(`<button onclick="emojis.functions.addEmojiToInputField(this)">${emoji}</button>`);
        }
    } else {
        let recentEmojis = localStorage.getItem("recent-emojis");
        if(recentEmojis != null) {
            let recentEmojisObj = JSON.parse(recentEmojis);
            for(let a = 0; a < recentEmojisObj.length; a++) {
                let emoji = recentEmojisObj[a];
                $("#emojis-list").append(`<button onclick="emojis.functions.addEmojiToInputField(this)">${emoji}</button>`);
            }
        }
    }
};
emojis.functions.renderCategories = function() {
    for(emojiCategory in emojis) {
        if(emojiCategory != "functions") {
            $("#emojis-nav").append(`<button onclick="emojis.functions.renderList(this)" emoji-category="${emojiCategory}"><img src="${emojis[emojiCategory].icon}" width="20" heigt="20"></button>`);
        }
    }
};
emojis.functions.addEmojiToInputField = function(e) {
    let emoji =  $(e).html();
    $("#message").val($("#message").val() + emoji);
    emojis.functions.addToRecent(emoji);
};

emojis.functions.addToRecent = function(emoji) {
    let recentEmojis = localStorage.getItem("recent-emojis");
    if(recentEmojis == null) {
        localStorage.setItem("recent-emojis", JSON.stringify([emoji]));
    } else {
        let recentEmojisObj = JSON.parse(recentEmojis);
        if(!recentEmojisObj.includes(emoji)) {
            // remove 
            recentEmojisObj.slice(recentEmojisObj[recentEmojisObj.indexOf(emoji)])
            // add first
            recentEmojisObj.unshift(emoji);
            localStorage.setItem("recent-emojis", JSON.stringify(recentEmojisObj));
        }
    }
}
emojis.functions.toggleBoxVisbility = function() {
    $("#emojis").css("display") == "none"
    ? $("#emojis").css({display: "block"})
    : $("#emojis").css({display: "none"})
};

emojis.functions.renderCategories();