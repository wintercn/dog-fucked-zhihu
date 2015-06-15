
var xueba=document.getElementById("xueba");
var jiaruwomeng=document.getElementById("jiaruwomeng");
var putong=document.getElementById("putong");
var xuebaimg=document.getElementById("xuebaimg");
var putongimg=document.getElementById("putongimg");



function choiceputong()
{
	
	putongimg.style.display="block";
	xuebaimg.style.display="none";
	chrome.extension.sendRequest({command: "state_putong"}, function(response) {
  
});
	
}

function choicexueba()
{
	
	
	putongimg.style.display="none";
	xuebaimg.style.display="block";
	chrome.extension.sendRequest({command: "state_xueba"}, function(response) {

});
}
//绑定点击事件
xueba.addEventListener("click",choicexueba,false);
putong.addEventListener("click",choiceputong,false);
jiaruwomeng.addEventListener("click",function(){
	var url=chrome.extension.getURL("img/guanyu.html");
	openwindow(url,"关于我们",1239,694)
	chrome.extension.sendRequest({command: "findme"}, function(response) {});
	},false);

	function openwindow(url,name,iWidth,iHeight)   {  
		
		       var iWidth;                          //弹出窗口的宽度;
			       var iHeight;                        //弹出窗口的高度;
				       var iTop = (window.screen.availHeight-30-iHeight)/2;          
					    var iLeft = (window.screen.availWidth-10-iWidth)/2;          
						window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');   
						}
