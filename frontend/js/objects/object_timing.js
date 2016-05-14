

function CObjectData(){
	
	this.OBJECT_NAME = "timing";
	
	//Последнее поле в таблице будет ссылкой для удаления
	this.DATATABLES_LAST_FIELD_IS_DELETE = false;
	
	//Высота для TinyMCE
	this.TINYMCE_HEIGHT = 600;

	//Поля, которые будут записаны в таблицу
	this.DATATABLES_FIELD = ["id", "date", "time_start", "time_end", "productivity#list#prod-lvl", "title"];

	//Паратеры 
	this.DATATABLES_COLUMNS = [
		{"title":"Изм"  	  , "width": "5%"},
		{"title":"Ид"   	  , "width": "5%"},
		{"title":"Дата"  	  , "width": "5%"},
		{"title":"Начало"	  , "width": "5%"},
		{"title":"Конец" 	  , "width": "5%"},
		{"title":"Ур-нь" 	  , "width": "6%"},
		{"title": "Заголовок" , "width": "60%"}
	]
	
	this.MENU = {
		"create_dir":false
	}
	
	this.REL_BLOCKS = {
		"task"    : G_REL_BLOCKS["task"],
		"question": G_REL_BLOCKS["project"],
		"think"	  : G_REL_BLOCKS["think"]
	}
	
	//Заполнить заголовок нужной информацией
	this.fillCardTitleInfo = function(object_item, settings){		
		$(settings.CARD_OBJECT_INFO).each(function(){
			title = object_item["title"]
			if (title.length > 50){
				title = title.substring(0,50) + "...";	
			}
			$(this).html(" " + title);
		})
	}
}
