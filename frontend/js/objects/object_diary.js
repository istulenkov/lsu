

function CObjectData(){
	
	this.OBJECT_NAME = "diary";
	
	//Последнее поле в таблице будет ссылкой для удаления
	this.DATATABLES_LAST_FIELD_IS_DELETE = false;
	
	//Высота для TinyMCE
	this.TINYMCE_HEIGHT = 600;
	
	//Поля, которые будут записаны в таблицу
	this.DATATABLES_FIELD = ["id", "date", "datetime_awoke", "datetime_sleep", "energy_level_start#list#life", "energy_level_end#list#life",  "title", "tags"];
	
	this.DATATABLES_COLUMNS = [
		{"title":"Изм"  	  , "width": "5%"},
		{"title":"Ид"  	  	  , "width": "5%"},
		{"title":"Дата"  	  , "width": "5%"},
		{"title":"Встал"  	  , "width": "5%"},
		{"title":"Лег"  	  , "width": "5%"},
		{"title":"Энергия утр", "width": "5%"},
		{"title":"Энергия веч", "width": "5%"},
		{"title":"Заголовок"  , "width": "40%"},
		{"title":"Тэги"       , "width": "20%"}
	];
	
	this.MENU = {
		"create_dir":true
	}
	
	this.REL_BLOCKS = {
		"error"     : G_REL_BLOCKS["error"],
		"think"     : G_REL_BLOCKS["think"],
		"accounting": G_REL_BLOCKS["accounting"]
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
