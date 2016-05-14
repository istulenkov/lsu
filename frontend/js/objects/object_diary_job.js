

function CObjectData(){
	
	
	this.OBJECT_NAME = "diary_job";
	
	//Последнее поле в таблице будет ссылкой для удаления
	this.DATATABLES_LAST_FIELD_IS_DELETE = false;
	
	//Высота для TinyMCE
	this.TINYMCE_HEIGHT = 750;

	//Поля, которые будут записаны в таблицу
	this.DATATABLES_FIELD = ["id", "date", "datetime_start", "datetime_end", "productivity#list#prod-lvl", "title", "tags"];
	
	this.DATATABLES_COLUMNS = [
		{"title":"Изм"  	  , "width": "4%" },
		{"title":"Ид"  	      , "width": "5%" },
		{"title":"Дата"  	  , "width": "5%" },
		{"title":"Пришел"  	  , "width": "5%" },
		{"title":"Ушел"  	  , "width": "5%" },
		{"title":"Прод."  	  , "width": "5%" },
		{"title":"Заг."  	  , "width": "30%"},
		{"title":"Тэги"  	  , "width": "30%"}
	];
	
	this.MENU = {
		"create_dir":false
	}
	
	this.REL_BLOCKS = {
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
