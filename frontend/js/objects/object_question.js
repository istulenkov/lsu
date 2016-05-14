

function CObjectData(){
	
	this.OBJECT_NAME = "question";
	
	//Последнее поле в таблице будет ссылкой для удаления
	this.DATATABLES_LAST_FIELD_IS_DELETE = false;
	
	//Высота для TinyMCE
	this.TINYMCE_HEIGHT = 450;

	//Поля, которые будут записаны в таблицу
	this.DATATABLES_FIELD = ["id","sys_created_at", "category#list#life-cat", "status#list#status-opf","title","tags"];
	
	this.DATATABLES_COLUMNS = [
		{"title":"Изм"  	  	  , "width": "5%"},
		{"title":"Ид"  	  	  	  , "width": "5%"},
		{"title":"Дата создания"  , "width": "10%"},
		{"title":"Кат."  	  	  , "width": "10%"},
		{"title":"Стат."  	      , "width": "5%"},
		{"title":"Заг."  	      , "width": "40%"},
		{"title":"Тэги"  	      , "width": "20%"}
	];

	this.MENU = {
		"create_dir":false
	}
	this.REL_BLOCKS = {
		"contact"   : G_REL_BLOCKS["contact"],
		"task"   : G_REL_BLOCKS["task"],
		"project": G_REL_BLOCKS["project"],
		"note"   : G_REL_BLOCKS["note"],
		"timing" : G_REL_BLOCKS["timing"]
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
