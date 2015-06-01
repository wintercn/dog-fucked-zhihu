//此脚本只能在知乎个人页面使用
//用Chrome浏览器打开知乎个人页面，右键点击网页，选择"审查元素"，再在弹出的控制台粘贴以下代码:


window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

function getAnswerIds(){
    return new Promise(function(resolve,reject){
        var h = setInterval(function(){
            if(document.querySelectorAll('.zu-button-more').length) {
                document.querySelectorAll('.zu-button-more')[0].click();
            } else {
                clearInterval(h);
                resolve(Array.prototype.slice.call($('.question_link')).filter(function(e){return e.previousSibling.textContent.match(/回答了问题/)}).map(function(e){return e.parentNode.nextSibling.nextSibling.children[3].dataset['resourceid']}));
            }
        },500)
    })
}

function updateAnswer(id,content){
    return new Promise(function(resolve,reject){
        var fd = new FormData();

        fd.append("id", id);
        fd.append("content", content);
        fd.append('field_name', 'content');
        fd.append('_xsrf', document.getElementsByName('_xsrf')[0].value);
     
        var request = new XMLHttpRequest();
        request.open('post','http://www.zhihu.com/answer/content',true);
        request.send(fd);
        request.addEventListener('readystatechange',function(e){
            if(request.readyState === 4) {
                if(request.status === 200) {
                    resolve(request.responseText);
                } else {
                    reject(request);
                }
            }
        })
    })
}

function wait(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}


getAnswerIds().then(function(ids){
    var i = 0;
    void function(){ // this is a promise loop
        if(i<ids.length) {
            wait(5000).then(function(){ return updateAnswer(ids[i++],'因为知乎哔~的友善度策略，本人已经决定离开知乎，所有答案由 <a data-hash="ec03b8e839a6fb763e1b8113455362db" href="/people/winter-25" class="member_mention" data-editable="true" data-title="@winter">@winter</a>  开发的插件"更好的知乎"（<a href="https://github.com/wintercn/dog-fucked-zhihu" data-editable="true" data-title="wintercn/dog-fucked-zhihu · GitHub" class="">wintercn/dog-fucked-zhihu · GitHub</a>）删除。');}).then(arguments.callee);
        }
    }();
})