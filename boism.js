function getAnswers(){
    return new Promise(function(resolve, reject){
        var oldHeight = 0;
        var h = setInterval(function(){
            if(document.querySelectorAll('.zu-button-more').length) {
                oldHeight = document.body.scrollHeight;
                document.body.scrollTop = document.body.scrollHeight;
            } else {
                clearInterval(h);
                console.log(document.querySelectorAll('.feed-item'))
                //resolve(answers)
            }
        },2000)
    })
}
getAnswers();

//仅在问题页有效
function getToken(){
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open("GET", location.href, true);
        request.send(null);
        request.onload = e => {
            var tmp = document.createElement('div');
            tmp.innerHTML = request.responseText.match(/data\-state\=\"([^\"]*)/)[1];
            resolve(JSON.parse(tmp.innerText).token)
        }
    })
}
