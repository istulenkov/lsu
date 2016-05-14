
function CValidator(){
	
	this.init = function(){
		$(".mask-phone").mask("(999) 999-9999");
		$(".mask-date").mask("99.99.9999");
		$(".mask-time").mask("99:99:00");
		$(".mask-datetime").mask("99.99.9999? 99:99:00");
	}
	
}