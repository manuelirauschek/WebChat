let groupMembernames = [];

function createGroupChat(settings) {
    let members = "";
    for(let a = 0; a < settings.members.length; a++) {
        members += a < settings.members.length - 1 ? `${settings.members[a]},` : settings.members[a];
    }
    window.location.href = `http://localhost/chat/user.php?action=create_group_chat&groupname=${settings.groupname}&members=${members}`;
}

function addMemberToGroup(membername, e) {
    if(groupMembernames.includes(membername)) {
        groupMembernames.splice(groupMembernames.indexOf(membername), 1);
        $(e).html("Einladen");
    } else {
        groupMembernames.push(membername);
        $(e).html("Entfernen");
    }
}
