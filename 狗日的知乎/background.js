var state=0;
    chrome.extension.onRequest.addListener(function (request, sender, sendResponse)
    {
        if (request.from == "unfinded" || request.from == null)
        {
            if (request.command == "state_xueba")
            {
               
				state=2;
                sendResponse({
                    command : "ok"
                })
            }
            else if (request.command == "state_putong")
            {
                
               
			
               state=1;
			  
                sendResponse({
                    command : "ok"
                })
            }
         else{
			 	
            if (request.command == "getstate")
            {
              
                sendResponse({
                    command : state
                })
				state=0;
            }
			 
			 }
           
        }
    })
