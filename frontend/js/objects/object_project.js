

function CObjectData(){
	
	this.OBJECT_NAME = "project";
	
	//Последнее поле в таблице будет ссылкой для удаления
	this.DATATABLES_LAST_FIELD_IS_DELETE = false;
	
	//Высота для TinyMCE
	this.TINYMCE_HEIGHT = 650;

	//Поля, которые будут записаны в таблицу
	this.DATATABLES_FIELD = ["id","sys_created_at", "title"];
	
	this.DATATABLES_COLUMNS = [
		{"title":"Изм"  	  	  , "width": "5%"},
		{"title":"Ид"  	  	  	  , "width": "5%"},
		{"title":"Дата создания"  , "width": "10%"},
		{"title":"Заголовок"  	  , "width": "75%"}
	];

	this.MENU = {
		"create_dir":true
	}
	
	this.REL_BLOCKS = {
		"contact"   : G_REL_BLOCKS["contact"],
		"task"	  : G_REL_BLOCKS["task"],
		"think"	  : G_REL_BLOCKS["think"],
		"question": G_REL_BLOCKS["question"],
		"note"    : G_REL_BLOCKS["note"],
		"error"   : G_REL_BLOCKS["error"],
		"activity": G_REL_BLOCKS["activity"]
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
