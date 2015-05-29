//此脚本只能在个人页面使用


var h = setInterval(function(){
    if($('.zu-button-more').length) {
        $('.zu-button-more')[0].click()
    } else {
        clearInterval(h)
        var questions = Array.prototype.slice.call($('.question_link')).filter(function(e){return e.previousSibling.textContent.match(/回答了问题/)}).map(function(e){return e.href}).join('\n')
        console.log(questions)
        //TODO：已经取得了完整的回答过的问题列表，接下来利用知乎API把内容拉回来，然后利用file API保存成文件
    }
},500)
