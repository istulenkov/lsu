

function CObjectData(){
	
	this.OBJECT_NAME = "activity";
	
	//Последнее поле в таблице будет ссылкой для удаления
	this.DATATABLES_LAST_FIELD_IS_DELETE = false;
	
	//Высота для TinyMCE
	this.TINYMCE_HEIGHT = 400;
	
	//Поля, которые будут записаны в таблицу
	this.DATATABLES_FIELD = ["id", "activity_datetime", "life_cat#list#life-cat", "activity_cat#list#activity-cat", "title", "tags"];
	
	this.DATATABLES_COLUMNS = [
		{"title":"Изм"  	  , "width": "5%"},
		{"title":"Ид"  	  	  , "width": "5%"},
		{"title":"Дата актив" , "width": "10%"},
		{"title":"Категория"  , "width": "10%"},
		{"title":"Вид"        , "width": "15%"},
		{"title":"Заголовок"  , "width": "35%"},
		{"title":"Тэги"       , "width": "10%"}
	];
	
	this.MENU = {
		"create_dir":false
	}
	
	this.REL_BLOCKS = {
		"error"   : G_REL_BLOCKS["error"],
		"task"    : G_REL_BLOCKS["task"],
		"think"   : G_REL_BLOCKS["think"]
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
