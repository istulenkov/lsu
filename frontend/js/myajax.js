

function CMyJSON(){
	
	this.C_URL = "http://localhost:9011"
	this.C_POST = "post"
	
	this.get = function(req){
		var ret = NaN
		
		var request = $.ajax({
			url      : this.C_URL,
			async	 : false,
			type     : this.C_POST,
			data     : req
		});
		
		request.done(function(msg){
			myConsole("CMyJSON.request.done", msg);
			ret = msg;
		})
		
		return ret;
	}
	
}
