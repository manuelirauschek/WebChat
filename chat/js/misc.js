function getDateByTimestamp(ts){
    var date = new Date(ts * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    var hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    var min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    var sec = date.getSeconds();
    return `${day} ${month}, ${hour}:${min}`;
}

function randId() {
    return Math.random().toString(6).slice(-6);
}