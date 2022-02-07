function requestLoginCredentials() {
    if(loginCredentials.username == null || loginCredentials.password == null) {
        loginCredentials.username = prompt("Username:");
        loginCredentials.password = prompt("Password:");
    }

    localStorage.setItem("username", loginCredentials.username);
    localStorage.setItem("password", loginCredentials.password);

    registerOrLogin(loginCredentials);
}

function registerOrLogin(credentials) {
    window.location.href = `http://157.90.184.232/chat/user.php?action=register_and_login&username=${loginCredentials.username}&password=${loginCredentials.password}`;
}