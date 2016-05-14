var MY_DEBUG = false

function myConsole(caption, obj){
	if (MY_DEBUG == true){
		console.log(caption + " : ");
		console.log(obj);
	}
}
