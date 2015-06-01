//此脚本只能在知乎个人页面使用
//用Chrome浏览器打开知乎个人页面，右键点击网页，选择"审查元素"，再在弹出的控制台粘贴以下代码:

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

function getFileSystem(type, size) {
    return new Promise(function(resolve,reject){
        requestFileSystem(type, size, resolve);
    });
}

function getFile(dir, name, params) {
    return new Promise(function(resolve,reject){
        dir.getFile(name,params,resolve);
    });
}

function writeFile(file, content, type) {
    return new Promise(function(resolve,reject){
        file.createWriter(function(writer){
            writer.addEventListener("error",function(){},false);
            writer.addEventListener("writeend",function(){
                writer.removeEventListener("writeend",arguments.callee,false);
                writer.truncate(writer.position)
                
                resolve();
            },false);

            writer.write(new Blob(content), {type: type});
        })
    });
}

function getAnswers(){
    return new Promise(function(resolve,reject){
        var h = setInterval(function(){
            if(document.querySelectorAll('.zu-button-more').length) {
                document.querySelectorAll('.zu-button-more')[0].click();
            } else {
                clearInterval(h);
                var answers = Array.prototype.slice.call($('.question_link')).filter(function(e){return e.previousSibling.textContent.match(/回答了问题/)}).map(function(e){return e.outerHTML + '<br/><br/>' + e.parentNode.nextSibling.nextSibling.children[3].children[0].value + '<hr/>'})
                resolve(answers)
            }
        },500)
    })
}




var answers;

getAnswers().then(function(){
    answers = arguments[0];
    return getFileSystem(window.TEMPORARY, 50*1024*1024);
}).then(function(fs){
    return getFile(fs.root,'answers.html',{create:true});
}).then(function(file){
    return writeFile(file,answers,'text/html');
}).then(function(){
    console.log("filesystem:http://"+window.location.hostname+"/temporary/answers.html");
    var downloadbtn = document.createElement('a');
    document.body.appendChild(downloadbtn);
    downloadbtn.download = "answsers.html";
    downloadbtn.href = ("filesystem:http://"+window.location.hostname+"/temporary/answers.html");
    downloadbtn.click();
});
