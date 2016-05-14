
function CMyTinyMCE(){
	
	this.init = function( tinymce_id, object_data ){
		tinymce.init({
			selector: tinymce_id,
			//plugins: "insertdatetime",
			 plugins: [
				'textcolor advlist autolink lists link image charmap print preview anchor',
				'searchreplace visualblocks code fullscreen',
				'insertdatetime media table contextmenu paste code sh4tinymce'
			 ],
			toolbar: 'insertfile undo redo | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | insertdatetime | sh4tinymce',
			setup : function(ed){
				ed.on('init', function() {
					this.getDoc().body.style.fontSize = '11px';
				})
			},
			insertdatetime_formats: ["%d.%m.%Y","%d.%m.%Y %H:%M:%S", "%H:%M:%S"],
			height : object_data.TINYMCE_HEIGHT
		});	
	}
	
}