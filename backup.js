//此脚本只能在知乎个人页面使用


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

function getActions(){
    return new Promise(function(resolve,reject){
        var h = setInterval(function(){
            if($('.zu-button-more').length) {
                $('.zu-button-more')[0].click();
            } else {
                clearInterval(h);
                var answers = Array.prototype.slice.call($('.question_link')).filter(function(e){return e.previousSibling.textContent.match(/回答了问题/)}).map(function(e){return e.parentNode.nextSibling.nextSibling.children[3].children[0].value})
                resolve(answers)
            }
        },500)
    })
}


var answers;

getActions().then(function(){
    answers = arguments[0];
    return getFileSystem(window.TEMPORARY, 50*1024*1024);
}).then(function(fs){
    return getFile(fs.root,'answers.txt',{create:true});
}).then(function(file){
    return writeFile(file,answers,'text/plain');
}).then(function(){
    console.log("filesystem:http://"+window.location.hostname+"/temporary/answers.txt");
    var downloadbtn = document.createElement('a');
    document.body.appendChild(downloadbtn);
    downloadbtn.download = "answsers.txt";
    downloadbtn.href = ("filesystem:http://"+window.location.hostname+"/temporary/answers.txt");
    downloadbtn.click();
});
