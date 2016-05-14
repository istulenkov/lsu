/*
function CSearch(){
	
	this.fillSearch = function(object_data, settings){
		var html_res = ""
		for (var f in object_data["fields"]){
			var html_row_search = "";
			var html_title  = "";
			var html_select = "";
			var html_field  = ""
			
			cur_f  		 = object_data["fields"][f];
			title 		 = cur_f["title"];
			field  		 = cur_f["field"];
			format 		 = cur_f["format"];
			field_class = cur_f["field-class"];
			
			switch (format){
				case "num":
					
				break;
				
				case "list":
					scheme = cur_f["scheme"];
				break;
				
				case "text":
					html = '<input type="text" field-type="' + field + '"'
				break;
			}
			
			//Заголовок
			class_title = settings.SEARCH_FIELD_TITLE_COL_MD;
			html_title = '<div class="'+class_title+'">' + title + '</div>';
			
			//Параметры выбора
			class_select = settings.SEARCH_FIELD_SELECT_COL_MD;
			html_select = '<div class="'+ class_select +'">' + xxx + '</div>';
			
			//Поле
			html_field = '<div class="'+ field_class   +'">' + yyy + '</div>';
			
			//Отобразить заголовок
			html_row_search = html_title + html_select + html_field;			
			html_res = html_res + '<div class="row">' + html_row_search + "</div>";
		}
		return html_res;
	}
	
	this.getSelect = function(){
		
	}
}
*/