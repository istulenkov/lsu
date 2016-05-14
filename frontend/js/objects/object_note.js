

function CObjectData(){
	
	this.OBJECT_NAME = "note";
	
	//Последнее поле в таблице будет ссылкой для удаления
	this.DATATABLES_LAST_FIELD_IS_DELETE = false;
	
	//Высота для TinyMCE
	this.TINYMCE_HEIGHT = 750;

	//Поля, которые будут записаны в таблицу
	this.DATATABLES_FIELD = ["id","sys_created_at", "category#list#life-cat","note_cat#list#note-cat","title","tags"];
	
	this.DATATABLES_COLUMNS = [
		{"title":"Изм"  	  , "width": "5%"},
		{"title":"Ид"  	  	  , "width": "5%"},
		{"title":"Создано"    , "width": "5%"},
		{"title":"Категория"  , "width": "10%"},
		{"title":"Классиф."   , "width": "5%"},
		{"title":"Заголовок"  , "width": "45%"},
		{"title":"Тэги"  	  , "width": "20%"}
	];

	this.MENU = {
		"create_dir":false
	}
	
	this.REL_BLOCKS = {
		"task"   : G_REL_BLOCKS["task"],
		"project": G_REL_BLOCKS["project"],
		"think"  : G_REL_BLOCKS["think"],
		"note"   : G_REL_BLOCKS["note"],
		"question": G_REL_BLOCKS["question"],
		"error": G_REL_BLOCKS["error"]
	}
	
	/*
	this.SEARCH = {
		"fields":[
			{
				"title" : "Ид.",
				"format": "num",
				"field" : "id",
				"field-class" : "col-md-3"
			},
			{
				"title" : "Статус",
				"format": "list",
				"field" : "status",
				"scheme": "status-opf",
				"field-class" : "col-md-3"
			},
			{
				"title" : "Заголовок",
				"format": "text",
				"field" : "title",
				"field-class" : "col-md-3"
			}
		]		
	}
	*/
	
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
