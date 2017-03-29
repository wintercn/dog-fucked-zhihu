function getAnswers(){
    return new Promise(function(resolve,reject){
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
