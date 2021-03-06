const emojis = {
    recent: {
        icon: "images/clock.png",
        emojis: []
    },
    smileys: {
        icon: "images/emojis.png",
        emojis: ["๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐คฃ", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐คช", "๐คจ", "๐ง", "๐ค", "๐", "๐คฉ", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "โน๏ธ", "๐ฃ", "๐", "๐ซ", "๐ฉ", "๐ฅบ", "๐ข", "๐ญ", "๐ค", "๐ ", "๐ก", "๐คฌ", "๐คฏ", "๐ณ", "๐ฅต", "๐ฅถ", "๐ฑ", "๐จ", "๐ฐ", "๐ฅ", "๐", "๐ค", "๐ค", "๐คญ", "๐คซ", "๐คฅ", "๐ถ", "๐", "๐", "๐ฌ", "๐", "๐ฏ", "๐ฆ", "๐ง", "๐ฎ", "๐ฒ", "๐ฅฑ", "๐ด", "๐คค", "๐ช", "๐ต", "๐ค", "๐ฅด", "๐คข", "๐คฎ", "๐คง", "๐ท", "๐ค", "๐ค", "๐ค", "๐ค ", "๐", "๐ฟ", "๐น", "๐บ", "๐คก", "๐ฉ", "๐ป", "๐", "โ ๏ธ", "๐ฝ", "๐พ", "๐ค", "๐"]
    },
    animals: {
        icon: "images/animals.png",
        emojis: ["๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐คฃ", "๐","๐", "๐", "๐", "๐คฃ", "๐"]
    },
    flags: {
        icon: "images/flags.png",
        emojis: ["๐ฆ๐ซ", "๐ฆ๐ฝ", "๐ฆ๐ฑ", "๐ฉ๐ฟ", "๐ฆ๐ธ", "๐ฆ๐ฉ", "๐ฆ๐ด", "๐ฆ๐ฎ", "๐ฆ๐ถ", "๐ฆ๐ฌ", "๐ฆ๐ท", "๐ฆ๐ฒ", "๐ฆ๐ผ", "๐ฆ๐บ", "๐ฆ๐น", "๐ฆ๐ฟ", "๐ง๐ธ", "๐ง๐ญ", "๐ง๐ฉ", "๐ง๐ง", "๐ง๐พ", "๐ง๐ช", "๐ง๐ฟ", "๐ง๐ฏ", "๐ง๐ฒ", "๐ง๐น", "๐ง๐ด", "๐ง๐ฆ", "๐ง๐ผ", "๐ง๐ท", "๐ฎ๐ด", "๐ป๐ฌ", "๐ง๐ณ", "๐ง๐ฌ", "๐ง๐ซ", "๐ง๐ฎ", "๐ฐ๐ญ", "๐จ๐ฒ", "๐จ๐ฆ", "๐ฎ๐จ", "๐จ๐ป", "๐ง๐ถ", "๐ฐ๐พ", "๐จ๐ซ", "๐น๐ฉ", "๐จ๐ฑ", "๐จ๐ณ", "๐จ๐ฝ", "๐จ๐จ", "๐จ๐ด", "๐ฐ๐ฒ", "๐จ๐ฌ", "๐จ๐ฉ", "๐จ๐ฐ", "๐จ๐ท", "๐จ๐ฎ", "๐ญ๐ท", "๐จ๐บ", "๐จ๐ผ", "๐จ๐พ", "๐จ๐ฟ", "๐ฉ๐ฐ", "๐ฉ๐ฏ", "๐ฉ๐ฒ", "๐ฉ๐ด", "๐ช๐จ", "๐ช๐ฌ", "๐ธ๐ป", "๐ฌ๐ถ", "๐ช๐ท", "๐ช๐ช", "๐ช๐น", "๐ช๐บ", "๐ซ๐ฐ", "๐ซ๐ด", "๐ซ๐ฏ", "๐ซ๐ฎ", "๐ซ๐ท", "๐ฌ๐ซ", "๐ต๐ซ", "๐น๐ซ", "๐ฌ๐ฆ", "๐ฌ๐ฒ"]
    },
    items: {
        icon: "images/items.png",
        emojis: ["๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐ฅฐ", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐คช", "๐คจ", "๐ง", "๐ค", "๐", "๐คฉ", "๐ฅณ"]
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