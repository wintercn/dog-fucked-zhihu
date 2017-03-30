//仅在个人动态页有效
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

//仅在问题页有效
function getToken(){
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open("GET", location.href, true);
        request.send(null);
        request.onload = e => {
            var tmp = document.createElement('div');
            tmp.innerHTML = request.responseText.match(/data\-state\=\"([^\"]*)/)[1];
            resolve(JSON.parse(tmp.innerText).token.carCompose)
        }
    })
}

function addTopic(token, name){
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open("POST", "https://www.zhihu.com/api/v4/topics", true);
        request.setRequestHeader("accept", "application/json, text/plain, */*");
        request.setRequestHeader("content-type", "application/json");
        request.setRequestHeader("authorization", "Bearer " + token);
        request.send(JSON.stringify({name: name}));
        request.onload = e => {
            resolve(request.responseText)
        }
    })
}

function sleep(t) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, t);
    })
}
function random(str) {
    var chars = str.split('');
    for(var i = 0; i < chars.length; i++) {
        chars[i] += ['\uFEFF','\u200C','\u200D'][Math.random()*3 | 0] 
        chars[i] += ['\uFEFF','\u200C','\u200D'][Math.random()*3 | 0] 
        chars[i] += ['\uFEFF','\u200C','\u200D'][Math.random()*3 | 0] 
    }
    return chars.join('');
}
async function run() {
    var token = await getToken();
    while(true) {
        await sleep(3000);
        await addTopic(token, random("勃学"));
    }
}
run();
