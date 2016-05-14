

function CObjectData(){
	
	this.OBJECT_NAME = "snippet";
	
	//Последнее поле в таблице будет ссылкой для удаления
	this.DATATABLES_LAST_FIELD_IS_DELETE = false;
	
	//Высота для TinyMCE
	this.TINYMCE_HEIGHT = 750;

	//Поля, которые будут записаны в таблицу
	this.DATATABLES_FIELD = ["id","sys_created_at", "snip_cat#list#snippet-cat", "title", "tags"];
	
	this.DATATABLES_COLUMNS = [
		{"title":"Изменить"   , "width": "5%"},
		{"title":"Ид"  	  	  , "width": "5%"},
		{"title":"Cоздано"    , "width": "5%"},
		{"title":"Категория"  , "width": "5%"},
		{"title":"Заголовок"  , "width": "50%"},
		{"title":"Тэги"  	  , "width": "25%"}
	];

	this.MENU = {
		"create_dir":false
	}
	
	this.REL_BLOCKS = {
		"task"   : G_REL_BLOCKS["task"]
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
